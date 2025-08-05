// // "use client";

// // // Import necessary hooks and icons from libraries
// // import { useState } from "react";
// // import {
// //   Edit3,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   GraduationCap,
// //   Briefcase,
// //   X,
// //   Save,
// //   Camera,
// // } from "lucide-react";

// // import { User } from "@/lib/types";
// // import SocialIcon from "@/components/ui/socialIcon";

// // // Props interface for user profile component
// // export interface UserProfileProps {
// //   user: User;
// //   isEditable?: boolean;
// //   onSave?: (userData: User) => void;
// //   onCancel?: () => void;
// //   EditingRights: boolean;
// //   refprop: any;
// // }

// // const UserProfile: React.FC<UserProfileProps> = ({
// //   user,
// //   isEditable = false,
// //   onSave,
// //   onCancel,
// //   EditingRights = false,
// //   refprop,
// // }) => {
// //   const [editMode, setEditMode] = useState(isEditable);
// //   const [editedUser, setEditedUser] = useState<User>(user);

// //   // Save updated profile
// //   const handleSave = () => {
// //     onSave?.(editedUser);
// //     setEditMode(false);
// //   };

// //   // Cancel editing and reset user state
// //   const handleCancel = () => {
// //     setEditedUser(user);
// //     setEditMode(false);
// //     onCancel?.();
// //   };

// //   // Handle individual field updates
// //   const updateUser = (field: keyof User, value: any) => {
// //     setEditedUser((prev) => ({ ...prev, [field]: value }));
// //   };

// //   // Style based on user role
// //   const getRoleBadgeStyle = (role: string) => {
// //     switch (role) {
// //       case "admin":
// //         return "bg-red-100 text-red-700 border border-red-200";
// //       default:
// //         return "bg-gray-100 text-gray-700 border border-gray-200";
// //     }
// //   };

// //   const currentUser = editMode ? editedUser : user;

// //   return (
// //     <div className="mx-auto max-w-5xl p-6" ref={refprop}>
// //       <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
// //         {/* Header cover */}
// //         {/* <div className="bg-gradient-to-r from-neutral-700 to-neutral-500 h-36 relative">
// //           <div className="absolute inset-0 bg-black bg-opacity-10" />
// //         </div> */}
// //         <div
// //           className="relative h-48 bg-[#F4E4BC] text-[#2F2F2F] flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23DAA520%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] before:opacity-40 before:z-0"
// //           style={{
// //             backgroundImage: `
// //       radial-gradient(circle at 25% 25%, #DAA520 2%, transparent 0),
// //       radial-gradient(circle at 75% 25%, #DAA520 2%, transparent 0),
// //       radial-gradient(circle at 25% 75%, #DAA520 2%, transparent 0),
// //       radial-gradient(circle at 75% 75%, #DAA520 2%, transparent 0)
// //     `,
// //             backgroundSize: "40px 40px",
// //             backgroundPosition: "0 0, 20px 20px, 20px 20px, 0 0",
// //           }}
// //         >
// //           <div className="relative z-10 text-center">
// //             <h2 className="text-3xl font-serif font-bold text-[#8B4513]">
// //               Profile
// //             </h2>
// //           </div>
// //         </div>

// //         <div className="relative px-6 pb-10">
// //           {/* Profile Picture and Name Section */}
// //           <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 relative z-10">
// //             <div className="flex flex-col items-center md:items-start">
// //               {/* Profile Image */}
// //               <div className="relative group">
// //                 <img
// //                   src={currentUser.image ?? undefined}
// //                   alt={currentUser.name}
// //                   className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-sm"
// //                 />
// //                 {editMode && (
// //                   <button className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
// //                     <Camera className="w-6 h-6 text-white" />
// //                   </button>
// //                 )}
// //               </div>
// //               <div className="mt-4 text-center md:text-left">
// //                 {/* Name input or display */}
// //                 {editMode ? (
// //                   <input
// //                     type="text"
// //                     value={currentUser.name}
// //                     onChange={(e) => updateUser("name", e.target.value)}
// //                     className="text-2xl font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black"
// //                   />
// //                 ) : (
// //                   <h1 className="text-2xl font-semibold text-gray-900">
// //                     {currentUser.name}
// //                   </h1>
// //                 )}
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   @{currentUser.displayUsername}
// //                 </p>
// //                 {/* Role Badge */}
// //                 {/* <span
// //                   className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${getRoleBadgeStyle(
// //                     currentUser.role
// //                   )}`}
// //                 >
// //                   {currentUser.role.charAt(0).toUpperCase() +
// //                     currentUser.role.slice(1)}
// //                 </span> */}
// //               </div>
// //             </div>

// //             {/* Edit and Save buttons */}
// //             <div className="flex-1 flex justify-end mt-6 md:mt-0">
// //               {!editMode && EditingRights && (
// //                 <button
// //                   onClick={() => setEditMode(true)}
// //                   className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800"
// //                 >
// //                   <Edit3 className="w-4 h-4 mr-2 inline-block" /> Edit Profile
// //                 </button>
// //               )}
// //               {editMode && (
// //                 <div className="flex space-x-3">
// //                   <button
// //                     onClick={handleCancel}
// //                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
// //                   >
// //                     <X className="w-4 h-4 mr-2 inline-block" /> Cancel
// //                   </button>
// //                   <button
// //                     onClick={handleSave}
// //                     className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
// //                   >
// //                     <Save className="w-4 h-4 mr-2 inline-block" /> Save Changes
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Profile Info Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
// //             {/* Sections */}
// //             <InfoSection
// //               title="Contact Information"
// //               icon={<Mail className="w-5 h-5 text-neutral-700" />}
// //             >
// //               <InfoRow
// //                 icon={<Mail className="text-gray-400" />}
// //                 label={currentUser.email}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("email", val)}
// //                 type="email"
// //               />
// //               <InfoRow
// //                 icon={<Phone className="text-gray-400" />}
// //                 label={currentUser.phone ?? ""}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("phone", val)}
// //                 type="tel"
// //               />
// //               <InfoRow
// //                 icon={<MapPin className="text-gray-400" />}
// //                 label={currentUser.address ?? ""}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("address", val)}
// //                 textarea
// //               />
// //             </InfoSection>

// //             <InfoSection
// //               title="Academic Information"
// //               icon={<GraduationCap className="w-5 h-5 text-neutral-700" />}
// //             >
// //               <InfoRow
// //                 label={String(currentUser.graduationYear)}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("graduationYear", parseInt(val))}
// //                 type="number"
// //                 prefix="Year:"
// //               />
// //               <InfoRow
// //                 label={currentUser.department ?? ""}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("department", val)}
// //                 prefix="Department:"
// //               />
// //             </InfoSection>

// //             <InfoSection
// //               title="Professional Information"
// //               icon={<Briefcase className="w-5 h-5 text-neutral-700" />}
// //             >
// //               <InfoRow
// //                 label={currentUser.currentCompany ?? ""}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("currentCompany", val)}
// //                 prefix="Company:"
// //               />
// //               <InfoRow
// //                 label={currentUser.jobTitle ?? ""}
// //                 editable={editMode}
// //                 onChange={(val) => updateUser("jobTitle", val)}
// //                 prefix="Title:"
// //               />
// //             </InfoSection>

// //             <InfoSection title="Social Links" icon={null}>
// //               {currentUser.socials &&
// //               Object.keys(currentUser.socials).length > 0 ? (
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {Object.entries(currentUser.socials).map(
// //                     ([platform, url]) => (
// //                       <a
// //                         key={platform}
// //                         href={url}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm hover:border-neutral-400"
// //                       >
// //                         <SocialIcon
// //                           platform={platform}
// //                           className="w-5 h-5 mr-3 text-gray-600"
// //                         />
// //                         <span className="text-sm font-medium text-gray-900 capitalize">
// //                           {platform}
// //                         </span>
// //                       </a>
// //                     )
// //                   )}
// //                 </div>
// //               ) : (
// //                 <p className="text-sm text-gray-500">
// //                   No social links added yet.
// //                 </p>
// //               )}
// //             </InfoSection>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Info section layout component
// // interface InfoSectionProps {
// //   title: string;
// //   icon: React.ReactNode;
// //   children: React.ReactNode;
// // }

// // const InfoSection: React.FC<InfoSectionProps> = ({ title, icon, children }) => (
// //   <section className="bg-gray-50 rounded-lg p-6 h-full flex flex-col justify-start">
// //     <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //       {icon} {title}
// //     </h2>
// //     <div className="space-y-4">{children}</div>
// //   </section>
// // );

// // // Info field row component
// // interface InfoRowProps {
// //   label: string;
// //   editable: boolean;
// //   onChange: (val: string) => void;
// //   type?: string;
// //   textarea?: boolean;
// //   icon?: React.ReactNode;
// //   prefix?: string;
// // }

// // const InfoRow: React.FC<InfoRowProps> = ({
// //   label,
// //   editable,
// //   onChange,
// //   type = "text",
// //   textarea = false,
// //   icon,
// //   prefix,
// // }) => (
// //   <div className="flex items-start gap-3">
// //     {icon && <div className="mt-1">{icon}</div>}
// //     <div className="flex-1">
// //       {editable ? (
// //         textarea ? (
// //           <textarea
// //             rows={2}
// //             value={label}
// //             onChange={(e) => onChange(e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent resize-none"
// //           />
// //         ) : (
// //           <input
// //             type={type}
// //             value={label}
// //             onChange={(e) => onChange(e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
// //           />
// //         )
// //       ) : (
// //         <p className="text-gray-900">
// //           {prefix && <span className="font-medium mr-1">{prefix}</span>}
// //           {label}
// //         </p>
// //       )}
// //     </div>
// //   </div>
// // );

// // export default UserProfile;
"use client";

import { useState } from "react";
import {
  Edit3,
  Mail,
  GraduationCap,
  Briefcase,
  Save,
  X,
  Camera,
} from "lucide-react";
import { User } from "@/lib/types";
import SocialIcon from "@/components/ui/socialIcon";

export interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  onSave?: (userData: User) => void;
  onCancel?: () => void;
  EditingRights: boolean;
  refprop?: any;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isEditable = false,
  onSave,
  onCancel,
  EditingRights = false,
  refprop,
}) => {
  const [editMode, setEditMode] = useState(isEditable);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleSave = () => {
    onSave?.(editedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditMode(false);
    onCancel?.();
  };

  const updateUser = (field: keyof User, value: any) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const currentUser = editMode ? editedUser : user;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6" ref={refprop}>
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#F4E4BC] to-[#FFF8E7] p-6 rounded-b-2xl shadow">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={currentUser.image ?? "/default-avatar.png"}
                alt={currentUser.name}
                className="w-28 h-28 rounded-xl object-cover border-4 border-white shadow"
              />
              {editMode && (
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6" />
                </button>
              )}
            </div>
            <div>
              {editMode ? (
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => updateUser("name", e.target.value)}
                  className="text-3xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-black "
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                />
              ) : (
                <h1 className="text-3xl font-bold text-[#8B4513] font-devanagari">
                  {currentUser.name}
                </h1>
              )}
              <p className="text-gray-600">@{currentUser.displayUsername}</p>
              <p
                className="text-sm italic text-[#555] mt-1 "
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                “सर्वे भवन्तु सुखिनः” — May all be happy.
              </p>
            </div>
          </div>

          {EditingRights && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 md:mt-0 px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800"
            >
              <Edit3 className="w-4 h-4 mr-2 inline-block" /> Edit Profile
            </button>
          )}

          {editMode && (
            <div className="flex mt-4 md:mt-0 space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-1 inline-block" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-1 inline-block" /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Academic & Professional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard
          title="शैक्षणिक जानकारी / Academic Info"
          icon={<GraduationCap className="w-5 h-5" />}
        >
          <Field
            label="Graduation Year"
            value={String(currentUser.graduationYear)}
            editable={false}
            onChange={(val) => updateUser("graduationYear", parseInt(val))}
          />
          <Field
            label="Department"
            value={currentUser.department ?? ""}
            editable={false}
            onChange={(val) => updateUser("department", val)}
          />
        </ProfileCard>

        <ProfileCard
          title="पेशा / Professional Info"
          icon={<Briefcase className="w-5 h-5" />}
        >
          <Field
            label="Company"
            value={currentUser.currentCompany ?? ""}
            editable={editMode}
            onChange={(val) => updateUser("currentCompany", val)}
          />
          <Field
            label="Title"
            value={currentUser.jobTitle ?? ""}
            editable={editMode}
            onChange={(val) => updateUser("jobTitle", val)}
          />
        </ProfileCard>
      </div>

      {/* Contact Info */}
      <ProfileCard title="संपर्क / Contact" icon={<Mail className="w-5 h-5" />}>
        <Field
          label="Email"
          value={currentUser.email}
          editable={false}
          onChange={(val) => updateUser("email", val)}
          type="email"
        />
        <Field
          label="Phone"
          value={currentUser.phone ?? ""}
          editable={editMode}
          onChange={(val) => updateUser("phone", val)}
          type="tel"
        />
        <Field
          label="Address"
          value={currentUser.address ?? ""}
          editable={editMode}
          onChange={(val) => updateUser("address", val)}
          textarea
        />
      </ProfileCard>

      {/* Socials */}
      <ProfileCard title="सोशल मीडिया / Social Media">
        {currentUser.socials && Object.keys(currentUser.socials).length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(currentUser.socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-white border border-gray-200 rounded-md hover:shadow-sm"
              >
                <SocialIcon
                  platform={platform}
                  className="w-5 h-5 mr-2 text-gray-600"
                />
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {platform}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p
            className="text-sm text-gray-500 "
            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          >
            कोई लिंक नहीं जुड़े हैं।
          </p>
        )}
      </ProfileCard>
    </div>
  );
};

export default UserProfile;

// 🔹 Card Container
const ProfileCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-[#FDF6E3] border-l-1 border-[#DAA520] p-6 rounded-xl shadow-sm space-y-3">
    <h3
      className="text-lg font-bold flex items-center gap-2 text-gray-800 "
      style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
    >
      {icon} {title}
    </h3>
    {children}
  </div>
);

// 🔹 Reusable Field
const Field = ({
  label,
  value,
  editable,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  editable: boolean;
  onChange: (val: string) => void;
  type?: string;
  textarea?: boolean;
}) => (
  <div>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    {editable ? (
      textarea ? (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
        />
      )
    ) : (
      <p className="text-gray-800">
        {value || <span className="text-gray-400">—</span>}
      </p>
    )}
  </div>
);
