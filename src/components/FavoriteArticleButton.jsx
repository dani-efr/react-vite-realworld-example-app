import React from 'react'
import classNames from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { ConditionalWrapper } from '.'

function FavoriteArticleButton({ article, children = [], className = '' }) {
  const queryClient = useQueryClient()
  const queryKey = ['articles', article.slug]

  const favorite = useMutation(
    () => axios[article.favorited ? 'delete' : 'post'](`/articles/${article.slug}/favorite`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKey)

        const previousArticle = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, ({ articles }) => ({
          article: {
            ...article,
            favorited: !article.favorited,
            favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
          },
        }))

        return { previousArticle }
      },

      onError: (err, newTodo, context) => {
        queryClient.setQueryData(queryKey, context.previousArticle)
      },

      onSettled: () => {
        queryClient.invalidateQueries(queryKey)
      },
    }
  )

  return (
    <button
      onClick={() => favorite.mutate()}
      type="button"
      className={classNames(
        'btn btn-sm',
        {
          'btn-outline-primary': !article.favorited,
          'btn-primary': article.favorited,
        },
        className
      )}
      disabled={false}
    >
      <i className="ion-heart" />
      {children && <span>&nbsp;{children}</span>}
      &nbsp;{' '}
      <span className="counter">
        <ConditionalWrapper condition={!!children} wrapper={(children) => `(${children})`}>
          {article.favoritesCount}
        </ConditionalWrapper>
      </span>
    </button>
  )
}

export default FavoriteArticleButton
