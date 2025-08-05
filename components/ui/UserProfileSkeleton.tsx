"use client";

export default function UserProfileSkeleton() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-neutral-700 to-neutral-500 h-36 relative">
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </div>

        <div className="relative px-6 pb-10">
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 relative z-10">
            <div className="flex flex-col items-center md:items-start">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-xl border-4 border-white bg-gray-200 animate-pulse" />

              <div className="mt-4 text-center md:text-left">
                <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-28 bg-gray-200 mt-2 rounded-md animate-pulse" />
                <div className="h-6 w-20 mt-3 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>

            {/* Button placeholder */}
            <div className="flex-1 flex justify-end mt-6 md:mt-0">
              <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-6 h-full flex flex-col justify-start space-y-4"
              >
                <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse mb-4" />
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            ))}

            {/* Socials Section */}
            <div className="bg-gray-50 rounded-lg p-6 h-full">
              <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-4" />
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 animate-pulse"
                  >
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
