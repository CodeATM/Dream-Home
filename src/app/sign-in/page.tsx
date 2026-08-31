import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/forms/auth-panel";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Meridian account.",
};

export default function SignInPage() {
  return (
    <AuthSplitLayout
      mode="sign-in"
      imageId="1600585154340-be6161a56a0c"
      headline="The right home is out there. Let's go find it."
    />
  );
}
