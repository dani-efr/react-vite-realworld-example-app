import React from 'react'
import { useArticle, useAuth } from '../hooks'
import { Link } from 'react-router-dom'
import ArticleInfo from './ArticleInfo'
import FavoriteArticleButton from './FavoriteArticleButton'

const ArticlePreview = ({ article }) => {
  const { isAuth } = useAuth()
  const { data } = useArticle(article)

  return (
    <div className="article-preview" key={data.slug}>
      <div className="article-meta">
        <ArticleInfo data={data}></ArticleInfo>

        {isAuth && <FavoriteArticleButton article={data} className="pull-xs-right" />}
      </div>
      <Link to={`/article/${data.slug}`} className="preview-link">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {data.tagList.map((tag) => {
            return (
              <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            )
          })}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
