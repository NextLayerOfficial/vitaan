"use client";

import React from "react";
import { User } from "@/lib/types";

interface UserProfilePrintProps {
  user: User;
}

const UserProfilePrint = React.forwardRef<
  HTMLDivElement,
  UserProfilePrintProps
>(({ user }, ref) => {
  return (
    <div
      ref={ref}
      className="p-10 max-w-3xl mx-auto text-black"
      style={{
        fontFamily: "'Computer Modern', Georgia, serif",
        fontSize: "13px",
        lineHeight: "1.6",
      }}
    >
      {/* Header with Image and Name */}
      <div className="flex items-center border-b pb-4 mb-6 gap-6">
        <img
          src={user.image ?? "/default-avatar.png"}
          alt={user.name}
          className="w-24 h-24 object-cover rounded-md border border-gray-400"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-700">@{user.displayUsername}</p>
          <p className="text-gray-700">
            <a
              href={`mailto:${user.email}`}
              className="text-blue-800 underline"
            >
              {user.email}
            </a>
          </p>
          {user.phone && (
            <p className="text-gray-700">
              <a href={`tel:${user.phone}`} className="text-blue-800 underline">
                {user.phone}
              </a>
            </p>
          )}
          {user.address && <p className="text-gray-700">{user.address}</p>}
        </div>
      </div>

      {/* Professional Info */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
          Professional Summary
        </h2>
        <table className="w-full">
          <tbody>
            {user.jobTitle && (
              <tr>
                <td className="pr-4 font-semibold">Title:</td>
                <td>{user.jobTitle}</td>
              </tr>
            )}
            {user.currentCompany && (
              <tr>
                <td className="pr-4 font-semibold">Company:</td>
                <td>{user.currentCompany}</td>
              </tr>
            )}
            {user.department && (
              <tr>
                <td className="pr-4 font-semibold">Department:</td>
                <td>{user.department}</td>
              </tr>
            )}
            {user.graduationYear && (
              <tr>
                <td className="pr-4 font-semibold">Graduation Year:</td>
                <td>{user.graduationYear}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Social Links */}
      {user.socials && Object.keys(user.socials).length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
            Social Profiles
          </h2>
          <ul className="list-inside list-disc space-y-1">
            {Object.entries(user.socials).map(([platform, url]) => (
              <li key={platform}>
                <span className="font-semibold capitalize">{platform}:</span>{" "}
                <a
                  href={url}
                  className="text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Account Info */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
          Account Details
        </h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-4 font-semibold">Status:</td>
              <td>{user.banned ? "Banned" : "Active"}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Email Verified:</td>
              <td>{user.emailVerified ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Role:</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
});

UserProfilePrint.displayName = "UserProfilePrint";
export default UserProfilePrint;
