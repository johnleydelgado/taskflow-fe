/* eslint-disable no-undef */
/* A throw‑away “session store” using plain cookies */
export function getUser() {
  const name = document.cookie
    .split("; ")
    .find((c) => c.startsWith("user="))
    ?.slice(5);
  return name ? { name: decodeURIComponent(name) } : undefined;
}
  
export function makeUserCookie(email: string) {
  return `user=${encodeURIComponent(email)}; Path=/; Max-Age=86400`;
}