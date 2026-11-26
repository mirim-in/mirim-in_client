"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { redirect } from "next/navigation";
import { setAuthCookies } from "./axios";

export const login = async (
  prevState: { error?: string },
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    const data = await res.json();
    await setAuthCookies(data);
  } catch (err) {
    console.error("로그인 에러:", err);
    return { error: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." };
  }

  redirect("/");
};
