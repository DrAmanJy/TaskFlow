import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;
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
  const token = localStorage.getItem("accessToken");

  const config = {
    credentials: "include",
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
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
