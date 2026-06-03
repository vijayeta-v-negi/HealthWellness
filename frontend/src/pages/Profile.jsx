import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await API.get(
      "/auth/profile"
    );

    setUser(res.data);
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              Profile
            </h2>

            <p>
              Name:
              {user?.name}
            </p>

            <p>
              Email:
              {user?.email}
            </p>

            <p>
              Goal:
              {user?.goal}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}