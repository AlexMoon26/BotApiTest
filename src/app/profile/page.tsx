"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-provider";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            {user.picture && (
              <Image
                width={240}
                height={240}
                src={user.picture}
                alt="Profile"
                className="rounded-full mb-4"
                priority
              />
            )}
            <h1 className="text-2xl font-bold mb-2 text-black">
              {user.firstName} {user.lastName}
            </h1>
            {user.nickName && (
              <p className="text-gray-600 mb-4">@{user.nickName}</p>
            )}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
