"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Image from 'next/image'


export default function LoginForm() {
  const route = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`${apiBaseUrl}/api/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle successful login and store tokens
      console.log('Login successful:', data);
      localStorage.setItem('loggedin', 'true')
      const decoded = jwtDecode(data.token)
      console.log(JSON.stringify(decoded))
      localStorage.setItem('loggedinfo', decoded.sub || '')
      route.push('/dashboard')
    } else {
      // Handle login errors
      const errorData = await response.json();
      console.error('Login failed:', errorData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 lg:px-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <Image
            src="/assets/researcher.jpg"
            alt="employees"
            width={300}
            height={300}
            className="mx-auto"
          />
          <div>
            <Image
              src="/assets/logo1.png"
              alt="logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <h1 className="mt-0 text-4xl font-light tracking-widest text-gray-900">CRPMP</h1>
          <p className="mt-2 text-sm tracking-wide text-gray-600">Thank you for choosing us !</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Log in
          </h2>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
        Do not have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
    </div>
  </div>
);
}