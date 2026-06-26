"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function CommentsModerationPage() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const result = comments.filter(
      (comment) =>
        comment.userName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        comment.text
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredComments(result);
  }, [search, comments]);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/comments`
      );

      const data = await res.json();

      setComments(data || []);
      setFilteredComments(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (id) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this comment?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/comments/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      setComments((prev) =>
        prev.filter(
          (comment) =>
            (comment._id?.$oid || comment._id) !== id
        )
      );

      toast.error("Comment deleted successfully");
    } else {
      toast.error(data.message || "Failed to delete comment");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <section className="p-6 mt-28 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#16352E]">
            Comments Moderation
          </h1>

          <p className="text-slate-500">
            Total Comments: {comments.length}
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search comments..."
            className="w-full border rounded-xl pl-11 pr-4 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="p-4">
                      <div className="skeleton h-10 w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="py-20 flex flex-col items-center">
                      <MessageSquare
                        size={50}
                        className="text-slate-300"
                      />

                      <p className="mt-4 text-slate-500">
                        No Comments Found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold">
                          {comment.userName ||
                            "Anonymous"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {comment.userId}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 max-w-md">
                      {comment.text}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {new Date(
                        comment.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() =>
                          handleDelete(comment._id)
                        }
                        className="btn btn-error btn-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}