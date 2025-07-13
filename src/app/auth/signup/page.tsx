"use client";

import SignupForm from "@/components/auth/Signup/SignupForm";
import SignupSocialMedia from "@/components/auth/Signup/SignupSocialMedia";
import AuthBody from "@/layouts/AuthCandidates/AuthBody";
import { JSX } from "react";

const SignUp = (): JSX.Element => {
  return (
    <AuthBody
      title="Sign Up Now"
      description="Start your journey to a successful tech career today."
      backPath="/"
    >
      <SignupForm />
      <SignupSocialMedia />
    </AuthBody>
  );
};

export default SignUp;
