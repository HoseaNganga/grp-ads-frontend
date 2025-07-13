import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { loginSchema } from "@/lib/validations/authValidation";
import { useAuthStore } from "@/store/authStore";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInForm = () => {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: withZodSchema(loginSchema as z.ZodType<any, any>),
    onSubmit: async (values) => {
      try {
        await login(values);
        toast.success("Login successful!");
        router.push("/home");
      } catch (err: any) {
        toast.error(err.message || "Login failed");
      }
    },
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = formik;

  return (
    <form className="flex justify-center w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col min-w-full items-center justify-center gap-1">
        <Input
          error={errors.email}
          touched={touched.email}
          size="md"
          placeholder="Email"
          name="email"
          className="min-w-full"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          error={errors.password}
          touched={touched.password}
          size="xl"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Link href={""} className="self-start">
          <span className="text-blue-500 text-sm mx-2 no-underline">
            Forgot Password?
          </span>
        </Link>

        <div className="flex gap-4 mt-12">
          <Button
            variant="primary"
            type="submit"
            size="xl2"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading || !isValid || !dirty}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
