import { fetchWithAuth } from "../utils/api";

export async function login(email, password) {
  try {
    const res = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.success) {
      localStorage.setItem("jwt", res.data.jwt);
      return;
    }
    return res.errorMessage;
  } catch (error) {
    console.error("Login error", error);
    return "Login failed. Please try again.";
  }
}

export async function signup(name, email, password) {
  try {
    const res = await fetchWithAuth("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.success) {
      return res.errorMessage;
    }
  } catch (error) {
    console.error("Signup error", error);
    return "Signup failed. Please try again.";
  }
}
