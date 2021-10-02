import React from 'react'
import { useQueryClient } from 'react-query'
import { FavoriteArticleButton, FollowAuthorButton } from '.'
import { useAuth } from '../hooks'
import ArticleInfo from './ArticleInfo'

function ArticleMeta({ article }) {
  const { authUser } = useAuth()
  const queryClient = useQueryClient()
  const queryKey = ['articles', article.slug]

  const mutationConfig = {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ articles }) => ({
        article: {
          ...article,
          author: {
            ...article.author,
            following: !article.author.following,
          },
        },
      }))

      return { previousArticle }
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['/articles'])
    },
  }

  return (
    <React.Fragment>
      <ArticleInfo data={article}></ArticleInfo>
      {authUser.username === article.author?.username ? (
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
          <FollowAuthorButton user={article.author} mutationConfig={mutationConfig}></FollowAuthorButton>
          &nbsp;&nbsp;
          <FavoriteArticleButton article={article}>
            {article.favorited ? 'Unfavorite' : 'Favorite'} Article
          </FavoriteArticleButton>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ArticleMeta
