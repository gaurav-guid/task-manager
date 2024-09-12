export const fetchWithAuth = async (url, options = {}) => {
  const jwt = localStorage.getItem("jwt");
  const apiBaseUrl = "http://localhost:3001"; //DEBT: Pick from env var
  const fullUrl = apiBaseUrl + url;
  // Add Authorization header if jwt exists
  const authHeaders = jwt
    ? {
        ...options.headers,
        Authorization: `Bearer ${jwt}`,
      }
    : options.headers;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(22, data);
  if (!response.ok) {
    console.log(
      `Request failed with status: ${response.status} and message: ${data.error}`
    );
    return {
      success: false,
      status: response.status,
      errorMessage: data.error,
    };
  }

  return {
    success: true,
    status: response.status,
    errorMessage: null,
    data: data,
  };
};
