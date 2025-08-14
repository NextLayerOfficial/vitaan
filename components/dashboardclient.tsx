// app/dashboard/DashboardClient.tsx
"use client";

import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
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
    twitter: <Twitter />,
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
              icon: "twitter",
              name: "Twitter",
              url: "https://twitter.com",
            },
            {
              id: 3,
              icon: "facebook",
              name: "Facebook",
              url: "https://facebook.com",
            },
            {
              id: 4,
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
              🌐 Social Links
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
