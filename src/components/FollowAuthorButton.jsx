import React from 'react'
import classNames from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

function FollowAuthorButton({ user, mutationConfig }) {
  const queryClient = useQueryClient()

  const followMutation = useMutation(
    () => axios[user.following ? 'delete' : 'post'](`/profiles/${user.username}/follow`),
    ...mutationConfig
  )

  return (
    <button
      disabled={followMutation.isLoading}
      type="button"
      className={classNames('btn btn-sm action-btn', {
        'btn-outline-secondary': !user.following,
        'btn-secondary': user.following,
      })}
      onClick={() => followMutation.mutate()}
    >
      <i className="ion-plus-round" />
      &nbsp; {user.following ? 'Unfollow ' : 'Follow '}
      {user.username}
    </button>
  )
}

export default FollowAuthorButton
