import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([count, emoji]) => {
    return (
      <button key={count} type="button" className="muted-button reaction-button" onClick={()=>{
          dispatch(reactionAdded({postId: post.id, reactionCount: count}))
      }}>
        {emoji} {post.reactions[count]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}