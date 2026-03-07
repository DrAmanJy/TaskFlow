import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const apiClient = async (endpoint, options = {}, isRetry = false) => {
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

  if (response.status === 401 && !isRetry) {
    try {
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          return apiClient(endpoint, options, true);
        }
      }
    } catch (err) {
      toast.error("Refresh token failed:", err);
    }
    // localStorage.removeItem("accessToken");
    if (!endpoint.includes("/user/me")) {
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
