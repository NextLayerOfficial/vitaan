import { getLatestMagazineFiles } from "@/app/actions/firstThree";
import MagazineGrid from "@/components/MagazineGrid";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default async function DashboardPage() {
  const latestMagazines = await getLatestMagazineFiles();

  const socials = [
    {
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: <Instagram />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: <Twitter />,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/yourusername",
      icon: <Facebook />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <Linkedin />,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Your social presence & latest magazines
          </p>
        </header>

        {/* Social Links */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            🌐 Social Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {socials.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-center hover:text-blue-600 transition"
              >
                <div className="p-4 rounded-full bg-gray-100 hover:bg-gray-200">
                  <div className="w-6 h-6 text-gray-700">{icon}</div>
                </div>
                <span className="text-sm font-medium">{name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Magazine Cards with Download */}
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
