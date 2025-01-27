import axios, { AxiosError } from 'axios';

export const handleAPIError = (error: unknown, source: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error(
        `${source} error: ${axiosError.response.status} - ${axiosError.response.statusText}`
      );
    }
    if (axiosError.request) {
      throw new Error(`${source} request failed: No response received`);
    }
  }
  throw new Error(
    `${source} error: ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
  );
};
