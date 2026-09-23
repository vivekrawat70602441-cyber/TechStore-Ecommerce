import { parseCookie, stringifySetCookie } from "cookie";

export const AUTH_COOKIE_NAME = "secret_cookie";

const maxAge = 7 * 24 * 60 * 60;

export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge,
    path: "/",
};

export const setAuthCookie = (res, token) => {
    res.setHeader(
        "Set-Cookie",
        stringifySetCookie({
            name: AUTH_COOKIE_NAME,
            value: token,
            ...authCookieOptions,
        })
    );
};

export const clearAuthCookie = (res) => {
    res.setHeader(
        "Set-Cookie",
        stringifySetCookie({
            name: AUTH_COOKIE_NAME,
            value: "",
            ...authCookieOptions,
            maxAge: 0,
        })
    );
};

export const getAuthTokenFromCookie = (req) => {
    const cookies = parseCookie(req.headers.cookie || "");
    return cookies[AUTH_COOKIE_NAME];
};
