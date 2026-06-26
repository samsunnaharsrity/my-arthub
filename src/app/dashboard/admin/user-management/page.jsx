"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, Shield } from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      console.log("Users Response:", data);

      if (Array.isArray(data)) {
        setUsers(data);
      }

      else if (Array.isArray(data.users)) {
        setUsers(data.users);
      }

      else if (Array.isArray(data.data)) {
        setUsers(data.data);
      }

      else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Role updated");

        setUsers((prev) =>
          prev.map((user) =>
            (user._id?.$oid || user._id) === id
              ? { ...user, role }
              : user
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 p-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-800">
            <Users className="text-emerald-600" />
            Manage Users
          </h1>

          <p className="text-slate-500 mt-2">
            Manage user roles and permissions.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-700">
            Total Users
          </h3>

          <p className="text-4xl font-bold text-emerald-600 mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Shield size={20} />
              User Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr className="text-left">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Current Role</th>
                  <th className="p-4">Change Role</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id?.$oid || user._id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {user.name || "Unknown User"}
                            </h3>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-600"
                              : user.role === "artist"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user._id?.$oid || user._id,
                              e.target.value
                            )
                          }
                          className="border border-slate-200 rounded-xl px-4 py-2"
                        >
                          <option value="user">User</option>
                          <option value="artist">Artist</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}