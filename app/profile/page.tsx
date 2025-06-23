import { updateProfile } from "@/app/actions/update-profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/userProfile";


export default async function ProfilePage() {
  return (
    <main className="max-w-lg mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      <form action={updateProfile} className="space-y-4">
        {/* <Input name="preferredName" placeholder="Preferred Name" /> */}
        <Input name="address" placeholder="Address" />
        <Input
          name="graduationYear"
          type="number"
          placeholder="Graduation Year"
        />
        <Input name="department" placeholder="Department" />
        <Input name="currentCompany" placeholder="Current Company" />
        <Input name="jobTitle" placeholder="Job Title" />
        <Input name="phone" placeholder="Phone" />

        <Button type="submit">Save Changes</Button>
      </form>

      <UserProfile user={user} />
    </main>
  );
}
