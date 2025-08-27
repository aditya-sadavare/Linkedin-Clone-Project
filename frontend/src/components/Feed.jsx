import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Feed({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/posts", { withCredentials: true });
      setPosts(res.data);
      setError('');
    } catch (err) {
      setPosts([]);
      setError(
        err.response?.data?.msg ||
        err.message ||
        'Failed to fetch posts'
      );
    }
  }

  function getUserName(post) {
    return post.author?.name || 'Unknown';
  }

  async function handleAddPost(e) {
    e.preventDefault();
    setError('');

    if (!newPost.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/api/posts",
        { content: newPost },
        { withCredentials: true }
      );
      setNewPost('');
      fetchPosts();
    } catch (err) {
      setError(
        err.response.data.msg
      );
    }
    setLoading(false);
  }

  return (
    <div className="container my-4">
      <h2>Home Feed</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">Welcome, {user.name}</p>
        <div>
          <Link
            to={`/profile/${user._id || user.id}`}
            className="btn btn-info btn-sm me-2"
          >
            View Profile
          </Link>
          <button className="btn btn-sm btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleAddPost} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            disabled={loading}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Add Post'}
          </button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>

      {posts.length === 0 && <p className="text-muted">No posts yet.</p>}

      {posts.map(post => (
        <div key={post._id} className="card mb-4 shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div>
              <strong>
                <Link
                  to={`/profile/${post.author?._id}`}
                  className="text-decoration-none"
                >
                  {getUserName(post)}
                </Link>
              </strong>
              : {post.content}
              <div>
                <small className="text-secondary">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
            <Link
              to={`/profile/${post.author?._id}`}
              className="btn btn-outline-info btn-sm mt-2 mt-md-0"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
