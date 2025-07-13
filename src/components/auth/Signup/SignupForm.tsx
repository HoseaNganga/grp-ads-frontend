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

const SignupForm = () => {
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
      } catch (err: any) {
        toast.error(err.message || "Signup failed.");
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
  } = formik;

  return (
    <form
      className="flex justify-center min-w-full h-auto "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full items-center justify-center gap-y-3 min-w-full  ">
        <Input
          name="first_name"
          error={errors.first_name}
          touched={touched.first_name}
          size="xl"
          placeholder="First Name"
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          name="last_name"
          error={errors.last_name}
          touched={touched.last_name}
          size="xl"
          placeholder="Last Name"
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          name="email"
          error={errors.email}
          touched={touched.email}
          size="xl"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />

        <div className="w-full">
          <div
            className={`flex gap-[16px] w-full h-[50px] rounded-[800px] border py-[12px] items-center pl-[12px] pr-[16px] ${
              errors.phoneNumber && touchedPhone && "border-red-500"
            }`}
          >
            <PhoneInput
              defaultCountry="us"
              name="phoneNumber"
              value={values.phoneNumber}
              placeholder="Phone Number"
              onBlur={() => setTouchedPhone(true)}
              onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
              inputStyle={{
                fontSize: "18px",
                padding: "0 16px",
                border: "none",
                outline: "none",
                width: "100%",
              }}
              style={{ width: "100%" }}
            />
          </div>
          {errors.phoneNumber && touchedPhone && (
            <div className="text-red-500 text-sm px-2 mt-2 text-center">
              {errors.phoneNumber}
            </div>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Interest</label>
          <select
            name="interest"
            value={values.interest}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border py-[12px] px-[16px] rounded-[800px] text-base outline-none ${
              errors.interest && touched.interest
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Interest</option>
            {Object.keys(interestOptions).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          {errors.interest && touched.interest && (
            <p className="text-red-500 text-sm mt-1">{errors.interest}</p>
          )}
        </div>
        {values.interest && (
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              {values.interest === "Cars"
                ? "Favorite Car Type"
                : values.interest === "Music"
                ? "Favorite Music Genre"
                : "Favorite Sport"}
            </label>
            <select
              name="selection"
              value={values.selection}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border py-[12px] px-[16px] rounded-[800px] text-base outline-none ${
                errors.interest && touched.interest
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
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
        )}

        <Input
          name="password"
          error={errors.password}
          touched={touched.password}
          size="xl"
          placeholder="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="on"
        />
        <div className="flex items-center gap-2 w-full mt-2">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-5 h-5 rounded border border-gray-300"
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
          className="text-sm cursor-pointer  sm:text-sm md:text-md font-semibold w-full p-[16px] hover:bg-blue-600 hover:text-slate-100"
          aria-label="Sign Up"
          disabled={isLoading || !formik.isValid || !formik.dirty}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
