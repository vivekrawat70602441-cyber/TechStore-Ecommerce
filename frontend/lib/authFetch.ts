export async function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const response = await fetch(url, {
        ...options,
        credentials: "include",

        headers: {
            ...(options.headers || {}),
        },
    });

    if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("Authentication required");
    }
    return response;
}