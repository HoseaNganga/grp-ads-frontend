import Link from "next/link";

const SignupSocialMedia = () => {
  return (
    <div className="w-full   items-center flex flex-col gap-4 ">
      <p className="flex justify-center items-center gap-1 mt-8">
        <span className="text-stone-500">Already have an account?</span>
        <Link
          href="/auth/login"
          className="text-blue-500 hover:text-blue-600 text-lg font-semibold underline underline-offset-4"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupSocialMedia;
