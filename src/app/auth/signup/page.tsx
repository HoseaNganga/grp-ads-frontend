"use client";

import SignupForm from "@/components/auth/Signup/SignupForm";
import SignupSocialMedia from "@/components/auth/Signup/SignupSocialMedia";
import AuthBody from "@/layouts/AuthCandidates/AuthBody";
import { JSX, useState } from "react";

const SignUp = (): JSX.Element => {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <AuthBody
      title="Sign Up Now"
      description="Start your journey today."
      onBack={step === 2 ? () => setStep(1) : undefined}
    >
      <SignupForm step={step} setStep={setStep} />
      <SignupSocialMedia />
    </AuthBody>
  );
};

export default SignUp;
