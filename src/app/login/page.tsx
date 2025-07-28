"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth-provider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== "https://oauth.telegram.org") return;

      const data = JSON.parse(event.data);
      const telegramData = data.result;

      try {
        const authResponse = await fetch(
          "https://botapitest-server.onrender.com/auth/telegram-auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(telegramData),
          }
        );
        const { access_token, user } = await authResponse.json();

        if (access_token) {
          login({ ...user, access_token });
          router.push("/profile");
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [login, router]);

  const handleTelegramAuth = () => {
    const width = 550;
    const height = 500;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      `https://oauth.telegram.org/auth?bot_id=8449799485:AAFEmWpFtA_G6WiyY42h-A6zPSwQdqTjnPU&origin=${encodeURIComponent(
        window.location.origin
      )}&embed=0&request_access=write`,
      "telegram_auth",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-500">
          Авторизация через Telegram
        </h1>
        <button
          onClick={handleTelegramAuth}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Войти с Telegram
        </button>
      </div>
    </div>
  );
}
