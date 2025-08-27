import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AppContext) || {};

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const loggedInUserId = currentUser?._id;

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`,
        { withCredentials: true }
      );
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/posts/${postId}`, {
        withCredentials: true,
      });
      fetchProfile();
    } catch {
      alert("Failed to delete post");
    }
  };

  const handleEdit = async (postId) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+`/api/posts/${postId}`,
        { content: editContent },
        { withCredentials: true }
      );
      setEditPostId(null);
      setEditContent("");
      fetchProfile();
    } catch {
      alert("Failed to update post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p className="text-danger">User not found</p>;

  const { user, posts } = profile;

  return (
    <div className="container my-4">
      <div className="card p-4 mb-5 shadow-sm">
        <h2 className="card-title">{user.name}</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p>
          <strong>Bio:</strong> {user.bio || "No bio provided."}
        </p>
      </div>

      <h3 className="mb-4">Posts</h3>
      {posts.length === 0 ? (
        <p className="text-muted">No posts to display.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              {editPostId === post._id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEdit(post._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditPostId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="card-text">{post.content}</p>
                  <small className="text-secondary d-block mb-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </small>
                  {String(user._id) === String(loggedInUserId) && (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                          setEditPostId(post._id);
                          setEditContent(post.content);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
