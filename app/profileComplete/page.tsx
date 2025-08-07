"use client";

import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import UserImageUpload from "@/components/imageFileUpdate";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type FormValues = {
  address: string;
  graduationYear: number;
  department: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  currentCompany: string;
  jobTitle: string;
  phone: string;
  image: string;
};

export default function ProfilePage() {
  const user = useUser();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      reset({
        address: user.address ?? "",
        graduationYear: user.graduationYear ?? new Date().getFullYear(),
        department: user.department ?? "",
        facebook: user.socials?.facebook ?? "",
        instagram: user.socials?.instagram ?? "",
        linkedin: user.socials?.linkedin ?? "",
        currentCompany: user.currentCompany ?? "",
        jobTitle: user.jobTitle ?? "",
        phone: user.phone ?? "",
        image: user.image ?? "",
      });
      setImageUrl(user.image ?? "");
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!user) return alert("User not available");

    if (!data.image) {
      setError("image", { message: "Profile image is required" });
      return;
    }

    try {
      const payload = {
        ...data,
        socials: {
          facebook: data.facebook,
          instagram: data.instagram,
          linkedin: data.linkedin,
        },
      };

      const res = await fetch(`/api/firstTimeUser/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/profile");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-10 text-black font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto space-y-10"
      >
        <h1 className="text-3xl font-bold text-center tracking-tight mb-4">
          Update Your Profile
        </h1>

        {/* Profile Image */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold mb-2">Profile Picture</h2>
          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            <div className="flex-1">
              <UserImageUpload
                onUploadSuccess={(url) => {
                  setImageUrl(url);
                  setValue("image", url);
                }}
              />
              <input
                type="hidden"
                {...register("image", {
                  required: "Profile image is required",
                })}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
            {imageUrl && (
              <div className="mt-4 md:mt-0">
                <Image
                  src={imageUrl}
                  width={800}
                  height={800}
                  alt="Uploaded"
                  className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </section>

        {/* Contact Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <InputField
            label="Phone Number"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            error={errors.phone?.message}
          />
          <InputField
            label="Address"
            {...register("address", { required: "Address is required" })}
            error={errors.address?.message}
          />
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Education</h2>
          <InputField
            label="Graduation Year"
            type="number"
            {...register("graduationYear", {
              required: "Graduation year is required",
              valueAsNumber: true,
              min: { value: 1900, message: "Enter a valid year" },
              max: {
                value: new Date().getFullYear() + 5,
                message: "Too far in future",
              },
            })}
            error={errors.graduationYear?.message}
          />
          <InputField
            label="Department"
            {...register("department", { required: "Department is required" })}
            error={errors.department?.message}
          />
        </section>

        {/* Professional Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Professional Information</h2>
          <InputField
            label="Current Company"
            {...register("currentCompany", {
              required: "Current company is required",
            })}
            error={errors.currentCompany?.message}
          />
          <InputField
            label="Job Title"
            {...register("jobTitle", { required: "Job title is required" })}
            error={errors.jobTitle?.message}
          />
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Social Links</h2>
          <InputField
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedin", {
              required: "LinkedIn URL is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
                message: "Enter a valid LinkedIn URL",
              },
            })}
            error={errors.linkedin?.message}
          />
          <InputField
            label="Instagram"
            type="url"
            placeholder="https://instagram.com/yourprofile"
            {...register("instagram", {
              required: "Instagram URL is required",
              pattern: {
                value: /^https?:\/\/(www\.)?instagram\.com\/.*$/,
                message: "Enter a valid Instagram URL",
              },
            })}
            error={errors.instagram?.message}
          />
          <InputField
            label="Facebook"
            type="url"
            placeholder="https://facebook.com/yourprofile"
            {...register("facebook", {
              required: "Facebook URL is required",
              pattern: {
                value: /^https?:\/\/(www\.)?facebook\.com\/.*$/,
                message: "Enter a valid Facebook URL",
              },
            })}
            error={errors.facebook?.message}
          />
        </section>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white hover:bg-neutral-800 transition-all"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

// ------------------------

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm block">{label}</label>
      <input
        {...props}
        className={`w-full bg-white border ${
          error ? "border-red-500" : "border-neutral-300"
        } rounded-md px-3 py-2 focus:outline-none focus:ring-1 ${
          error ? "focus:ring-red-500" : "focus:ring-black"
        } text-sm`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
