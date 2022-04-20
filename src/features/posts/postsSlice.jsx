import {createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import {client} from '../../api/client'
// import {sub} from 'date-fns'

const postsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
})
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})
// const initialState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  })

  export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client.post('/fakeApi/posts', initialPost)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )
  
const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action){
            const {postId, reactionCount} = action.payload
            // const existingPost = state.posts.find(post => post.id === postId)
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reactionCount]++
            }
        },
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(title, content, userId, reactions){
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(), 
                        title, 
                        content,
                        user: userId,
                        reactions
                    }
                }
            }
        },
        postUpdated(state, action){
            const {id, title, content} = action.payload
            // const existingPost = state.posts.find(post=>post.id === id)
            const existingPost = state.entities[id]
            if(existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
             // Use the `upsertMany` reducer as a mutating update utility
            postsAdapter.upsertMany(state, action.payload)
            //state.posts = state.posts.concat(action.payload)
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(addNewPost.fulfilled, (state, action) => {
            // We can directly add the new post object to our posts array
            state.posts.push(action.payload)
          })
      }
})
export const {postAdded, postUpdated, reactionAdded} = PostsSlice.actions
export default PostsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

// export const selectAllPosts = state => state.posts.posts
// export const selectPostById = (state, postId) => 
//     state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
) 