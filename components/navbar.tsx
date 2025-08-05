import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutForm from "./sign-out-form";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="sticky top-0 z-40 border-b  bg-ivory">
      <div className="container flex h-16 items-center justify-between py-4">
        <div
          style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          className=" font-semibold tracking-tight text-terracotta md:text-2xl"
        >
          वितान
        </div>
        <nav className="flex items-center gap-4 sm:gap-2">
          {session ? (
            <>
              <Button className="bg-[#4B2E13] hover:bg-[#603c1d]">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </Button>
              <SignOutForm>
                <Button variant={"destructive"}>SignOut</Button>
              </SignOutForm>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
