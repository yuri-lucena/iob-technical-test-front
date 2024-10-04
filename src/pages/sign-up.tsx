import React, { useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/interfaces";
import { userService } from "@/services";
import InputMask from "react-input-mask";
import { Input } from "@/components";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user: User = {
      name: name,
      identifier: identifier,
      birthday: new Date(birthday),
      email: email,
      password: password,
      phone_number: phoneNumber,
      address: address,
      user_type_id: 2,
    };

    try {
      var response = await userService.createUserWithBankAccount(user);

      if (!response.success) {
        alert(response.error_message);
        return;
      }

      alert("Usuário criado com sucesso! Agora é só fazer o login!");

      console.log("tudo funcionou perfeito! Redirecionando para o login...");

      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <>
      <title>Iob Bank - Cadastre-se</title>
      <div className="flex justify-center items-center h-screen  min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Iob Bank"
            src="https://iob.com.br/favicon-iob.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cadastre-se agora!
          </h2>

          <p className="mt-5 text-center text-sm text-gray-500">
            Já tem conta?{" "}
            <Link
              key={"login"}
              href="/login"
              className="font-semibold leading-6 text-pink-700 hover:text-pink-800"
            >
              Entre agora mesmo
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                id="name"
                label="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="identifier"
              >
                CPF
              </label>
              <InputMask
                mask={"999.999.999-99"}
                maskChar={null}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
                id="identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthday"
              >
                Data de nascimento
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
                id="birthday"
                type="date"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                id="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Número de telefone
              </label>

              <InputMask
                mask={"(99) 99999-9999"}
                maskChar={null}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                id="address"
                label="Endereço"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 justify-end mt-10">
              <button
                className="w-full flex  justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                type="submit"
              >
                Cadastrar-se
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
