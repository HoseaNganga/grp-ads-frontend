import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  UserLoginResponse,
  UserSignUpResponse,
} from "@/lib/models/authResponseModel";
import {
  UserRequestPayloadType,
  loginRequestPayloadType,
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
  response: UserSignUpResponse | null;
  signup: (payload: UserRequestPayloadType) => Promise<void>;
  login: (payload: loginRequestPayloadType) => Promise<void>;
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
      response: null,

      signup: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await noAuthInstance.post<UserSignUpResponse>(
            "/auth/register/",
            payload
          );
          set({
            userEmail: payload.email,
            response: res.data,
          });
        } catch (err) {
          const message = extractAxiosErrorMessage(err, "Signup failed");
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
          response: null,
        });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
