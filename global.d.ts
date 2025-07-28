declare global {
    interface Window {
        onTelegramAuth?: (userData: TelegramUser) => void;
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name?: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                        is_premium?: boolean;
                    };
                };
                expand: () => void;
                requestContact: (callback: (contact: { phone_number: string }) => void) => void;
            }
        };
    }
    type TelegramAuthData = {
        id: string;
        first_name: string;
        last_name?: string;
        username?: string;
        photo_url?: string;
        auth_date: number;
        hash: string;
    };

    type AuthResponse = {
        access_token: string;
        user: {
            id: string;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
        };
    };
}

export type User = {
    id: string | number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    authDate?: number;
    token?: string;
} | null

export type LoginUserData = {
    id: string | number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date?: number;
    hash?: string;
}