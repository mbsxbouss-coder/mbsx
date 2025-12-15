import React, { useEffect } from 'react'
import ArticleDetail from '../components/ArticleDetail'

const ArticleDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <ArticleDetail />
    </main>
  )
}

export default ArticleDetailPage
