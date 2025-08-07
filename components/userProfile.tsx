"use client";

import { useState } from "react";
import {
  Edit3,
  Mail,
  GraduationCap,
  Save,
  X,
  Camera,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { User } from "@/lib/types";
import SocialIcon from "@/components/ui/socialIcon";

export interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  onSave?: (userData: User) => void;
  onCancel?: () => void;
  EditingRights: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUser = (field: keyof User, value: any) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const currentUser = editMode ? editedUser : user;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6" ref={refprop}>
      {/* Hero Header */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={currentUser.image ?? "/default-avatar.png"}
                alt={currentUser.name}
                className="w-28 h-28 aspect-video rounded-xl object-cover border-4 border-white shadow"
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

      <div className="grid md:grid-cols-6 grid-flow-col gap-6">
        <div className="space-y-6 col-span-4">
          <ProfileCard
            title="Professioinal Info"
            icon={<GraduationCap className="w-8 h-8" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 ">
              <Field
                label="Graduation Year"
                value={String(currentUser.graduationYear)}
                editable={false}
                onChange={(val) => updateUser("graduationYear", parseInt(val))}
              />

              <Field
                label="Company"
                value={currentUser.currentCompany ?? ""}
                editable={editMode}
                onChange={(val) => updateUser("currentCompany", val)}
              />
              <Field
                label="Department"
                value={currentUser.department ?? ""}
                editable={false}
                onChange={(val) => updateUser("department", val)}
              />
              <Field
                label="Title"
                value={currentUser.jobTitle ?? ""}
                editable={editMode}
                onChange={(val) => updateUser("jobTitle", val)}
              />
            </div>
          </ProfileCard>

          {/* Contact Info */}
          <ProfileCard title="Contact" icon={<Mail className="w-5 h-5" />}>
            <Field
              label="Email"
              value={currentUser.email}
              editable={false}
              onChange={(val) => updateUser("email", val)}
              type="email"
              Contact={true}
            />
            <Field
              label="Phone"
              value={currentUser.phone ?? ""}
              editable={editMode}
              onChange={(val) => updateUser("phone", val)}
              type="tel"
              Contact={true}
            />
            <Field
              label="Address"
              value={currentUser.address ?? ""}
              editable={editMode}
              onChange={(val) => updateUser("address", val)}
              textarea
              Contact={true}
            />
          </ProfileCard>

          {/* Socials */}
        </div>
        <div className="col-span-2 space-y-5">
          <ProfileCard title="Account Status">
            <div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.banned
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.banned ? "Banned" : "Active"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email Verified</span>
                  {user.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </ProfileCard>
          <ProfileCard title="Social Media">
            {currentUser.socials &&
            Object.keys(currentUser.socials).length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
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
                No links to display
              </p>
            )}
          </ProfileCard>
        </div>
      </div>
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
  <div className="bg-white border-l-1 p-6 rounded-xl shadow-lg space-y-3">
    <h3
      className="text-3xl font-bold flex items-center gap-2 text-[#8B4513] "
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
  Contact,
  type = "text",
  textarea = false,
}: {
  label: string;
  Contact?: boolean;
  value: string;
  editable: boolean;
  onChange: (val: string) => void;
  type?: string;
  textarea?: boolean;
}) => (
  <div>
    {!Contact && <p className="text-sm text-gray-600 mb-1">{label}</p>}
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
      (Contact == true && (
        <p className="text-gray-600 text-base font-semibold">
          {label}: <span className="text-gray-500 text-base">{value}</span>
        </p>
      )) || (
        <p className="text-gray-600 text-lg font-semibold">
          {value || <span className="text-gray-400">—</span>}
        </p>
      )
    )}
  </div>
);
