"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function CommentsModerationPage() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const { data: session } = authClient.useSession();

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/comments`,
        {
          headers: {
            "user-email": session?.user?.email,
          },
        }
      );

      const data = await res.json();

      console.log("COMMENTS RESPONSE:", data);

      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
        toast.error(data.message || "Failed to load comments");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const filteredComments = comments.filter(
    (comment) =>
      comment?.userName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      comment?.text
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

 const handleDelete = async (id) => {
    if (!confirm("Delete this comment?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "user-email": session?.user?.email,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setComments((prev) =>
          prev.filter((c) => c._id !== id)
        );

        toast.success("Comment deleted");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <section className="p-6 mt-28 py-20 dark:text-white/70 dark:bg-black">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 dark:text-white/70 dark:bg-black/70">
        <div>
          <h1 className="text-3xl font-bold text-[#16352E]">
            Comments Moderation
          </h1>

          <p className="text-slate-500">
            Total Comments: {comments.length}
          </p>
        </div>

        <div className="relative w-full md:w-96 dark:text-white/70 dark:bg-black/70">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search comments..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 dark:text-white/70 dark:bg-black/70"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow border overflow-hidden dark:text-white/70 dark:bg-black/70">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:text-white/70 dark:bg-black/70">
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
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10"
                  >
                    Loading...
                  </td>
                </tr>
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
                    key={comment._id?.$oid || comment._id}
                    className="border-t hover:dark:text-white/70 dark:bg-black/70 hover:bg-slate-50 dark:text-white/70 dark:bg-black/70"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold">
                          {comment.userName ||
                            "Anonymous"}
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-white/70 ">
                          {comment.userId || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 max-w-md dark:text-white/70 ">
                      {comment.text}
                    </td>

                    <td className="px-6 py-5 text-slate-500 dark:text-white/70 ">
                      {comment.createdAt
                        ? new Date(
                            comment.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-5 text-center dark:text-white/70 dark:bg-black/70">
                      <button
                        onClick={() =>
                          handleDelete(
                            comment._id?.$oid ||
                              comment._id
                          )
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