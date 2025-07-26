export const ADMIN_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "",
};

export function validateAdmin(email: string, password: string): boolean {
  return (
    email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
  );
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
