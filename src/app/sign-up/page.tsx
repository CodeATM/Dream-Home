import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/forms/auth-panel";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Meridian account to save homes and get alerts.",
};

export default function SignUpPage() {
  return (
    <AuthSplitLayout
      mode="sign-up"
      imageId="1512917774080-9991f1c4c750"
      headline="Every saved search brings you one step closer to home."
    />
  );
}
