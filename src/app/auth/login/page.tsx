"use client";

import SignInForm from "@/components/auth/Signin/SigninForm";
import SigninSocialMedia from "@/components/auth/Signin/SigninSocialMedia";
import AuthBody from "@/layouts/AuthCandidates/AuthBody";

const page = () => {
  return (
    <AuthBody
      title="Login"
      description="Start your journey to a successful tech career today"
      backPath="/"
    >
      <SignInForm />
      <SigninSocialMedia />
    </AuthBody>
  );
};

export default page;
