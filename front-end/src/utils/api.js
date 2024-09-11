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

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};
