# React Redux Topics

## 1. Redux & Side Effects (and Asynchronous Code)

### Scenario:
You need to fetch user data from an API when the app loads and store it in Redux.

### Code Example:
```javascript
// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

```javascript
// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
```

```javascript
// App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./store/slice";

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

---

## 2. Redux & Async Code

### Scenario:
You need to handle multiple asynchronous actions, such as fetching posts and comments.

### Code Example:
```javascript
// postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
```

```javascript
// commentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
```

```javascript
// store.js
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
```

```javascript
// App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./store/postsSlice";
import { fetchComments } from "./store/commentsSlice";

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const comments = useSelector((state) => state.comments.data);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

---

## 3. Using `useEffect` with Redux

### Scenario:
You need to trigger an action when a component mounts.

### Code Example:
```javascript
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./store/slice";

const UserComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <div>Check Redux state for user data!</div>;
};

export default UserComponent;
```

---

## 4. Handling HTTP States & Feedback with Redux

### Scenario:
You need to show loading, success, and error states for an API call.

### Code Example:
Refer to the `Redux & Side Effects` example above.

---

## 5. Using an Action Creator Thunk

### Scenario:
You need to create a thunk for an asynchronous action.

### Code Example:
Refer to the `Redux & Side Effects` example above.

---

## 6. Getting Started with Fetching Data

### Scenario:
You need to fetch data when the app loads.

### Code Example:
Refer to the `Redux & Side Effects` example above.

---

## 7. Finalizing the Fetching Logic

### Scenario:
You need to optimize fetching logic.

### Code Example:
Refer to the `Redux & Async Code` example above.

---

## 8. Exploring the Redux DevTools

### Scenario:
You need to debug state changes.

### Code Example:
```javascript
// Install Redux DevTools extension in your browser.
// Add this to your store configuration:
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export default store;
```

Open Redux DevTools in your browser to monitor actions and state changes.
