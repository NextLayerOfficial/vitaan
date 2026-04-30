// "use client";

// import React from "react";
// import { User } from "@/lib/types";

// interface UserProfilePrintProps {
//   user: User;
// }

// const UserProfilePrint = React.forwardRef<
//   HTMLDivElement,
//   UserProfilePrintProps
// >(({ user }, ref) => {
//   return (
//     <div
//       ref={ref}
//       className="p-10 max-w-3xl mx-auto text-black"
//       style={{
//         fontFamily: "'Computer Modern', Georgia, serif",
//         fontSize: "13px",
//         lineHeight: "1.6",
//       }}
//     >
//       {/* Header with Image and Name */}
//       <div className="flex items-center border-b pb-4 mb-6 gap-6">
//         <img
//           src={user.image ?? "/default-avatar.png"}
//           alt={user.name}
//           className="w-24 h-24 object-cover rounded-md border border-gray-400"
//         />
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
//           <p className="text-gray-700">@{user.displayUsername}</p>
//           <p className="text-gray-700">
//             <a
//               href={`mailto:${user.email}`}
//               className="text-blue-800 underline"
//             >
//               {user.email}
//             </a>
//           </p>
//           {user.phone && (
//             <p className="text-gray-700">
//               <a href={`tel:${user.phone}`} className="text-blue-800 underline">
//                 {user.phone}
//               </a>
//             </p>
//           )}
//           {user.address && <p className="text-gray-700">{user.address}</p>}
//         </div>
//       </div>

//       {/* Professional Info */}
//       <section className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
//           Professional Summary
//         </h2>
//         <table className="w-full">
//           <tbody>
//             {user.jobTitle && (
//               <tr>
//                 <td className="pr-4 font-semibold">Title:</td>
//                 <td>{user.jobTitle}</td>
//               </tr>
//             )}
//             {user.currentCompany && (
//               <tr>
//                 <td className="pr-4 font-semibold">Company:</td>
//                 <td>{user.currentCompany}</td>
//               </tr>
//             )}
//             {user.department && (
//               <tr>
//                 <td className="pr-4 font-semibold">Branch:</td>
//                 <td>{user.department}</td>
//               </tr>
//             )}
//             {user.graduationYear && (
//               <tr>
//                 <td className="pr-4 font-semibold">Graduation Year:</td>
//                 <td>{user.graduationYear}</td>
//               </tr>
//             )}
//             {user.dateOfBirth && (
//               <tr>
//                 <td className="pr-4 font-semibold">Date of Birth:</td>
//                 <td>
//                   {new Date(user.dateOfBirth).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* Social Links */}
//       {user.socials && Object.keys(user.socials).length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
//             Social Profiles
//           </h2>
//           <ul className="list-inside list-disc space-y-1">
//             {Object.entries(user.socials).map(([platform, url]) => (
//               <li key={platform}>
//                 <span className="font-semibold capitalize">{platform}:</span>{" "}
//                 <a
//                   href={url}
//                   className="text-blue-800 underline"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {url}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Account Info */}
//       <section className="mt-6">
//         <h2 className="text-lg font-semibold text-gray-800 border-b mb-2">
//           Account Details
//         </h2>
//         <table className="w-full">
//           <tbody>
//             <tr>
//               <td className="pr-4 font-semibold">Status:</td>
//               <td>{user.banned ? "Banned" : "Active"}</td>
//             </tr>
//             <tr>
//               <td className="pr-4 font-semibold">Email Verified:</td>
//               <td>{user.emailVerified ? "Yes" : "No"}</td>
//             </tr>
//             <tr>
//               <td className="pr-4 font-semibold">Role:</td>
//               <td>{user.role}</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// });

// UserProfilePrint.displayName = "UserProfilePrint";
// export default UserProfilePrint;

"use client";

import React from "react";
import { User } from "@/lib/types";

interface UserProfilePrintProps {
  user: User;
}

function toDisplayDate(val: Date | string | null | undefined): string {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const UserProfilePrint = React.forwardRef<
  HTMLDivElement,
  UserProfilePrintProps
>(({ user }, ref) => {
  return (
    <div ref={ref}>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500&family=Crimson+Pro:wght@300;400&display=swap');

          .pp-root {
            width: 210mm;
            min-height: 287mm;
            margin: 0 auto;
            background: #faf8f4;
            padding: 18mm 18mm 18mm 22mm;
            box-sizing: border-box;
            font-family: 'EB Garamond', Georgia, serif;
            color: #1a1410;
            position: relative;
          }

          /* Left border rule */
          .pp-root::before {
            content: '';
            position: absolute;
            left: 12mm;
            top: 12mm;
            bottom: 12mm;
            width: 2px;
            background: linear-gradient(to bottom, #8B4513 0%, #c4956a 50%, #8B4513 100%);
          }

          /* Corner ornaments */
          .pp-corner {
            position: absolute;
            width: 12mm;
            height: 12mm;
          }
          .pp-corner-tl { top: 6mm; left: 6mm; border-top: 1.5px solid #8B4513; border-left: 1.5px solid #8B4513; }
          .pp-corner-tr { top: 6mm; right: 6mm; border-top: 1.5px solid #8B4513; border-right: 1.5px solid #8B4513; }
          .pp-corner-bl { bottom: 6mm; left: 6mm; border-bottom: 1.5px solid #8B4513; border-left: 1.5px solid #8B4513; }
          .pp-corner-br { bottom: 6mm; right: 6mm; border-bottom: 1.5px solid #8B4513; border-right: 1.5px solid #8B4513; }

          /* Header */
          .pp-header {
            display: flex;
            gap: 7mm;
            align-items: flex-start;
            margin-bottom: 8mm;
            padding-bottom: 6mm;
            border-bottom: 1px solid #c4956a;
            position: relative;
          }

          .pp-header::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0; right: 0;
            height: 1px;
            background: rgba(139,69,19,0.2);
          }

          .pp-avatar {
            width: 28mm;
            height: 28mm;
            object-fit: cover;
            flex-shrink: 0;
            border: 1px solid #c4956a;
            filter: sepia(8%) contrast(1.05);
          }

          .pp-header-text {
            flex: 1;
            padding-top: 1mm;
          }

          .pp-name {
            font-family: 'Cinzel', serif;
            font-size: 22pt;
            font-weight: 400;
            letter-spacing: 0.06em;
            color: #1a1410;
            line-height: 1.1;
            margin-bottom: 1.5mm;
          }

          .pp-username {
            font-family: 'EB Garamond', serif;
            font-style: italic;
            font-size: 10pt;
            color: #8B4513;
            letter-spacing: 0.04em;
            margin-bottom: 3mm;
          }

          .pp-contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 4mm 8mm;
            font-size: 9pt;
            color: #4a3828;
          }

          .pp-contact-item {
            display: flex;
            align-items: center;
            gap: 1.5mm;
          }

          .pp-contact-label {
            font-size: 7pt;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #8B4513;
            font-weight: 500;
          }

          /* Section */
          .pp-section {
            margin-bottom: 6mm;
          }

          .pp-section-head {
            display: flex;
            align-items: center;
            gap: 3mm;
            margin-bottom: 3mm;
          }

          .pp-section-num {
            font-family: 'EB Garamond', serif;
            font-style: italic;
            font-size: 8pt;
            color: #8B4513;
            letter-spacing: 0.05em;
            flex-shrink: 0;
          }

          .pp-section-title {
            font-family: 'Cinzel', serif;
            font-size: 9pt;
            font-weight: 400;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #1a1410;
            flex-shrink: 0;
          }

          .pp-section-rule {
            flex: 1;
            height: 1px;
            background: linear-gradient(to right, #c4956a, transparent);
          }

          /* Two column grid */
          .pp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            border: 1px solid rgba(196,149,106,0.4);
          }

          .pp-cell {
            padding: 3.5mm 4mm;
            border-right: 1px solid rgba(196,149,106,0.3);
            border-bottom: 1px solid rgba(196,149,106,0.3);
          }

          .pp-cell:nth-child(even) { border-right: none; }
          .pp-cell:nth-last-child(-n+2) { border-bottom: none; }

          .pp-cell-label {
            font-size: 6.5pt;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #8B4513;
            margin-bottom: 1mm;
            font-weight: 500;
          }

          .pp-cell-value {
            font-size: 10pt;
            color: #1a1410;
            font-family: 'EB Garamond', serif;
          }

          .pp-cell-empty {
            color: #c4a882;
            font-style: italic;
            font-size: 9pt;
          }

          /* Socials */
          .pp-socials {
            display: flex;
            flex-wrap: wrap;
            gap: 2.5mm 5mm;
          }

          .pp-social-item {
            font-size: 8.5pt;
            color: #4a3828;
          }

          .pp-social-platform {
            font-size: 6.5pt;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #8B4513;
            margin-right: 1.5mm;
          }

          /* Account table */
          .pp-account-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 2mm 0;
            border-bottom: 1px solid rgba(196,149,106,0.25);
            font-size: 9.5pt;
          }

          .pp-account-row:last-child { border-bottom: none; }

          .pp-account-key {
            color: #4a3828;
            font-size: 9pt;
          }

          .pp-account-val {
            font-style: italic;
            color: #1a1410;
          }

          .pp-tag {
            font-size: 7pt;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 1mm 2.5mm;
            border: 1px solid currentColor;
          }

          .pp-tag-active { color: #2d6a4f; }
          .pp-tag-banned { color: #9b1c1c; }
          .pp-tag-role   { color: #8B4513; }
          .pp-tag-verified { color: #1e40af; }
          .pp-tag-no { color: #9b1c1c; }

          /* Footer */
          .pp-footer {
            position: absolute;
            bottom: 8mm;
            left: 22mm;
            right: 18mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 7pt;
            color: #c4a882;
            letter-spacing: 0.08em;
          }

          .pp-footer-rule {
            position: absolute;
            top: -3mm;
            left: 0; right: 0;
            height: 1px;
            background: rgba(196,149,106,0.3);
          }

          @media print {
            .pp-root {
              margin: 0;
              box-shadow: none;
            }
          }
        `}</style>

      <div className="pp-root">
        {/* Corner ornaments */}
        <div className="pp-corner pp-corner-tl" />
        <div className="pp-corner pp-corner-tr" />
        <div className="pp-corner pp-corner-bl" />
        <div className="pp-corner pp-corner-br" />

        {/* Header */}
        <div className="pp-header">
          <img
            src={user.image ?? "/default-avatar.png"}
            alt={user.name}
            className="pp-avatar"
          />
          <div className="pp-header-text">
            <div className="pp-name">{user.name}</div>
            <div className="pp-username">@{user.displayUsername}</div>
            <div className="pp-contact-row">
              <div className="pp-contact-item">
                <span className="pp-contact-label">Email</span>
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="pp-contact-item">
                  <span className="pp-contact-label">Phone</span>
                  <span>{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div className="pp-contact-item">
                  <span className="pp-contact-label">Address</span>
                  <span>{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional */}
        <div className="pp-section">
          <div className="pp-section-head">
            <span className="pp-section-num">§ 01</span>
            <span className="pp-section-title">Professional</span>
            <div className="pp-section-rule" />
          </div>
          <div className="pp-grid">
            <div className="pp-cell">
              <div className="pp-cell-label">Job Title</div>
              <div
                className={`pp-cell-value ${!user.jobTitle ? "pp-cell-empty" : ""}`}
              >
                {user.jobTitle || "Not provided"}
              </div>
            </div>
            <div className="pp-cell">
              <div className="pp-cell-label">Company</div>
              <div
                className={`pp-cell-value ${!user.currentCompany ? "pp-cell-empty" : ""}`}
              >
                {user.currentCompany || "Not provided"}
              </div>
            </div>
            <div className="pp-cell">
              <div className="pp-cell-label">Branch</div>
              <div
                className={`pp-cell-value ${!user.department ? "pp-cell-empty" : ""}`}
              >
                {user.department || "Not provided"}
              </div>
            </div>
            <div className="pp-cell">
              <div className="pp-cell-label">Graduation Year</div>
              <div
                className={`pp-cell-value ${!user.graduationYear ? "pp-cell-empty" : ""}`}
              >
                {user.graduationYear || "Not provided"}
              </div>
            </div>
            <div className="pp-cell" style={{ borderBottom: "none" }}>
              <div className="pp-cell-label">Date of Birth</div>
              <div
                className={`pp-cell-value ${!user.dateOfBirth ? "pp-cell-empty" : ""}`}
              >
                {toDisplayDate(user.dateOfBirth)}
              </div>
            </div>
          </div>
        </div>

        {/* Socials */}
        {user.socials && Object.keys(user.socials).length > 0 && (
          <div className="pp-section">
            <div className="pp-section-head">
              <span className="pp-section-num">§ 02</span>
              <span className="pp-section-title">Social Profiles</span>
              <div className="pp-section-rule" />
            </div>
            <div className="pp-socials">
              {Object.entries(user.socials).map(([platform, url]) => (
                <div key={platform} className="pp-social-item">
                  <span className="pp-social-platform">{platform}</span>
                  <span>{url}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pp-footer">
          <div className="pp-footer-rule" />
          <span>Vitaan Alumni Network</span>
          <span>
            Printed{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
});

UserProfilePrint.displayName = "UserProfilePrint";
export default UserProfilePrint;
