import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";
let refreshPromise = null;

const refreshAccessTokenOnce = () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken } = await res.json();
        // Set the token here so it only happens exactly once per refresh cycle
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        return accessToken;
      })
      .catch(() => {
        // If refresh fails, clear the invalid token immediately
        localStorage.removeItem("accessToken");
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

export const apiClient = async (endpoint, options = {}, isRetry = false) => {
  console.log("making request at", endpoint);
  const token = localStorage.getItem("accessToken");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (response.status === 401 && !isRetry && !endpoint.startsWith("/auth")) {
    const newAccessToken = await refreshAccessTokenOnce();
    console.log(newAccessToken);
    if (newAccessToken) {
      return apiClient(endpoint, options, true);
    }

    if (!endpoint.includes("/user/me")) {
      toast.error("window.location.href.");
      // window.location.href = "/auth?mode=login";
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log(errorData);
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
