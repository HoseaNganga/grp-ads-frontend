import { useCallback } from "react";
import { noAuthInstance } from "../noAuthInstance";
import {
  UserVerifyEmailResponse,
  UserSignUpResponse,
  UserLoginResponse,
} from "@/lib/models/authResponseModel";
import { extractAxiosErrorMessage } from "../error";
import { useMutation } from "@tanstack/react-query";

export const SIGNUP_MUTATION_KEY = ["signup"];
export const VERIFY_EMAIL_MUTATION_KEY = ["verifyemail"];

export interface UserRequestPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phoneNumber: string;
  interest: string;
  selection: string;
  acceptTerms: boolean;
}

export interface VerifyEmailRequestPayloadType {
  code: string;
  email: string;
}

export interface loginRequestPayloadType {
  email: string;
  password: string;
}

export const UserSignUpMutation = () => {
  const request = useCallback(async (data: UserRequestPayloadType) => {
    try {
      const response = await noAuthInstance.post<UserSignUpResponse>(
        "/auth/register/",
        data
      );
      return response.data;
    } catch (err) {
      throw new Error(extractAxiosErrorMessage(err, "Failed To SignUp!"));
    }
  }, []);

  return useMutation<UserSignUpResponse, Error, UserRequestPayloadType>({
    mutationFn: request,
    mutationKey: SIGNUP_MUTATION_KEY,
    retry: false,
  });
};

export const useVerifyEmail = () => {
  const request = useCallback(async (data: VerifyEmailRequestPayloadType) => {
    try {
      const response = await noAuthInstance.post<UserVerifyEmailResponse>(
        `/auth/verify-code`,
        data
      );
      return response.data;
    } catch (err) {
      throw new Error(
        extractAxiosErrorMessage(err, "Email Verification Failed!")
      );
    }
  }, []);

  return useMutation<
    UserVerifyEmailResponse,
    Error,
    VerifyEmailRequestPayloadType
  >({
    mutationFn: request,
    mutationKey: VERIFY_EMAIL_MUTATION_KEY,
    retry: false,
  });
};

export const useLoginMutation = () => {
  const request = useCallback(async (data: loginRequestPayloadType) => {
    try {
      const response = await noAuthInstance.post<UserLoginResponse>(
        `/auth/login`,
        data
      );
      return response.data;
    } catch (err) {
      throw new Error(extractAxiosErrorMessage(err, "Login Failed!"));
    }
  }, []);

  return useMutation<UserLoginResponse, Error, loginRequestPayloadType>({
    mutationFn: request,
    mutationKey: VERIFY_EMAIL_MUTATION_KEY,
    retry: false,
  });
};
