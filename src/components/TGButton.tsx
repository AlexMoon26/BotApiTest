"use client";

import { useAuth } from "@/app/auth-provider";
import { useRouter } from "next/navigation";

export default function TelegramAuthButton() {
  const { login } = useAuth();
  const router = useRouter();
  const handleAuth = () => {
    const botId = "8449799485";
    const origin = encodeURIComponent(window.location.origin);
    const windowFeatures = "width=500,height=500,left=100,top=100";

    const authWindow = window.open(
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&embed=0&request_access=write`,
      "tgAuth",
      windowFeatures
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://oauth.telegram.org") return;

      const userData = JSON.parse(event.data);

      authWindow?.close();

      fetch("/auth/telegram-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData.result),
      })
        .then((response) => response.json())
        .then((data) => {
          const { user, access_token } = data;
          const userData = { ...user, access_token };
          login(userData);
          router.push("/profile");
        })
        .catch((error) => {
          console.error("Auth error:", error);
        });

      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <button className="bg-blue-600 p-6 rounded-xl" onClick={handleAuth}>
      Войти через Telegram
    </button>
  );
}
