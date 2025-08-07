"use client";

import UserProfile from "@/components/userProfile";

// import { User } from "@/components/userProfile";
import type { User } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import UserProfilePrint from "@/components/userProfilePrint";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // const reactToPrintFn = useReactToPrint({ contentRef });

  const handlePrint = useReactToPrint({
    contentRef: printRef, // ✅ correct for newer versions
    documentTitle: "User Profile",
    onAfterPrint: () => {
      // Optional: Cleanup or toast
      console.log("Printing finished");
    },
  });

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <main className=" mx-auto mt-10 space-y-4">
      {loading == false && user && (
        <div className=" bg-white">
          <UserProfile
            user={user}
            isEditable={false}
            EditingRights={false}
            // refprop={contentRef}
          />
        </div>
      )}
      {loading == false && user && (
        <div style={{ display: "none" }}>
          <UserProfilePrint ref={printRef} user={user} />
        </div>
      )}
      <button
        className="flex justify-center mt-4 bg-white p-4 rounded-lg shadow-md w-full cursor-pointer"
        onClick={handlePrint}
      >
        Print
      </button>
    </main>
  );
}
// ref={contentRef}
