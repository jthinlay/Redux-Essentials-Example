import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {postUpdated, selectPostById} from './postsSlice'
import {useHistory} from 'react-router-dom'

export const EditPostForm = ({match}) => {
   const {postId} = match.params
   const post = useSelector(state => selectPostById(state, postId))
   const [title, setTitle] = useState(post.title)
   const [content, setContent] = useState(post.content)
   
   const dispatch = useDispatch()
   const history = useHistory() 

   const onTitleChange = e => setTitle(e.target.value)
   const onContentChange = e => setContent(e.target.value)

   const onSavePostClicked = () => {
       if(title && content){
           dispatch(postUpdated({id: postId, title, content }))
           history.push(`posts/${postId}`)
       }
   }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" placeholder="what's on your mind?" value={title} onChange={onTitleChange}/>
                <label htmlFor="postContent">Post Content:</label>
                <textarea name="postContent" id="postContent" cols="30" rows="10" value={content} onChange={onContentChange}></textarea>
            </form>
            <button type="button" onClick={onSavePostClicked}>Save Post</button>
        </section>
    )
}


