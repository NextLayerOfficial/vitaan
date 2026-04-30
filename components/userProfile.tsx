"use client";

import { useState } from "react";
import {
  Edit3,
  Save,
  X,
  Camera,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
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

function toDateInputValue(val: Date | string | null | undefined): string {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function toDisplayDate(val: Date | string | null | undefined): string {
  if (!val) return "Not provided";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "Not provided";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
  const [previewOpen, setPreviewOpen] = useState(false);

  const updateUser = (field: keyof User, value: any) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const currentUser = editMode ? editedUser : user;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');

        :root {
          --brand:       #8B4513;
          --brand-deep:  #5c2d0a;
          --brand-mid:   #b5601e;
          --brand-light: #f5ede6;
          --brand-warm:  #e8d5c4;
          --parchment:   #faf6f1;
          --ink:         #1c1008;
          --ink-soft:    #4a3828;
          --ink-muted:   #9c8470;
          --ink-faint:   #cfc0b0;
          --sidebar-bg:  #1c1008;
          --sidebar-text:#f5ede6;
          --sidebar-muted: #9c8470;
          --line:        rgba(139,69,19,0.15);
          --line-strong: rgba(139,69,19,0.28);
        }

        .up-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .up-root {
          min-height: 100vh;
          background: var(--parchment);
          font-family: 'Outfit', sans-serif;
          display: grid;
          grid-template-columns: 280px 1fr;
          grid-template-rows: auto 1fr;
        }

        .up-sidebar {
          grid-row: 1 / -1;
          background: var(--sidebar-bg);
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 3rem 0 3rem;
          min-height: 100vh;
          overflow: hidden;
        }

        .up-sidebar::after {
          content: '';
          position: absolute;
          bottom: -40px; right: -40px;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(139,69,19,0.18);
          pointer-events: none;
        }

        .up-sidebar::before {
          content: '';
          position: absolute;
          bottom: 20px; right: 20px;
          width: 100px; height: 100px;
          border-radius: 50%;
          border: 1px solid rgba(139,69,19,0.12);
          pointer-events: none;
        }

        .up-sidebar-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--brand-mid);
          position: absolute;
          left: 1.5rem;
          top: 3rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
        }

        .up-avatar-zone { padding: 0 2rem 0 3.5rem; margin-bottom: 2.5rem; }

        .up-avatar-frame { position: relative; display: inline-block; cursor: pointer; }

        .up-avatar-frame img {
          width: 160px; height: 160px;
          object-fit: cover; display: block;
          clip-path: polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%);
          filter: sepia(10%) contrast(1.05);
          transition: filter 0.3s;
        }
        .up-avatar-frame:hover img { filter: sepia(20%) contrast(1.1) brightness(0.9); }

        .up-avatar-cam {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; color: #fff;
        }
        .up-avatar-frame:hover .up-avatar-cam { opacity: 1; }

        .up-avatar-corner {
          position: absolute; top: 0; right: 0;
          width: 14px; height: 14px;
          background: var(--brand-mid);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }

        .up-sidebar-name { padding: 0 2rem 0 3.5rem; flex: 1; }

        .up-sidebar-name h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300;
          color: var(--sidebar-text);
          line-height: 1.1; margin-bottom: 0.4rem;
        }
        .up-sidebar-name h1 em { font-style: italic; color: var(--brand-mid); }

        .up-edit-name-input {
          background: transparent; border: none;
          border-bottom: 1px solid var(--brand-mid);
          color: var(--sidebar-text);
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300;
          width: 100%; outline: none;
          padding-bottom: 4px; margin-bottom: 0.4rem;
        }

        .up-username { font-size: 0.7rem; color: var(--sidebar-muted); letter-spacing: 0.1em; margin-bottom: 1.5rem; }

        .up-badges { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }

        .up-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.65rem; letter-spacing: 0.08em;
          text-transform: uppercase; font-weight: 500;
          color: var(--sidebar-muted);
        }

        .up-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .dot-active { background: #6fcf97; }
        .dot-banned { background: #eb5757; }
        .dot-role   { background: var(--brand-mid); }

        .up-sidebar-social { margin-top: 1.25rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }

        .up-social-chip {
          font-size: 0.65rem; padding: 4px 10px;
          border: 1px solid rgba(139,69,19,0.3); border-radius: 2px;
          color: var(--sidebar-muted); text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.06em; text-transform: uppercase;
          transition: all 0.2s;
        }
        .up-social-chip:hover { border-color: var(--brand-mid); color: var(--brand-mid); }

        .up-sidebar-actions { padding: 1.5rem 2rem 0 3.5rem; margin-top: auto; }

        .up-topbar {
          grid-column: 2;
          padding: 2rem 3.5rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--line);
        }
        .up-topbar-left { display: flex; align-items: center; gap: 1.5rem; }
        .up-topbar-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--ink-muted); font-weight: 400;
        }

        .up-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 0.5rem 1.25rem;
          border: 1px solid transparent; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          border-radius: 2px; transition: all 0.15s;
        }
        .up-btn-edit   { background: var(--brand); color: #fff; border-color: var(--brand); }
        .up-btn-edit:hover { background: var(--brand-deep); }
        .up-btn-save   { background: var(--ink); color: var(--sidebar-text); }
        .up-btn-save:hover { background: var(--brand-deep); }
        .up-btn-cancel { background: transparent; color: var(--ink-muted); border-color: var(--line-strong); }
        .up-btn-cancel:hover { background: var(--brand-light); }

        .up-content { grid-column: 2; padding: 3rem 3.5rem; display: flex; flex-direction: column; gap: 0; }

        .up-section-heading { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; }
        .up-section-num { font-family: 'Cormorant Garamond', serif; font-size: 0.75rem; color: var(--brand-mid); letter-spacing: 0.05em; }
        .up-section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; color: var(--ink); letter-spacing: 0.04em; }
        .up-section-line { flex: 1; height: 1px; background: var(--line); }

        .up-pro-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--line-strong); margin-bottom: 3.5rem; }

        .up-pro-cell { padding: 1.5rem; border-right: 1px solid var(--line-strong); position: relative; }
        .up-pro-cell:last-child { border-right: none; }
        .up-pro-cell::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--brand); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
        }
        .up-pro-cell:hover::before { transform: scaleX(1); }

        .up-field-label { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 0.5rem; font-weight: 500; }
        .up-field-value { font-size: 0.95rem; color: var(--ink); font-weight: 300; line-height: 1.3; }
        .up-field-empty { color: var(--ink-faint); }

        .up-edit-field {
          width: 100%;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; font-weight: 300;
          background: var(--brand-light);
          border: none; border-bottom: 1px solid var(--brand-mid);
          color: var(--ink); padding: 0.3rem 0.4rem;
          outline: none; border-radius: 0;
        }

        /* Date input — same style as up-edit-field but with styled picker icon */
        .up-edit-field[type="date"] { cursor: pointer; }
        .up-edit-field[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.5; cursor: pointer;
          filter: invert(35%) sepia(50%) saturate(400%) hue-rotate(10deg);
        }

        .up-lower-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 3rem; margin-bottom: 3.5rem; }

        .up-contact-item {
          display: grid; grid-template-columns: 40px 1fr;
          align-items: start; gap: 1rem;
          padding: 1.2rem 0; border-bottom: 1px solid var(--line);
        }
        .up-contact-item:first-child { border-top: 1px solid var(--line); }

        .up-contact-icon-box {
          width: 36px; height: 36px;
          border: 1px solid var(--line-strong);
          display: flex; align-items: center; justify-content: center;
          color: var(--brand); flex-shrink: 0;
        }

        .up-account-table { width: 100%; }
        .up-account-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--line); font-size: 0.85rem; }
        .up-account-row:first-child { border-top: 1px solid var(--line); }
        .up-account-label { color: var(--ink-muted); font-weight: 300; }
        .up-account-val { font-weight: 400; color: var(--ink); display: flex; align-items: center; gap: 5px; }
        .up-verified-yes { color: #27ae60; }
        .up-verified-no  { color: #eb5757; }

        .up-status-tag { font-size: 0.65rem; padding: 3px 8px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }
        .up-tag-active { background: #e8f5e9; color: #1b5e20; border: 1px solid #c8e6c9; }
        .up-tag-banned { background: #fde8e8; color: #7f1d1d; border: 1px solid #fca5a5; }
        .up-tag-role   { background: var(--brand-light); color: var(--brand-deep); border: 1px solid var(--brand-warm); }

        .up-modal {
          position: fixed; inset: 0;
          background: rgba(10,5,2,0.88);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; backdrop-filter: blur(4px);
        }
        .up-modal img {
          max-width: 88%; max-height: 88%; display: block;
          clip-path: polygon(0 0, 97% 0, 100% 3%, 100% 100%, 0 100%);
        }

        @media (max-width: 900px) {
          .up-root { grid-template-columns: 1fr; }
          .up-sidebar { grid-row: auto; min-height: auto; padding: 2rem; align-items: center; flex-direction: row; flex-wrap: wrap; gap: 1.5rem; }
          .up-sidebar-label { display: none; }
          .up-avatar-zone { padding: 0; margin-bottom: 0; }
          .up-sidebar-name, .up-sidebar-actions { padding: 0; }
          .up-topbar, .up-content { grid-column: 1; }
          .up-pro-grid { grid-template-columns: 1fr 1fr; }
          .up-lower-grid { grid-template-columns: 1fr; }
          .up-topbar { padding: 1.5rem; }
          .up-content { padding: 2rem 1.5rem; }
        }

        @media (max-width: 580px) {
          .up-pro-grid { grid-template-columns: 1fr; }
          .up-pro-cell { border-right: none; border-bottom: 1px solid var(--line-strong); }
          .up-pro-cell:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="up-root" ref={refprop}>
        <aside className="up-sidebar">
          <span className="up-sidebar-label">Member Profile</span>

          <div className="up-avatar-zone">
            <div
              className="up-avatar-frame"
              onClick={() => setPreviewOpen(true)}
            >
              <img
                src={currentUser.image ?? "/default-avatar.png"}
                alt={currentUser.name}
              />
              <div className="up-avatar-corner" />
              {editMode && (
                <div className="up-avatar-cam">
                  <Camera size={22} />
                </div>
              )}
            </div>
          </div>

          <div className="up-sidebar-name">
            {editMode ? (
              <input
                className="up-edit-name-input"
                value={currentUser.name}
                onChange={(e) => updateUser("name", e.target.value)}
              />
            ) : (
              <h1>
                {currentUser.name.split(" ")[0]}{" "}
                <em>{currentUser.name.split(" ").slice(1).join(" ")}</em>
              </h1>
            )}
            <p className="up-username">@{currentUser.displayUsername}</p>
            <div className="up-badges">
              <span className="up-badge">
                <span
                  className={`up-badge-dot ${user.banned ? "dot-banned" : "dot-active"}`}
                />
                {user.banned ? "Banned" : "Active"}
              </span>
              <span className="up-badge">
                <span className="up-badge-dot dot-role" />
                {user.role}
              </span>
            </div>
          </div>

          <div className="up-sidebar-actions">
            {!editMode ? (
              EditingRights && (
                <button
                  className="up-btn up-btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  <Edit3 size={13} /> Edit Profile
                </button>
              )
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="up-btn up-btn-cancel"
                  onClick={() => {
                    setEditMode(false);
                    onCancel?.();
                  }}
                >
                  <X size={13} />
                </button>
                <button
                  className="up-btn up-btn-save"
                  onClick={() => {
                    onSave?.(editedUser);
                    setEditMode(false);
                  }}
                >
                  <Save size={13} /> Save
                </button>
              </div>
            )}
          </div>
        </aside>

        <div className="up-topbar">
          <div className="up-topbar-left">
            <span className="up-topbar-heading">User Record</span>
          </div>
        </div>

        <main className="up-content">
          <div className="up-section-heading">
            <span className="up-section-num">§ 01</span>
            <h2 className="up-section-title">Professional</h2>
            <div className="up-section-line" />
          </div>

          <div className="up-pro-grid">
            {(
              [
                { label: "Branch", field: "department" as keyof User },
                {
                  label: "Year",
                  field: "graduationYear" as keyof User,
                },
                { label: "Company", field: "currentCompany" as keyof User },
                { label: "Job Title", field: "jobTitle" as keyof User },
              ] as { label: string; field: keyof User }[]
            ).map(({ label, field }) => (
              <div className="up-pro-cell" key={field}>
                <p className="up-field-label">{label}</p>
                {editMode ? (
                  <input
                    className="up-edit-field"
                    value={String(currentUser[field] ?? "")}
                    onChange={(e) => updateUser(field, e.target.value)}
                  />
                ) : (
                  <p
                    className={`up-field-value ${!currentUser[field] ? "up-field-empty" : ""}`}
                  >
                    {currentUser[field] ? String(currentUser[field]) : "—"}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="up-section-heading">
            <span className="up-section-num">§ 02</span>
            <h2 className="up-section-title">Contact & Account</h2>
            <div className="up-section-line" />
          </div>

          <div className="up-lower-grid">
            <div>
              {/* Email — never editable */}
              <div className="up-contact-item">
                <div className="up-contact-icon-box">
                  <Mail size={15} />
                </div>
                <div>
                  <p className="up-field-label">Email</p>
                  <p className="up-field-value">
                    {currentUser.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="up-contact-item">
                <div className="up-contact-icon-box">
                  <Phone size={15} />
                </div>
                <div>
                  <p className="up-field-label">Phone</p>
                  {editMode ? (
                    <input
                      className="up-edit-field"
                      value={currentUser.phone ?? ""}
                      onChange={(e) => updateUser("phone", e.target.value)}
                    />
                  ) : (
                    <p className="up-field-value">
                      {currentUser.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="up-contact-item">
                <div className="up-contact-icon-box">
                  <MapPin size={15} />
                </div>
                <div>
                  <p className="up-field-label">Address</p>
                  {editMode ? (
                    <input
                      className="up-edit-field"
                      value={currentUser.address ?? ""}
                      onChange={(e) => updateUser("address", e.target.value)}
                    />
                  ) : (
                    <p className="up-field-value">
                      {currentUser.address || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth — date picker in edit mode */}
              <div className="up-contact-item">
                <div className="up-contact-icon-box">
                  <Calendar size={15} />
                </div>
                <div>
                  <p className="up-field-label">Date of Birth</p>
                  {editMode ? (
                    <input
                      type="date"
                      className="up-edit-field"
                      max={new Date().toISOString().split("T")[0]}
                      value={toDateInputValue(currentUser.dateOfBirth)}
                      onChange={(e) =>
                        updateUser("dateOfBirth", e.target.value)
                      }
                    />
                  ) : (
                    <p className="up-field-value">
                      {toDisplayDate(currentUser.dateOfBirth)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Account */}
            <div>
              <div className="up-account-table">
                <div className="up-account-row">
                  <span className="up-account-label">Email Verified</span>
                  <span className="up-account-val">
                    {user.emailVerified ? (
                      <CheckCircle size={16} className="up-verified-yes" />
                    ) : (
                      <XCircle size={16} className="up-verified-no" />
                    )}
                  </span>
                </div>
                <div className="up-account-row">
                  <span className="up-account-label">Status</span>
                  <span
                    className={`up-status-tag ${user.banned ? "up-tag-banned" : "up-tag-active"}`}
                  >
                    {user.banned ? "Banned" : "Active"}
                  </span>
                </div>
                <div className="up-account-row">
                  <span className="up-account-label">Role</span>
                  <span className="up-status-tag up-tag-role">{user.role}</span>
                </div>
                {editMode ? (
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {Object.entries(currentUser.socials ?? {}).map(
                      ([platform, url]) => (
                        <div
                          key={platform}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              minWidth: "80px",
                            }}
                          >
                            <SocialIcon
                              platform={platform}
                              className="w-3 h-3"
                            />
                            <span
                              style={{
                                fontSize: "0.65rem",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "var(--sidebar-muted)",
                              }}
                            >
                              {platform}
                            </span>
                          </div>
                          <input
                            className="up-edit-field"
                            type="url"
                            placeholder={`https://${platform}.com/...`}
                            value={url ?? ""}
                            onChange={(e) =>
                              updateUser("socials", {
                                ...currentUser.socials,
                                [platform]: e.target.value,
                              })
                            }
                          />
                        </div>
                      ),
                    )}
                  </div>
                ) : currentUser.socials &&
                  Object.keys(currentUser.socials).length > 0 ? (
                  <div className="up-sidebar-social justify-evenly md:justify-start">
                    {Object.entries(currentUser.socials).map(
                      ([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          className="up-social-chip"
                        >
                          <SocialIcon platform={platform} className="w-3 h-3" />
                          {platform}
                        </a>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>

      {previewOpen && (
        <div className="up-modal" onClick={() => setPreviewOpen(false)}>
          <img
            src={currentUser.image ?? "/default-avatar.png"}
            alt={currentUser.name}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;
