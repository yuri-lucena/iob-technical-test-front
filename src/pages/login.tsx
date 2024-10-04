import React, { useState } from "react";
import router from "next/router";
import { authService } from "@/services";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Input } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const auth = { email, pass };
      const response = await authService.login(auth);
      const token = response.token;

      if (!token) {
        toast.error("Token not found");
        return;
      }

      Cookies.set("token", token);
      Cookies.set("name", response.name);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.error_message);
    }
  };

  const handleForgotPassword = () => {
    console.log("Esqueceu a senha?");
  };

  return (
    <>
      <title>Iob Bank - Login</title>
      <div className="fixed inset-0 flex justify-center items-center h-screen  min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Iob Bank"
            src="https://iob.com.br/favicon-iob.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faça o login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                type="email"
                id="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-pink-700 hover:text-pink-800"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não tem conta?{" "}
            <Link
              key={"sign-up"}
              href="/sign-up"
              className="font-semibold leading-6 text-pink-700 hover:text-pink-800"
            >
              Crie uma agora mesmo!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
