import { fetchWithAuth } from "../utils/api";

export async function login(email, password) {
  try {
    const data = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("jwt", data.jwt);
  } catch (error) {
    console.error("Login error", error);
    alert("Login failed. Please try again.");
  }
}
