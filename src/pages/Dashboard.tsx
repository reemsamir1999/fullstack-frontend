import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, getToken } from "../services/authService"; 

type User = {
  name: string;
  email: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth/protected", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        logout();
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard</h2>
        {user ? (
          <>
            <p className="text-gray-600">Welcome, <span className="font-bold">{user.name}</span>!</p>
            <p className="text-gray-500">Email: {user.email}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
        <button
          onClick={() => {
            logout();
            navigate("/signin");
          }}
          className="p-3 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
