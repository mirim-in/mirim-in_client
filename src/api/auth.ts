"use server";

import { redirect } from "next/navigation";
import { setAuthCookies } from "./axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const signup = async (
  prevState: { error?: string },
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return { error: body?.message ?? "회원가입에 실패했습니다." };
    }
    const data = await res.json();
    await setAuthCookies(data);
  } catch (err) {
    console.error("회원가입 에러:", err);
    return { error: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." };
  }
  redirect("/");
};
