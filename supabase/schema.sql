-- MBSx Platform Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/snfjmvbtdoveipfwbfez/sql)

-- ============================================
-- 1. HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 2. PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'fr', 'ar')),
  preferred_theme TEXT DEFAULT 'light' CHECK (preferred_theme IN ('light', 'dark')),
  institution_name TEXT,
  sector TEXT,
  phone TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- 3. SERVICE REQUESTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  institution_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for service_requests
CREATE POLICY "Anyone can insert service requests" ON service_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own service requests" ON service_requests
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all service requests" ON service_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update service requests" ON service_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete service requests" ON service_requests
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- 4. AD REQUESTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS ad_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  institution_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  ad_types TEXT[] NOT NULL,
  ad_details TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  boost_ad BOOLEAN DEFAULT FALSE,
  duration TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'active', 'expired')),
  admin_notes TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ad_requests ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_ad_requests_updated_at
  BEFORE UPDATE ON ad_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for ad_requests
CREATE POLICY "Anyone can insert ad requests" ON ad_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own ad requests" ON ad_requests
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all ad requests" ON ad_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update ad requests" ON ad_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete ad requests" ON ad_requests
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- 5. NOTIFICATIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  title_fr TEXT,
  message TEXT NOT NULL,
  message_ar TEXT,
  message_fr TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'alert')),
  related_type TEXT CHECK (related_type IN ('service_request', 'ad_request', 'system', 'announcement')),
  related_id UUID,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert notifications" ON notifications
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can view all notifications" ON notifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- 6. SEARCHABLE CONTENT TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS searchable_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('report', 'dashboard', 'service', 'publication', 'article')),
  title TEXT NOT NULL,
  title_ar TEXT,
  title_fr TEXT,
  description TEXT,
  description_ar TEXT,
  description_fr TEXT,
  keywords TEXT[],
  metadata JSONB,
  url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE searchable_content ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_searchable_content_updated_at
  BEFORE UPDATE ON searchable_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_searchable_content_fts ON searchable_content
USING GIN (to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '')));

-- RLS Policies for searchable_content
CREATE POLICY "Anyone can view published content" ON searchable_content
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all content" ON searchable_content
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- 7. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 8. AUTO-NOTIFY ON STATUS CHANGE
-- ============================================

CREATE OR REPLACE FUNCTION notify_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status AND NEW.user_id IS NOT NULL THEN
    INSERT INTO notifications (user_id, title, message, type, related_type, related_id)
    VALUES (
      NEW.user_id,
      'Request Status Updated',
      'Your request status has been updated to: ' || NEW.status,
      'info',
      TG_TABLE_NAME,
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS service_request_status_notify ON service_requests;
CREATE TRIGGER service_request_status_notify
  AFTER UPDATE ON service_requests
  FOR EACH ROW EXECUTE FUNCTION notify_status_change();

DROP TRIGGER IF EXISTS ad_request_status_notify ON ad_requests;
CREATE TRIGGER ad_request_status_notify
  AFTER UPDATE ON ad_requests
  FOR EACH ROW EXECUTE FUNCTION notify_status_change();

-- ============================================
-- 9. ENABLE REALTIME FOR NOTIFICATIONS
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- ============================================
-- 10. INSERT SAMPLE SEARCHABLE CONTENT
-- ============================================

INSERT INTO searchable_content (content_type, title, title_ar, title_fr, description, description_ar, description_fr, keywords, is_published)
VALUES
  ('service', 'Data Analysis Reports', 'تقارير تحليل البيانات', 'Rapports d''analyse de données', 'Comprehensive data analysis reports for media and economic sectors', 'تقارير تحليل بيانات شاملة لقطاعي الإعلام والاقتصاد', 'Rapports d''analyse de données complets pour les secteurs des médias et de l''économie', ARRAY['data', 'analysis', 'reports', 'media', 'economic'], true),
  ('service', 'Interactive Dashboards', 'لوحات المعلومات التفاعلية', 'Tableaux de bord interactifs', 'Custom interactive dashboards for data visualization', 'لوحات معلومات تفاعلية مخصصة لتصور البيانات', 'Tableaux de bord interactifs personnalisés pour la visualisation des données', ARRAY['dashboard', 'interactive', 'visualization'], true),
  ('service', 'Consulting Services', 'خدمات الاستشارات', 'Services de conseil', 'Expert consulting for data journalism and analytics', 'استشارات خبراء للصحافة البيانية والتحليلات', 'Conseil d''experts en journalisme de données et analytique', ARRAY['consulting', 'expert', 'journalism'], true),
  ('publication', 'Annual Media Report 2024', 'التقرير الإعلامي السنوي 2024', 'Rapport annuel des médias 2024', 'Comprehensive analysis of media landscape', 'تحليل شامل للمشهد الإعلامي', 'Analyse complète du paysage médiatique', ARRAY['annual', 'report', 'media', '2024'], true),
  ('article', 'Understanding Data Journalism', 'فهم الصحافة البيانية', 'Comprendre le journalisme de données', 'An introduction to data journalism practices', 'مقدمة لممارسات الصحافة البيانية', 'Introduction aux pratiques du journalisme de données', ARRAY['introduction', 'data journalism', 'practices'], true);
