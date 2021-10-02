import React from 'react'
import { Link } from 'react-router-dom'

function ArticleInfo({ data }) {
  return (
    <span>
      <Link to={`/profile/${data.author?.username}`}>
        <img src={data.author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${data.author?.username}`} className="author">
          {data.author?.username}
        </Link>
        <span className="date">{data.createdAt}</span>
      </div>
    </span>
  )
}

export default ArticleInfo
