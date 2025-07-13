import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  UserLoginResponse,
  UserSignUpResponse,
  UserVerifyEmailResponse,
} from "@/lib/models/authResponseModel";
import {
  UserRequestPayloadType,
  loginRequestPayloadType,
  VerifyEmailRequestPayloadType,
} from "@/services/auth/useSignUpMutation";
import { noAuthInstance } from "@/services/noAuthInstance";
import { extractAxiosErrorMessage } from "@/services/error";

type AuthState = {
  userEmail: string | null;
  token: string | null;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  isLoading: boolean;
  error: string | null;

  signupResponse: UserSignUpResponse | null;
  verifyEmailResponse: UserVerifyEmailResponse | null;

  signup: (payload: UserRequestPayloadType) => Promise<void>;
  login: (payload: loginRequestPayloadType) => Promise<void>;
  verifyEmail: (payload: VerifyEmailRequestPayloadType) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userEmail: null,
      token: null,
      user: null,
      isLoading: false,
      error: null,

      signupResponse: null,
      verifyEmailResponse: null,

      signup: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await noAuthInstance.post<UserSignUpResponse>(
            "/auth/register/",
            payload
          );
          set({
            userEmail: payload.email,
            signupResponse: res.data,
          });
        } catch (err) {
          const message = extractAxiosErrorMessage(err, "Signup failed");
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      verifyEmail: async (payload) => {
        set({ isLoading: true, error: null });

        try {
          const res = await noAuthInstance.post<UserVerifyEmailResponse>(
            "/auth/verify-code",
            payload
          );
          set({ verifyEmailResponse: res.data });
        } catch (err) {
          const message = extractAxiosErrorMessage(
            err,
            "Email Verification Failed!"
          );
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await noAuthInstance.post<UserLoginResponse>(
            "/auth/login",
            payload
          );

          set({
            token: res.data.token,
            user: res.data.user,
            userEmail: res.data.user.email,
          });
        } catch (err) {
          const message = extractAxiosErrorMessage(err, "Login failed");
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          userEmail: null,
          error: null,
          signupResponse: null,
          verifyEmailResponse: null,
        });
      },
    }),
    {
      name: "auth-store",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
