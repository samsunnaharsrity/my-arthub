"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Settings,
  Globe,
  Mail,
  DollarSign,
  Shield,
  Save,
  ImageIcon,
} from "lucide-react";
import { createSettings } from "@/lib/actions/settings";
import { getSettings } from "@/lib/api/settings";
import { useRouter } from "next/navigation";
import { uploadToImgBB } from "@/lib/uploadImgBB";

export default function SettingsPage() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    siteName: "",
    contactEmail: "",
    currency: "",
    maintenanceMode: false,
    autoApproveArtwork: false,
    logo: "",
    banner: "",
  });

  // NEW: file states
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setSettings({
        siteName: data.siteName || "ArtHub",
        contactEmail: data.contactEmail || "admin@arthub.com",
        currency: data.currency || "USD",
        maintenanceMode: data.maintenanceMode || false,
        autoApproveArtwork: data.autoApproveArtwork || false,
        logo: data.logo || "",
        banner: data.banner || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ SAVE WITH IMGBB UPLOAD
  const handleSave = async () => {
    try {
      let logoUrl = settings.logo;
      let bannerUrl = settings.banner;

      // upload logo if new file
      if (logoFile) {
        logoUrl = await uploadToImgBB(logoFile);
      }

      // upload banner if new file
      if (bannerFile) {
        bannerUrl = await uploadToImgBB(bannerFile);
      }

      const finalData = {
        ...settings,
        logo: logoUrl,
        banner: bannerUrl,
      };

      await createSettings(finalData);
      await loadSettings();

      router.refresh();

      toast.success("Settings updated successfully");

      // reset files
      setLogoFile(null);
      setBannerFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 p-8 pt-28 dark:bg-black/70 dark:text-white/70">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-800 dark:text-white">
            <Settings className="text-emerald-600" />
            Admin Settings
          </h1>
          <p className="mt-3 text-slate-500">
            Configure and customize your ArtHub marketplace.
          </p>
        </div>

        <div className="space-y-8">

          {/* GENERAL */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 text-2xl font-semibold">
              General Settings
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  handleChange("siteName", e.target.value)
                }
                className="w-full rounded-xl border p-3"
                placeholder="Site Name"
              />

              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleChange("contactEmail", e.target.value)
                }
                className="w-full rounded-xl border p-3"
                placeholder="Contact Email"
              />

              <select
                value={settings.currency}
                onChange={(e) =>
                  handleChange("currency", e.target.value)
                }
                className="w-full rounded-xl border p-3"
              >
                <option value="USD">USD ($)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </div>
          </div>

          {/* BRANDING */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 flex items-center gap-2 text-2xl font-semibold">
              <ImageIcon />
              Branding
            </h2>

            <div className="grid gap-8 lg:grid-cols-2">

              {/* LOGO */}
              <div>
                <label className="mb-2 block font-medium">
                  Site Logo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setLogoFile(e.target.files[0])
                  }
                  className="w-full rounded-xl border p-3"
                />

                {settings.logo && (
                  <img
                    src={settings.logo}
                    className="mt-4 h-24 object-contain"
                  />
                )}
              </div>

              {/* BANNER */}
              <div>
                <label className="mb-2 block font-medium">
                  Site Banner
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBannerFile(e.target.files[0])
                  }
                  className="w-full rounded-xl border p-3"
                />

                {settings.banner && (
                  <img
                    src={settings.banner}
                    className="mt-4 h-40 w-full object-cover"
                  />
                )}
              </div>

            </div>
          </div>

          {/* SYSTEM */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 text-2xl font-semibold">
              System Controls
            </h2>

            <div className="space-y-6">

              <label className="flex items-center justify-between">
                <span>Maintenance Mode</span>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleChange(
                      "maintenanceMode",
                      e.target.checked
                    )
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Auto Approve Artworks</span>
                <input
                  type="checkbox"
                  checked={settings.autoApproveArtwork}
                  onChange={(e) =>
                    handleChange(
                      "autoApproveArtwork",
                      e.target.checked
                    )
                  }
                />
              </label>

            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-white hover:bg-emerald-700"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}