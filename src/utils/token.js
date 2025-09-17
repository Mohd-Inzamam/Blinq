export const TOKEN_KEY = 'blinq_token';
export const USER_KEY = 'blinq_user';


export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}


export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}


export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}


export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}


export function getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
}


export function removeUser() {
    localStorage.removeItem(USER_KEY);
}


export function parseJwt(token) {
    try {
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch (e) {
        return null;
    }
}


export function isTokenExpired(token) {
    if (!token) return true;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    return Date.now() > payload.exp * 1000;
}