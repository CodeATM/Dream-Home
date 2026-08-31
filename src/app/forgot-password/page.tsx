import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/forms/auth-panel";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Meridian password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      mode="forgot-password"
      imageId="1568605114967-8130f3a36994"
      headline="Locked out, not out of luck."
    />
  );
}
