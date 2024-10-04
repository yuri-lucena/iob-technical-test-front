import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthLayout from "./auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <ToastContainer
        className="toast-container"
        toastClassName="toast"
        bodyClassName="toast-body"
      />
      <Component {...pageProps} />;
    </AuthLayout>
  );
}
