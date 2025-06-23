"use client";
import { useState } from "react";
import {
  Edit3,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  Briefcase,
  CheckCircle,
  X,
  Save,
  Camera,
} from "lucide-react";

import SocialIcon from "@/components/ui/socialIcon";

export interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  onSave?: (userData: User) => void;
  onCancel?: () => void;
}

export interface User {
  id: string;
  email: string;
  name: string;
  displayUsername: string;
  role: "user" | "admin";
  address: string;
  graduationYear: number;
  department: string;
  socials: Record<string, string>;
  currentCompany: string;
  jobTitle: string;
  phone: string;
  emailVerified: boolean;
  image: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isEditable = false,
  onSave,
  onCancel,
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

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "moderator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const currentUser = editMode ? editedUser : user;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Avatar and basic info */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 relative z-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative group">
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
                />
                {editMode && (
                  <button className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                )}
              </div>

              <div className="mt-4 text-center md:text-left">
                {editMode ? (
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => updateUser("name", e.target.value)}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentUser.name}
                  </h1>
                )}

                <div className="flex items-center justify-center md:justify-start mt-1">
                  <span className="text-gray-500">
                    @{currentUser.displayUsername}
                  </span>
                </div>

                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeStyle(
                      currentUser.role
                    )}`}
                  >
                    {currentUser.role.charAt(0).toUpperCase() +
                      currentUser.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex-1 flex justify-end mt-4 md:mt-0">
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}

              {editMode && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      {editMode ? (
                        <input
                          type="email"
                          value={currentUser.email}
                          onChange={(e) => updateUser("email", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-900">
                          {currentUser.email}
                        </span>
                      )}
                      {currentUser.emailVerified && (
                        <div className="flex items-center mt-1">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-sm text-green-600">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    {editMode ? (
                      <input
                        type="tel"
                        value={currentUser.phone}
                        onChange={(e) => updateUser("phone", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900">{currentUser.phone}</span>
                    )}
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    {editMode ? (
                      <textarea
                        value={currentUser.address}
                        onChange={(e) => updateUser("address", e.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <span className="text-gray-900">
                        {currentUser.address}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Academic Information */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  Academic Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24 flex-shrink-0">
                      Year:
                    </span>
                    {editMode ? (
                      <input
                        type="number"
                        value={currentUser.graduationYear}
                        onChange={(e) =>
                          updateUser("graduationYear", parseInt(e.target.value))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {currentUser.graduationYear}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start">
                    <span className="text-gray-600 w-24 flex-shrink-0">
                      Department:
                    </span>
                    {editMode ? (
                      <input
                        type="text"
                        value={currentUser.department}
                        onChange={(e) =>
                          updateUser("department", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {currentUser.department}
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Professional Information */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                  Professional Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    {editMode ? (
                      <input
                        type="text"
                        value={currentUser.currentCompany}
                        onChange={(e) =>
                          updateUser("currentCompany", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Company Name"
                      />
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {currentUser.currentCompany}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    {editMode ? (
                      <input
                        type="text"
                        value={currentUser.jobTitle}
                        onChange={(e) => updateUser("jobTitle", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Job Title"
                      />
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {currentUser.jobTitle}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Social Links */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Social Links
                </h2>

                {currentUser.socials &&
                Object.keys(currentUser.socials).length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(currentUser.socials).map(
                      ([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
                        >
                          <SocialIcon
                            platform={platform}
                            className="w-5 h-5 mr-3 text-gray-600"
                          />
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {platform}
                          </span>
                        </a>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No social links added yet
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
