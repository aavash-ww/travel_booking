'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validateAdmin, generateToken } from "@/utils/auth";
import { setAuthToken } from "@/utils/cookie";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const isValid = validateAdmin(email, password);
            if (!isValid) {
                toast.error("Invalid email or password");
                return;
            }

            const token = generateToken();
            setAuthToken(token);
            toast.success("Login successful!");
            router.push("/admin/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-xl font-semibold text-center">Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
