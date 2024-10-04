import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { authService } from "@/services";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (
      !token &&
      router.pathname !== "/sign-up" &&
      router.pathname !== "/login"
    ) {
      router.push("/login");
    }

    if (
      token &&
      (router.pathname === "/login" || router.pathname === "/sign-up")
    ) {
      router.push("/");
    }
  }, [router, token]);

  if (token) {
    authService.verifyToken();
  }

  return children;
};

export default AuthLayout;
