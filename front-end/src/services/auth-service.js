import { fetchWithAuth } from "../utils/api";
import { navigateTo } from "./navigation-service";

async function login(email, password) {
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

async function signup(name, email, password) {
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

function isLoggedIn() {
  return !!localStorage.getItem("jwt");
}

function logOut() {
  localStorage.removeItem("jwt");
  navigateTo("login");
}

const loginService = {
  login,
  signup,
  isLoggedIn,
  logOut,
};

export default loginService;
