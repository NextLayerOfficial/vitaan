"use client";

import UserProfile from "@/components/userProfile";

// import { User } from "@/components/userProfile";
import type { User } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
            refprop={contentRef}
          />
        </div>
      )}
      <button onClick={reactToPrintFn}>Print</button>
    </main>
  );
}
// ref={contentRef}
