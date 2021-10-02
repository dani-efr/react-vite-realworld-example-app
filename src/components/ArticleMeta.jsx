import classNames from 'classnames'
import React from 'react'
import { FavoriteArticleButton } from '.'
import { useAuth } from '../hooks'
import ArticleInfo from './ArticleInfo'

function ArticleMeta({ data }) {
  const { authUser } = useAuth()

  return (
    <React.Fragment>
      <ArticleInfo data={data}></ArticleInfo>
      {authUser.username === data.author?.username ? (
        <React.Fragment>
          <span>
            <a className="btn btn-outline-secondary btn-sm">
              <i className="ion-edit" /> Edit Article
            </a>
            &nbsp;&nbsp;
            <button disabled={false} type="button" className="btn btn-outline-danger btn-sm">
              <i className="ion-trash-a" /> Delete Article
            </button>
          </span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button
            disabled={false}
            type="button"
            className={classNames('btn btn-sm action-btn', {
              'btn-outline-secondary': !data.author.following,
              'btn-secondary': data.author.following,
            })}
          >
            <i className="ion-plus-round" />
            &nbsp; {data.author.following ? 'Unfollow ' : 'Follow '}
            {data.author.username}
          </button>
          &nbsp;&nbsp;
          <FavoriteArticleButton article={data}>
            {data.favorited ? 'Unfavorite' : 'Favorite'} Article
          </FavoriteArticleButton>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ArticleMeta
