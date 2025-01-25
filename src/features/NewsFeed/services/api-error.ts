export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public source?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: any, source: string): never => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new APIError(
      error.response.data?.message || 'Server error',
      error.response.status,
      source
    );
  } else if (error.request) {
    // The request was made but no response was received
    throw new APIError('No response from server', undefined, source);
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new APIError(error.message || 'Request failed', undefined, source);
  }
};
