"use client";

import { useAuth } from "@/app/auth-provider";
import { useRouter } from "next/navigation";

export default function TelegramAuthButton() {
  const { login } = useAuth();
  const router = useRouter();
  const handleAuth = async () => {
    const botId = "8449799485";
    const origin = encodeURIComponent(window.location.origin);

    // 1. Открываем окно авторизации
    window.open(
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&embed=0&request_access=write`,
      "tgAuth",
      "width=500,height=500,left=100,top=100"
    );

    // 2. Слушаем сообщения от окна авторизации
    window.addEventListener(
      "message",
      async (event) => {
        // Проверяем источник сообщения
        if (event.origin !== "https://oauth.telegram.org") return;

        if (event.data === "auth_cancel") {
          console.log("Авторизация отменена");
        } else if (event.data.auth_result) {
          // 3. Отправляем данные на ваш сервер
          try {
            const response = await fetch(
              "https://botapitest-server.onrender.com/auth/telegram-auth",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(event.data.auth_result),
              }
            );

            if (!response.ok) throw new Error("Ошибка авторизации");

            const { user, access_token } = await response.json();
            const data = { ...user, access_token };
            login(data);
            router.push("/profile");
          } catch (error) {
            console.error("Auth error:", error);
            // Показать пользователю сообщение об ошибке
          }
        }
      },
      false
    );
  };

  return (
    <button className="bg-blue-600 p-6 rounded-xl" onClick={handleAuth}>
      Войти через Telegram
    </button>
  );
}
