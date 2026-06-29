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

  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setSettings({
        siteName: data.siteName || "ArtHub",
        contactEmail:
          data.contactEmail || "admin@arthub.com",
        currency: data.currency || "USD",
        maintenanceMode:
          data.maintenanceMode || false,
        autoApproveArtwork:
          data.autoApproveArtwork || false,
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

  const handleSave = async () => {
    try {
      await createSettings(settings);
      await loadSettings();

      router.refresh();

      toast.success(
        "Settings updated successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 p-8 pt-28 dark:bg-black/70 dark:text-white/70">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-800 dark:text-white">
            <Settings className="text-emerald-600" />
            Admin Settings
          </h1>

          <p className="mt-3 text-slate-500">
            Configure and customize your ArtHub
            marketplace.
          </p>
        </div>

        <div className="space-y-8">

          {/* General Settings */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 text-2xl font-semibold">
              General Settings
            </h2>

            <div className="space-y-6">

              {/* Site Name */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <Globe size={18} />
                  Site Name
                </label>

                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleChange(
                      "siteName",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <Mail size={18} />
                  Contact Email
                </label>

                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    handleChange(
                      "contactEmail",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <DollarSign size={18} />
                  Default Currency
                </label>

                <select
                  value={settings.currency}
                  onChange={(e) =>
                    handleChange(
                      "currency",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="USD">
                    USD ($)
                  </option>

                  <option value="BDT">
                    BDT (৳)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Branding Section */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 flex items-center gap-2 text-2xl font-semibold">
              <ImageIcon />
              Branding
            </h2>

            <div className="grid gap-8 lg:grid-cols-2">

              {/* Logo */}
              <div>
                <label className="mb-2 block font-medium">
                  Site Logo URL
                </label>

                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={settings.logo}
                  onChange={(e) =>
                    handleChange(
                      "logo",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {settings.logo && (
                  <div className="mt-4 rounded-2xl border bg-slate-100 p-4">
                    <img
                      src={settings.logo}
                      alt="Logo Preview"
                      className="h-24 object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Banner */}
              <div>
                <label className="mb-2 block font-medium">
                  Site Banner URL
                </label>

                <input
                  type="text"
                  placeholder="https://example.com/banner.jpg"
                  value={settings.banner}
                  onChange={(e) =>
                    handleChange(
                      "banner",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {settings.banner && (
                  <div className="mt-4 overflow-hidden rounded-2xl border bg-slate-100">
                    <img
                      src={settings.banner}
                      alt="Banner Preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* System Controls */}
          <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-black">
            <h2 className="mb-8 flex items-center gap-2 text-2xl font-semibold">
              <Shield size={20} />
              System Controls
            </h2>

            <div className="space-y-6">

              {/* Maintenance */}
              <div className="flex items-center justify-between border-b pb-5">
                <div>
                  <h3 className="font-medium">
                    Maintenance Mode
                  </h3>

                  <p className="text-sm text-slate-500">
                    Temporarily disable public
                    access.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    settings.maintenanceMode
                  }
                  onChange={(e) =>
                    handleChange(
                      "maintenanceMode",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />
              </div>

              {/* Auto Approve */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    Auto Approve Artworks
                  </h3>

                  <p className="text-sm text-slate-500">
                    Automatically approve all
                    submitted artworks.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    settings.autoApproveArtwork
                  }
                  onChange={(e) =>
                    handleChange(
                      "autoApproveArtwork",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />
              </div>

            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-medium text-white transition hover:bg-emerald-700"
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