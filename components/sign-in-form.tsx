"use client";

// import { signInWithGoogle } from "@/app/(auth)/actions/authAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          toast("Signing in...");
        },
        onSuccess: async () => {
          form.reset();

          // 🔄 Call API to get user profile
          const res = await fetch("/api/me");
          const user = await res.json();

          const requiredFields = [
            "graduationYear",
            "department",
            "currentCompany",
            "jobTitle",
            "address",
            "phone",
          ];

          const isProfileComplete = requiredFields.every(
            (field) => user[field] !== null && user[field] !== ""
          );

          if (!isProfileComplete) {
            router.push("/profileComplete");
          } else {
            router.push("/dashboard");
          }
        },
        onError: (ctx) => {
          // toast.error(ctx.error.message);
          const msg = ctx.error.message;

          // 🔁 Pending → redirect to /pending
          if (msg === "Your account is awaiting admin approval.") {
            router.push("/pending");
            return;
          }

          // ❌ Rejected → maybe show toast or redirect elsewhere
          if (msg === "Your account has been rejected.") {
            toast.error("Your account has been rejected by an administrator.");
            return;
          }

          // Default error behavior
          toast.error(msg);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline underline-offset-4"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="mx-auto">
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
