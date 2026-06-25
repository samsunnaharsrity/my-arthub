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
} from "lucide-react";
import { createSettings } from "@/lib/actions/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    contactEmail: "",
    currency: "",
    maintenanceMode: false,
    autoApproveArtwork: false,
  });

  const loadSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load settings");
      }

      const data = await res.json();

      console.log("Settings from API:", data);
      if (data) {
        setSettings({
          siteName: data.siteName || "ArtHub",
          contactEmail: data.contactEmail || "admin@arthub.com",
          currency: data.currency || "USD",
          maintenanceMode: data.maintenanceMode || false,
          autoApproveArtwork:
            data.autoApproveArtwork || false,
        });
      }
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

    toast.success("Settings updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to save settings");
  }
};

  return (
    <section className="p-8 pt-28 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-800">
            <Settings className="text-emerald-600" />
            Admin Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Configure and manage your marketplace settings.
          </p>
        </div>

        <div className="space-y-6">

          {/* General Settings */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">
              General Settings
            </h2>

            <div className="space-y-5">

              {/* Site Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium">
                  <Globe size={18} />
                  Site Name
                </label>

                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleChange("siteName", e.target.value)
                  }
                  className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium">
                  <Mail size={18} />
                  Contact Email
                </label>

                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    handleChange("contactEmail", e.target.value)
                  }
                  className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium">
                  <DollarSign size={18} />
                  Default Currency
                </label>

                <select
                  value={settings.currency}
                  onChange={(e) =>
                    handleChange("currency", e.target.value)
                  }
                  className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} />
              System Controls
            </h2>

            <div className="space-y-5">

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">
                    Maintenance Mode
                  </h3>
                  <p className="text-sm text-slate-500">
                    Temporarily disable public access.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleChange(
                      "maintenanceMode",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5"
                />
              </div>

              {/* Auto Approve */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    Auto Approve Artworks
                  </h3>
                  <p className="text-sm text-slate-500">
                    Automatically approve newly submitted artworks.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.autoApproveArtwork}
                  onChange={(e) =>
                    handleChange(
                      "autoApproveArtwork",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5"
                />
              </div>

            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
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