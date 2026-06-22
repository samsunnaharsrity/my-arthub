import Link from "next/link";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  ShoppingCart,
  Calendar,
  Palette,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

import { getArtworkById } from "@/lib/api/artWorks";
import { getUserSession } from "@/lib/core/session";
import CommentSection from "@/app/components/comments/commentSec";

const currencySymbols = { USD: "$", BDT: "৳" };

const ArtDetailsPage = async ({ params }) => {
  const { id } = await params;

  const [artwork, user] = await Promise.all([
    getArtworkById(id),
    getUserSession(),
  ]);

  if (!artwork) {
    return (
      <div style={pageStyles.notFoundWrap}>
        <p style={pageStyles.notFoundEyebrow}>404</p>
        <h2 style={pageStyles.notFoundTitle}>This piece isn't here</h2>
        <p style={pageStyles.notFoundSub}>
          The artwork you're looking for may have been sold, removed, or never existed.
        </p>
        <Link href="/browseArtwork" style={pageStyles.notFoundLink}>
          <ArrowLeft size={15} />
          Back to the gallery
        </Link>
      </div>
    );
  }

  const isOwner = Boolean(user && user?.email === artwork?.artistEmail);
  const canPurchase = Boolean(user && user?.email !== artwork?.artistEmail);
  const isSold = artwork.status === "closed";
  const currencySymbol = currencySymbols[artwork.currency] || artwork.currency || "$";

  return (
    <>
      <style>{`
        .ad-wrap { background: #FAF8F4; min-height: 100vh; width: 100%; }
        .ad-inner { max-width: 1180px; width: 100%; margin: 0 auto; padding: 7rem 1.5rem 5rem; }

        .ad-breadcrumb {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 500; color: #8a8377;
          text-decoration: none; margin-bottom: 2rem;
          transition: color 0.2s;
        }
        .ad-breadcrumb:hover { color: #1C1917; }

        .ad-grid {
          display: grid; grid-template-columns: 1fr; gap: 3rem;
        }
        @media (min-width: 960px) {
          .ad-grid { grid-template-columns: 1.05fr 0.95fr; gap: 4rem; }
        }

        .ad-frame {
          background: #fff; padding: 14px; border-radius: 4px;
          box-shadow: 0 1px 2px rgba(28,25,23,0.06), 0 20px 48px -16px rgba(28,25,23,0.18);
        }
        .ad-frame-inner { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: #f1efe9; }
        .ad-img { width: 100%; height: 100%; object-fit: cover; }
        .sold-overlay {
          position: absolute; top: 16px; left: 16px;
          background: rgba(28,25,23,0.88); color: #FAF8F4;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 6px 13px; border-radius: 2px;
        }

        .ad-category {
          display: inline-block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: #13382e;
          margin-bottom: 0.9rem;
        }
        .ad-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(2.1rem, 4vw, 3rem); font-weight: 400;
          letter-spacing: -0.01em; line-height: 1.05; color: #1C1917;
          margin-bottom: 1.1rem;
        }

        .ad-byline { display: flex; align-items: baseline; gap: 6px; margin-bottom: 2.25rem; }
        .ad-byline-label { font-size: 0.84rem; color: #8a8377; }
        .ad-byline-name {
          font-size: 0.95rem; font-weight: 600; color: #1C1917;
          text-decoration: none; border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .ad-byline-name:hover { border-color: #1C1917; }

        .ad-price-block { margin-bottom: 2.25rem; padding-bottom: 2rem; border-bottom: 1px solid #e8e4dc; }
        .ad-price-row { display: flex; align-items: center; gap: 10px; }
        .ad-price { font-size: 2.2rem; font-weight: 600; color: #1C1917; letter-spacing: -0.01em; }
        .ad-sold-price { color: #b0a99c; text-decoration: line-through; }
        .ad-verified {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.74rem; font-weight: 500; color: #8a8377; margin-top: 0.5rem;
        }

        .ad-section-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #8a8377; margin-bottom: 0.7rem;
        }
        .ad-description { font-size: 0.96rem; line-height: 1.75; color: #44403c; margin-bottom: 2.1rem; }

        .ad-meta-list { margin-bottom: 2.25rem; }
        .ad-meta-row {
          display: flex; align-items: center; gap: 12px;
          padding: 0.85rem 0; border-bottom: 1px solid #e8e4dc;
        }
        .ad-meta-row:first-child { border-top: 1px solid #e8e4dc; }
        .ad-meta-icon { color: #133b23; flex-shrink: 0; }
        .ad-meta-label { font-size: 0.8rem; color: #8a8377; width: 90px; flex-shrink: 0; }
        .ad-meta-value { font-size: 0.88rem; font-weight: 600; color: #1C1917; text-transform: capitalize; }

        .btn-primary {
          width: 100%; height: 52px; border-radius: 4px; border: none;
          background: #288734; color: #FAF8F4; font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.02em; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: background 0.2s, transform 0.2s; text-decoration: none;
        }
        .btn-primary:hover:not(:disabled) { background: #13461f; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-secondary {
          height: 48px; flex: 1; border-radius: 4px; border: 1px solid #d9d4c8;
          background: transparent; color: #1C1917; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s; text-decoration: none;
        }
        .btn-secondary:hover { background: #f1efe9; border-color: #b0a99c; }
        .btn-secondary.danger { color: #b91c1c; border-color: #e8c4be; }
        .btn-secondary.danger:hover { background: #fdf3f1; border-color: #d99b8f; }

        .owner-actions { display: flex; gap: 10px; margin-top: 0.9rem; }
      `}</style>

      <section className="ad-wrap">
        <div className="ad-inner">
          <Link href="/browseArtwork" className="ad-breadcrumb">
            <ArrowLeft size={14} />
            Back to gallery
          </Link>

          <div className="ad-grid">
            <div>
              <div className="ad-frame">
                <div className="ad-frame-inner">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={900}
                    height={1125}
                    className="ad-img"
                    priority
                  />
                  {isSold && <span className="sold-overlay">Sold</span>}
                </div>
              </div>

      {/*  COMMENTS SECTION START */}
              <div style={{ marginTop: "3rem" }}>
                <p className="ad-section-label">Comments</p>

                <CommentSection
                  artworkId={artwork?._id}
                  user={user}
                />
              </div>
            </div>

{/* OTHER DESCRIPTIONS */}
            <div>
              <span className="ad-category">{artwork.category}</span>
              <h1 className="ad-title">{artwork.title}</h1>

              <div className="ad-byline">
                <span className="ad-byline-label">by</span>
                <Link href={`/artists/${artwork.artistId}`} className="ad-byline-name">
                  {artwork.artistName || "Unknown artist"}
                </Link>
              </div>

              <div className="ad-price-block">
                <div className="ad-price-row">
                  <span className={`ad-price ${isSold ? "ad-sold-price" : ""}`}>
                    {currencySymbol}{artwork.price}
                  </span>
                </div>
                <span className="ad-verified">
                  <BadgeCheck size={14} />
                  Verified original — one of a kind
                </span>
              </div>

              <p className="ad-section-label">Description</p>
              <p className="ad-description">
                {artwork.description || "The artist hasn't added a description for this piece yet."}
              </p>

              <div className="ad-meta-list">
                <div className="ad-meta-row">
                  <Palette size={16} className="ad-meta-icon" />
                  <span className="ad-meta-label">Category</span>
                  <span className="ad-meta-value">{artwork.category}</span>
                </div>
                <div className="ad-meta-row">
                  <Calendar size={16} className="ad-meta-icon" />
                  <span className="ad-meta-label">Uploaded</span>
                  <span className="ad-meta-value">
                    {artwork.createdAt
                      ? new Date(artwork.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </span>
                </div>
              </div>

              {/* Purchase */}
              {!user ? (
                <Link href={`/login?redirect=/browseArtwork/${id}`} className="btn-primary">
                  Log in to purchase
                </Link>
              ) : isSold ? (
                <button className="btn-primary" disabled>
                  This piece has sold
                </button>
              ) : (
                <Link
                  href={`/browseArtwork/${id}/purchase`}
                  className={`btn-primary ${
                    !canPurchase ? "opacity-50 pointer-events-none" : ""
                  }`}
                  aria-disabled={!canPurchase}
                >
                  <ShoppingCart size={17} />
                  {canPurchase ? "Purchase artwork" : "You own this artwork"}
                </Link>
              )}

              {/* Owner controls */}
              {isOwner && (
                <div className="owner-actions">
                  <Link href={`/dashboard/artist/edit/${id}`} className="btn-secondary">
                    <Pencil size={15} />
                    Edit
                  </Link>
                  <button className="btn-secondary danger">
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              )}


            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const pageStyles = {
  notFoundWrap: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
    background: "#FAF8F4",
  },
  notFoundEyebrow: {
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#133f31",
    marginBottom: "0.6rem",
  },
  notFoundTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "2rem",
    color: "#1C1917",
    marginBottom: "0.6rem",
  },
  notFoundSub: {
    fontSize: "0.9rem",
    color: "#8a8377",
    maxWidth: 360,
    marginBottom: "1.75rem",
  },
  notFoundLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#1C1917",
    textDecoration: "none",
    borderBottom: "1px solid #1C1917",
    paddingBottom: 2,
  },
};

export default ArtDetailsPage;
