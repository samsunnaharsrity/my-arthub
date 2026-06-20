"use client";

import { useEffect, useState } from "react";
import { getArtWorks } from "@/lib/api/artWorks";
import { Button } from "@heroui/react";
import { ImageOff, Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const currencySymbols = { USD: "$", BDT: "৳" };

const statusStyles = {
  published: { dot: "#059669", bg: "#f0fdf4", text: "#047857" },
  draft: { dot: "#94a3b8", bg: "#f8fafc", text: "#64748b" },
};

export default function ManageArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const artWorksId = "artWorks_112233";

    getArtWorks(artWorksId)
      .then((data) => setArtworks(data || []))
      .catch(() => setArtworks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .manage-wrap { background: #ffffff; min-height: 100vh; width: 100%; }
        .manage-inner { max-width: 1080px; width: 100%; margin: 0 auto; padding: 6rem 1.5rem 4rem; }

        .manage-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;
        }
        .manage-eyebrow {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #047857; margin-bottom: 0.5rem;
        }
        .manage-title {
          font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em; color: #0f172a;
        }
        .manage-sub { font-size: 0.88rem; color: #64748b; margin-top: 0.3rem; }

        .btn-add {
          height: 44px; padding: 0 1.3rem; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #047857, #10b981); color: #fff;
          font-size: 0.86rem; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: transform 0.2s;
        }
        .btn-add:hover { transform: translateY(-1px); }

        .table-card {
          border: 1px solid #e2e8f0; border-radius: 18px; overflow-x: auto; width: 100%;
        }
        .art-table { width: 100%; min-width: 600px; border-collapse: collapse; table-layout: fixed; }
        .art-table thead th {
          text-align: left; padding: 0.9rem 1.1rem; font-size: 0.72rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: #94a3b8; background: #f8faf9; border-bottom: 1px solid #e2e8f0;
        }
        .art-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s; }
        .art-table tbody tr:last-child { border-bottom: none; }
        .art-table tbody tr:hover { background: #f8faf9; }
        .art-table td { padding: 0.9rem 1.1rem; font-size: 0.86rem; color: #1e293b; vertical-align: middle; }

        .art-cell { display: flex; align-items: center; gap: 12px; }
        .art-thumb {
          width: 44px; height: 44px; border-radius: 10px; object-fit: cover;
          flex-shrink: 0; background: #f1f5f9;
        }
        .art-thumb-fallback {
          width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
          background: #f1f5f9; display: flex; align-items: center; justify-content: center;
          color: #cbd5e1;
        }
        .art-title-text { font-weight: 600; color: #0f172a; }

        .category-chip {
          display: inline-block; font-size: 0.76rem; font-weight: 500;
          color: #475569; background: #f1f5f9; padding: 3px 10px; border-radius: 999px;
          text-transform: capitalize;
        }

        .price-text { font-weight: 600; color: #0f172a; }

        .status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.76rem; font-weight: 600; padding: 4px 10px;
          border-radius: 999px; text-transform: capitalize;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }

        .row-actions { display: flex; gap: 6px; }
        .icon-btn {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0;
          background: #fff; display: flex; align-items: center; justify-content: center;
          color: #64748b; cursor: pointer; transition: all 0.18s ease;
        }
        .icon-btn:hover { background: #f8faf9; border-color: #cbd5e1; color: #0f172a; }
        .icon-btn.danger:hover { background: #fff5f5; border-color: #fca5a5; color: #dc2626; }

        /* Empty state */
        .empty-state { padding: 4rem 1.5rem; text-align: center; }
        .empty-icon {
          width: 52px; height: 52px; border-radius: 14px; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          color: #94a3b8; margin: 0 auto 1rem;
        }
        .empty-title { font-size: 0.95rem; font-weight: 600; color: #1e293b; margin-bottom: 0.3rem; }
        .empty-sub { font-size: 0.82rem; color: #94a3b8; margin-bottom: 1.25rem; }

        /* Loading skeleton */
        .skeleton-row td { padding: 1rem 1.1rem; }
        .sk { background: #f1f5f9; border-radius: 8px; animation: pulse 1.4s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div className="manage-wrap">
        <div className="manage-inner">
          <div className="manage-header">
            <div>
              <p className="manage-eyebrow">Artist Studio</p>
              <h1 className="manage-title">Manage artworks</h1>
              <p className="manage-sub">Edit, publish, or remove pieces from your gallery.</p>
            </div>
            <Link href="/dashboard/artist/artWorks/create">
            <button className="btn-add">
              <Plus size={16} />
              Add artwork
            </button>
            </Link>
          </div>

          <div className="table-card">
            {loading ? (
              <table className="art-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="skeleton-row">
                      <td><div className="sk" style={{ height: 44, width: "70%" }} /></td>
                      <td><div className="sk" style={{ height: 22, width: 80 }} /></td>
                      <td><div className="sk" style={{ height: 22, width: 50 }} /></td>
                      <td><div className="sk" style={{ height: 22, width: 70 }} /></td>
                      <td><div className="sk" style={{ height: 32, width: 80 }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : artworks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <ImageOff size={22} />
                </div>
                <p className="empty-title">No artworks yet</p>
                <p className="empty-sub">Add your first piece to start selling on ArtHub.</p>
                <button className="btn-add" style={{ margin: "0 auto" }}>
                  <Plus size={16} />
                  Add artwork
                </button>
              </div>
            ) : (
              <table className="art-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artworks.map((art) => {
                    const id = art._id?.$oid || art._id || art.id;
                    const status = statusStyles[art.status] || statusStyles.draft;
                    const symbol = currencySymbols[art.currency] || "$";

                    return (
                      <tr key={id}>
                        <td>
                          <div className="art-cell">
                            {art.image ? (
                              <img src={art.image} alt={art.title} className="art-thumb" />
                            ) : (
                              <div className="art-thumb-fallback">
                                <ImageOff size={16} />
                              </div>
                            )}
                            <span className="art-title-text">{art.title}</span>
                          </div>
                        </td>
                        <td>
                          <span className="category-chip">{art.category}</span>
                        </td>
                        <td>
                          <span className="price-text">{symbol}{art.price}</span>
                        </td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ background: status.bg, color: status.text }}
                          >
                            <span className="status-dot" style={{ background: status.dot }} />
                            {art.status}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button className="icon-btn" aria-label="Edit artwork">
                              <Pencil size={14} />
                            </button>
                            <button className="icon-btn danger" aria-label="Delete artwork">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
