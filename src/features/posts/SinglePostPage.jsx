import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {PostAuthor} from './postAuthor'
import {selectPostById} from './postsSlice'

export const SinglePostPage = ({match}) => {
    const {postId} = match.params
    const post = useSelector(state => selectPostById(state, postId))
    if(!post){
        return (
            <section>
                <h2>No Post Found!</h2>
            </section>
        )
    }
    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content}</p>
                <div>
                    <PostAuthor userId = {post.user} />
                </div>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}


