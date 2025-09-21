import { Metadata } from "next";
import LoginForm from "../components/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
}
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFDF6] p-4">
      <LoginForm />
    </div>
  );
}
