import Link from "next/link";

const SigninSocialMedia = () => {
  return (
    <div className="w-full items-center flex flex-col gap-4 ">
      <p className="flex justify-center gap-1 mt-8">
        <span className="text-stone-500">Don&apos;t have an account yet?</span>
        <Link
          href="/auth/signup"
          className="text-blue-500 hover:text-blue-600 text-lg font-semibold underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SigninSocialMedia;
