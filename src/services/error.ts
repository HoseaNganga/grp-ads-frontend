import { AxiosError } from "axios";
export interface APIErrorResponse {
  detail?: string;
  message?: string;
  success?: boolean;
  error?: string | { message?: string };
}

export const extractAxiosErrorMessage = (
  err: unknown,
  fallbackMessage: string
): string => {
  const error = err as AxiosError<APIErrorResponse>;
  const responseData = error?.response?.data;

  return (
    responseData?.message ||
    responseData?.detail ||
    (typeof responseData?.error === "string"
      ? responseData.error
      : responseData?.error?.message) ||
    fallbackMessage
  );
};
