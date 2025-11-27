// app/dashboard/DashboardClient.tsx
"use client";

import { Instagram, Twitter, Facebook, Linkedin, FileDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import MagazineGrid from "@/components/MagazineGrid";

interface DashboardClientProps {
  latestMagazines: any;
}

export default function DashboardClient({
  latestMagazines,
}: DashboardClientProps) {
  const user = useUser();
  const isAdmin = user?.role === "admin";

  const [isEditing, setIsEditing] = useState(false);
  const [socials, setSocials] = useState<
    { id: number; icon: keyof typeof iconMap; name: string; url: string }[]
  >([]);

  const iconMap = {
    instagram: <Instagram />,
    facebook: <Facebook />,
    linkedin: <Linkedin />,
  };

  useEffect(() => {
    // Fetch from backend or use initial defaults
    fetch("/api/social-links")
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setSocials(data);
        } else {
          // default links if none exist
          setSocials([
            {
              id: 1,
              icon: "instagram",
              name: "Instagram",
              url: "https://instagram.com",
            },

            {
              id: 2,
              icon: "facebook",
              name: "Facebook",
              url: "https://facebook.com",
            },
            {
              id: 3,
              icon: "linkedin",
              name: "LinkedIn",
              url: "https://linkedin.com",
            },
          ]);
        }
      });
  }, []);

  const handleChange = (index: number, value: string) => {
    setSocials((prev) => {
      const updated = [...prev];
      updated[index].url = value;
      return updated;
    });
  };

  const handleSave = async () => {
    await fetch("/api/social-links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socials }),
    });
    setIsEditing(false);
    alert("Links updated!");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Social Links */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Social Links
            </h2>
            {isAdmin && (
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {socials.map((link, index) => (
              <div
                key={link.id}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="p-4 rounded-full bg-gray-100">
                  {iconMap[link.icon]}
                </div>
                {isEditing ? (
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="text-sm border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-blue-600 transition"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            📝 Joining Application Form
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Below is the official Joining Application Form Template. Please
            download the form, fill it out, sign it, save it as{" "}
            <strong>"Vitaan_Application_Form_[YourName].pdf"</strong> and upload
            the signed copy to Upload file with <strong>"Application"</strong>{" "}
            option selected from the dropdown to complete your submission.
          </p>

          {/* Download Form */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <FileDown className="w-6 h-6 text-terracotta" />
              <p className="text-gray-700 font-medium">
                Vitaan_Application_Form.pdf
              </p>
            </div>
            <a
              href="/VITAAN APPLICATION FORM.pdf"
              download
              className="mt-3 sm:mt-0 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition"
            >
              Download Form
            </a>
          </div>
        </section>

        {/* Magazine Cards */}

        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            📰 Latest Magazine Uploads
          </h2>
          <MagazineGrid files={latestMagazines} />
        </section>
      </div>
    </main>
  );
}
