"use client";

import { useState, useRef } from "react";
import { TextField, Label, Input, TextArea, Button } from "@heroui/react";
import toast from "react-hot-toast";
import {
  Upload,
  Image as ImageIcon,
  X,
  Palette,
  Camera,
  Brush,
  Shapes,
  Check,
  Loader2,
} from "lucide-react";
import { createArts } from "@/lib/actions/artWorks";

const categories = [
  { id: "painting", label: "Painting", icon: Palette },
  { id: "digital", label: "Digital Art", icon: ImageIcon },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "sculpture", label: "Sculpture", icon: Brush },
  { id: "illustration", label: "Illustration", icon: Shapes },
];

export default function CreateANewPage() {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "USD",
    category: "painting",
    image: "",
  });

  const currencySymbols = { USD: "$", BDT: "৳" };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image");
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setErrors((prev) => ({ ...prev, image: null }));

    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body }
      );

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        toast.success("Image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", currency: "USD", category: "painting", image: "" });
    setPreview(null);
    setErrors({});
  };

  const validate = () => {
    const next = {};
    if (!formData.title.trim()) next.title = "Add a title for this piece";
    if (!formData.price) next.price = "Set a price to publish";
    if (!formData.image) next.image = "Upload an image to publish";
    console.log("[validate] computed errors:", next);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const saveArtwork = async (status) => {
    console.log("[saveArtwork] called with status:", status);
    console.log("[saveArtwork] current formData:", formData);

    if (status === "published" && !validate()) {
      console.log("[saveArtwork] validation failed — see [validate] log above for details");
      toast.error("Fill in the highlighted fields to publish");
      return;
    }

    console.log("[saveArtwork] validation passed, sending request...");

    try {
      setLoading(true);

      const payload = { ...formData, status };
      console.log("[saveArtwork] payload:", payload);

      const result = await createArts(payload);
      console.log("[saveArtwork] server action result:", result);

      if (result?.error) {
        console.error("[saveArtwork] server action returned an error:", result.error);
        throw new Error(result.error);
      }

      if (result?.success === false) {
        console.error("[saveArtwork] server action reported failure:", result.message);
        throw new Error(result.message || "Failed to save artwork");
      }

      console.log("[saveArtwork] success!");
      toast.success(status === "published" ? "Artwork published" : "Draft saved");
      resetForm();
    } catch (error) {
      console.error("[saveArtwork] caught error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .studio-wrap { background: #ffffff; min-height: 100vh; }
        .studio-inner { max-width: 1080px; margin: 0 auto; padding: 6rem 1.5rem 4rem; }

        .studio-eyebrow {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #047857; margin-bottom: 0.6rem;
        }
        .studio-title {
          font-size: 2.1rem; font-weight: 700; letter-spacing: -0.025em;
          color: #0f172a; margin-bottom: 0.5rem;
        }
        .studio-sub { font-size: 0.94rem; color: #64748b; max-width: 480px; }

        .studio-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem; margin-top: 2.75rem;
        }
        @media (min-width: 860px) {
          .studio-grid { grid-template-columns: 340px 1fr; gap: 3rem; }
        }

        /* Dropzone */
        .dz-label {
          display: block; font-size: 0.8rem; font-weight: 600;
          color: #0f172a; margin-bottom: 0.65rem;
        }
        .dropzone {
          position: relative; width: 100%; aspect-ratio: 4 / 5;
          border-radius: 20px; border: 1.5px dashed #cbd5e1;
          background: #f8faf9; cursor: pointer; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .dropzone:hover { border-color: #6ee7b7; background: #f0fdf4; }
        .dropzone.drag-active {
          border-color: #10b981; background: #f0fdf4;
          box-shadow: 0 0 0 4px rgba(16,185,129,0.1);
        }
        .dropzone.error { border-color: #fca5a5; background: #fff5f5; }

        .dz-empty { text-align: center; padding: 2rem; }
        .dz-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: rgba(5,150,105,0.1); display: flex; align-items: center;
          justify-content: center; color: #047857; margin: 0 auto 0.9rem;
        }
        .dz-title { font-size: 0.88rem; font-weight: 600; color: #1e293b; margin-bottom: 0.3rem; }
        .dz-hint { font-size: 0.76rem; color: #94a3b8; }

        .preview-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .preview-remove {
          position: absolute; top: 12px; right: 12px; width: 32px; height: 32px;
          border-radius: 50%; background: rgba(15,23,42,0.65); color: #fff;
          display: flex; align-items: center; justify-content: center; border: none;
          cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s; z-index: 3;
        }
        .preview-remove:hover { background: rgba(15,23,42,0.85); }

        .upload-overlay {
          position: absolute; inset: 0; background: rgba(15,23,42,0.45);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; color: #fff; z-index: 2; backdrop-filter: blur(2px);
        }
        .upload-overlay span { font-size: 0.8rem; font-weight: 500; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .uploaded-chip {
          position: absolute; bottom: 12px; left: 12px;
          display: flex; align-items: center; gap: 5px;
          background: rgba(5,150,105,0.92); color: #fff;
          font-size: 0.72rem; font-weight: 600; padding: 5px 10px;
          border-radius: 999px; z-index: 2;
        }

        .field-error {
          font-size: 0.74rem; font-weight: 500; color: #dc2626; margin-top: 0.4rem;
        }

        /* Form fields */
        .field-group { margin-bottom: 1.4rem; }
        .fl-label { display: block; font-size: 0.8rem; font-weight: 600; color: #0f172a; margin-bottom: 0.55rem; }
        .styled-input {
          width: 100%; height: 46px; border-radius: 12px;
          border: 1px solid #e2e8f0; background: #f8faf9; padding: 0 1rem;
          font-size: 0.88rem; color: #0f172a; outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .styled-input::placeholder { color: #a3b1c2; }
        .styled-input:focus, .styled-input[data-focus-visible="true"] {
          border-color: #10b981; background: #ffffff; box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .styled-input.has-error { border-color: #fca5a5; background: #fff5f5; }

        .styled-textarea {
          width: 100%; border-radius: 12px; border: 1px solid #e2e8f0;
          background: #f8faf9; padding: 0.8rem 1rem; font-size: 0.88rem;
          color: #0f172a; outline: none; resize: vertical; line-height: 1.55;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .styled-textarea::placeholder { color: #a3b1c2; }
        .styled-textarea:focus, .styled-textarea[data-focus-visible="true"] {
          border-color: #10b981; background: #ffffff; box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }

        /* Category chips */
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 0.6rem; }
        .chip {
          display: flex; align-items: center; gap: 6px; padding: 7px 14px;
          border-radius: 999px; border: 1.5px solid #e2e8f0; background: #ffffff;
          font-size: 0.8rem; font-weight: 500; color: #475569; cursor: pointer;
          transition: all 0.18s ease; user-select: none;
        }
        .chip:hover { border-color: #6ee7b7; background: #f0fdf4; }
        .chip.selected { border-color: #047857; background: #047857; color: #fff; }

        .price-wrap { position: relative; display: flex; gap: 8px; }
        .price-prefix {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 0.9rem; font-weight: 600; color: #047857; pointer-events: none; z-index: 1;
        }
        .price-wrap .styled-input { padding-left: 1.9rem; flex: 1; }

        .currency-toggle {
          display: flex; flex-shrink: 0; border: 1px solid #e2e8f0;
          border-radius: 12px; overflow: hidden; background: #f8faf9;
        }
        .currency-btn {
          height: 46px; padding: 0 14px; font-size: 0.8rem; font-weight: 600;
          color: #64748b; background: transparent; border: none; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .currency-btn:hover:not(.active) { background: #f0fdf4; color: #047857; }
        .currency-btn.active {
          background: linear-gradient(135deg, #047857, #10b981); color: #fff;
        }

        .submit-row { margin-top: 0.4rem; display: flex; gap: 10px; }
        .btn-publish {
          flex: 1; height: 48px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #047857, #10b981); color: #fff;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-publish:hover:not(:disabled) { transform: translateY(-1px); }
        .btn-publish:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-draft {
          height: 48px; padding: 0 1.4rem; border-radius: 12px;
          border: 1px solid #e2e8f0; background: #fff; color: #475569;
          font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .btn-draft:hover:not(:disabled) { background: #f8faf9; border-color: #cbd5e1; }
        .btn-draft:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="studio-wrap">
        <div className="studio-inner">
          <p className="studio-eyebrow">Artist Studio</p>
          <h1 className="studio-title">Add new artwork</h1>
          <p className="studio-sub">
            Upload a clear image and the details collectors need before they buy.
          </p>

          <div className="studio-grid">
            {/* Image */}
            <div>
              <span className="dz-label">Artwork image</span>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`dropzone ${dragActive ? "drag-active" : ""} ${errors.image ? "error" : ""}`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Artwork preview" className="preview-img" />
                    {uploading && (
                      <div className="upload-overlay">
                        <Loader2 size={22} className="spin" />
                        <span>Uploading…</span>
                      </div>
                    )}
                    {!uploading && formData.image && (
                      <div className="uploaded-chip">
                        <Check size={12} />
                        Uploaded
                      </div>
                    )}
                    <button type="button" className="preview-remove" onClick={removeImage} aria-label="Remove image">
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <div className="dz-empty">
                    <div className="dz-icon">
                      <Upload size={20} />
                    </div>
                    <p className="dz-title">Click or drop image</p>
                    <p className="dz-hint">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
              {errors.image && <p className="field-error">{errors.image}</p>}
            </div>

            {/* Form */}
            <div>
              <div className="field-group">
                <TextField isInvalid={!!errors.title}>
                  <Label className="fl-label">Artwork title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Sunset Over the Bay"
                    className={`styled-input ${errors.title ? "has-error" : ""}`}
                  />
                </TextField>
                {errors.title && <p className="field-error">{errors.title}</p>}
              </div>

              <div className="field-group">
                <span className="fl-label">Category</span>
                <div className="chip-row">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        className={`chip ${formData.category === cat.id ? "selected" : ""}`}
                        onClick={() => updateField("category", cat.id)}
                      >
                        <Icon size={14} />
                        {cat.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="field-group">
                <TextField isInvalid={!!errors.price}>
                  <Label className="fl-label">Price</Label>
                  <div className="price-wrap">
                    <div style={{ position: "relative", flex: 1 }}>
                      <span className="price-prefix">{currencySymbols[formData.currency]}</span>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => updateField("price", e.target.value)}
                        placeholder="0.00"
                        className={`styled-input ${errors.price ? "has-error" : ""}`}
                      />
                    </div>
                    <div className="currency-toggle">
                      <button
                        type="button"
                        className={`currency-btn ${formData.currency === "USD" ? "active" : ""}`}
                        onClick={() => updateField("currency", "USD")}
                      >
                        USD
                      </button>
                      <button
                        type="button"
                        className={`currency-btn ${formData.currency === "BDT" ? "active" : ""}`}
                        onClick={() => updateField("currency", "BDT")}
                      >
                        BDT
                      </button>
                    </div>
                  </div>
                </TextField>
                {errors.price && <p className="field-error">{errors.price}</p>}
              </div>

              <div className="field-group">
                <TextField>
                  <Label className="fl-label">Description</Label>
                  <TextArea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Share the inspiration, medium, and dimensions..."
                    className="styled-textarea"
                  />
                </TextField>
              </div>

              <div className="submit-row">
                <button
                  type="button"
                  className="btn-publish"
                  disabled={loading || uploading}
                  onClick={() => saveArtwork("published")}
                >
                  {loading ? <Loader2 size={16} className="spin" /> : null}
                  Publish artwork
                </button>
                <button
                  type="button"
                  className="btn-draft"
                  disabled={loading || uploading}
                  onClick={() => saveArtwork("draft")}
                >
                  Save draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
