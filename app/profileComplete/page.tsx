"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import UserImageUpload from "@/components/imageFileUpdate";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  address: z.string().min(1, "Address is required"),
  graduationYear: z.coerce
    .number({ required_error: "Graduation year is required" })
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear() + 5, "Too far in future"),
  department: z.string().min(1, "Department is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  image: z.string().url("Profile image is required"),
  socials: z.object({
    linkedin: z.string().url("Invalid LinkedIn URL").optional(),
    instagram: z.string().url("Invalid Instagram URL").optional(),
    facebook: z.string().url("Invalid Facebook URL").optional(),
  }),
  imageKey: z.string().optional(),
  currentCompany: z.string().min(1, "Current company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
});

export default function ProfilePage() {
  const user = useUser();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const router = useRouter();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      address: "",
      imageKey: "",
      graduationYear: undefined,
      department: "",
      phone: "",
      image: "",
      socials: { linkedin: "", instagram: "", facebook: "" },
      currentCompany: "",
      jobTitle: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        address: user.address ?? "",
        graduationYear: user.graduationYear
          ? Number(user.graduationYear)
          : undefined,
        department: user.department ?? "",
        phone: user.phone ?? "",
        image: user.image ?? "",
        socials: {
          facebook: user.socials?.facebook ?? "",
          instagram: user.socials?.instagram ?? "",
          linkedin: user.socials?.linkedin ?? "",
        },
        imageKey: user.imageKey ?? "",
        currentCompany: user.currentCompany ?? "",
        jobTitle: user.jobTitle ?? "",
      });
      setImageUrl(user.image ?? "");
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return alert("User not available");

    try {
      const res = await fetch(`/api/firstTimeUser/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
      setTimeout(() => router.push("/dashboard/profile"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-10 text-black font-sans">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-10"
        >
          <h1 className="text-3xl font-bold text-center tracking-tight mb-4">
            Update Your Profile
          </h1>

          {/* Profile Image */}
          <section>
            <FormLabel>Profile Picture</FormLabel>
            <UserImageUpload
              onUploadSuccess={({ key, publicUrl }) => {
                setImageUrl(publicUrl);
                form.setValue("image", publicUrl); // store URL for display
                form.setValue("imageKey", key);
              }}
            />
            {imageUrl && (
              <Image
                src={imageUrl}
                width={800}
                height={800}
                alt="Uploaded"
                className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg border mt-4"
              />
            )}
            <FormMessage>{form.formState.errors.image?.message}</FormMessage>
          </section>

          {/* Contact Details */}
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="10 digit phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Education */}
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2022"
                      min={1900}
                      max={new Date().getFullYear() + 5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your department" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Professional Info */}
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="currentCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Job title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Social Links */}
          <section className="space-y-4">
            <FormLabel>Social Profiles</FormLabel>

            <FormField
              control={form.control}
              name="socials.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socials.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://instagram.com/username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socials.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://facebook.com/username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
