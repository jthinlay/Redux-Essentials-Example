import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addNewPost } from './postsSlice'
import {selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)
    
    const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
      if (canSave) {
        try {
          setAddRequestStatus('pending')
          await dispatch(addNewPost({ title, content, user: userId })).unwrap()
          setTitle('')
          setContent('')
          setUserId('')
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setAddRequestStatus('idle')
      }
    }
  }

    const usersOption = users.map(user => (
        <option key={user.id}>
            {user.name}
        </option>
    ))
    return(
        <section>
            <h2>Add a New Post</h2>
            <form style={{border: "1px solid red"}}>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" onChange={onTitleChange} value={title}/>
                <label htmlFor="postAuthor">Post Author:</label>
                <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOption}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea name="postContent" id="postContent" onChange={onContentChange} value={content} cols="30" rows="10"></textarea>
                <button type="button" onClick = {onSavePostClicked} disabled = {!canSave} > Save Post </button>
            </form>
        </section>
    )
}