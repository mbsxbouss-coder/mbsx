import React, { useEffect } from 'react'
import Articles from '../components/Articles'

const ArticlesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Articles />
    </main>
  )
}

export default ArticlesPage
