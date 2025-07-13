"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PhoneInput } from "react-international-phone";
import toast from "react-hot-toast";
import "react-international-phone/style.css";
import "./SignupForm.css";
import {
  interestOptions,
  registerUserSchema,
} from "@/lib/validations/authValidation";
import { withZodSchema } from "formik-validator-zod";
import z from "zod";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

type SignupFormProps = {
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
};

const SignupForm = ({ step, setStep }: SignupFormProps) => {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const [touchedPhone, setTouchedPhone] = useState<null | boolean>(null);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phoneNumber: "",
      interest: "",
      selection: "",
      acceptTerms: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate: withZodSchema(registerUserSchema as z.ZodType<any, any>),
    validateOnMount: true,
    onSubmit: async (values) => {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        interest: values.interest,
        selection: values.selection,
        acceptTerms: values.acceptTerms,
      };

      try {
        await signup(payload);
        toast.success("Signup successful! Please verify your email.");
        router.push("/auth/verification");
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Signup failed.");
        }
      }
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-lg mx-auto  min-w-full min-h-screen px-4 py-10 sm:px-6 lg:px-8 bg-white overflow-y-auto "
    >
      {step === 1 && (
        <>
          <Input
            name="first_name"
            placeholder="First Name"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.first_name}
            touched={touched.first_name}
            size="xl"
          />
          <Input
            name="last_name"
            placeholder="Last Name"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.last_name}
            touched={touched.last_name}
            size="xl"
          />
          <Input
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            size="xl"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            size="xl"
          />

          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="us"
              value={values.phoneNumber}
              onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
              onBlur={() => setTouchedPhone(true)}
              inputStyle={{
                fontSize: "18px",

                border: "1px solid #ccc",
                width: "100%",
                height: "45px",
                borderRadius: "12px",
                marginTop: "-5px",
              }}
            />
            {errors.phoneNumber && touchedPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Choose an Interest
            </label>
            <div className="flex flex-col gap-2">
              {Object.keys(interestOptions).map((interest) => (
                <label key={interest} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="interest"
                    value={interest}
                    checked={values.interest === interest}
                    onChange={handleChange}
                  />
                  {interest}
                </label>
              ))}
            </div>
            {errors.interest && touched.interest && (
              <p className="text-red-500 text-sm mt-1">{errors.interest}</p>
            )}
          </div>

          <Button
            variant="primary"
            type="button"
            onClick={() => setStep(2)}
            disabled={
              !values.interest ||
              !values.first_name ||
              !values.email ||
              !values.password
            }
            className="w-full"
          >
            Next
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label className="block  text-sm font-bold ">
              {values.interest === "Cars"
                ? "Favorite Car Type"
                : values.interest === "Music"
                ? "Favorite Music Genre"
                : "Favorite Sport"}
            </label>
            <span className="text-sm mb-1 ">
              Tell us more about your interest
            </span>
            <select
              name="selection"
              value={values.selection}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select an option</option>
              {interestOptions[values.interest].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.selection && touched.selection && (
              <p className="text-red-500 text-sm mt-1">{errors.selection}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={values.acceptTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-4 h-4"
            />
            <label htmlFor="acceptTerms" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.acceptTerms && touched.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
          )}
          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            disabled={
              isLoading ||
              !values.selection ||
              !values.acceptTerms ||
              !!errors.selection ||
              !!errors.acceptTerms
            }
            className="w-full"
          >
            Sign Up
          </Button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
