import { useState, useEffect, createContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Auth from "./components/Auth";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

export const AppContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Auth onLogin={setUser} />,
    },
    {
      path: "/",
      element: user ? (
        <Feed user={user} onLogout={() => setUser(null)} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/profile/:userId",
      element: user ? <Profile /> : <Navigate to="/login" />,
    },
  ]);

  return (
    <AppContext.Provider value={{ currentUser: user, setUser }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
