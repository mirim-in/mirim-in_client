import "server-only";

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

/**
 * 서버 전용 axios 인스턴스
 *
 * 토큰은 httpOnly 쿠키에 저장되어 브라우저 JS에서 읽을 수 없으므로,
 * 이 인스턴스는 서버(Server Component, Server Action, Route Handler)에서만 사용한다.
 * 클라이언트 컴포넌트에서 로그인이 필요한 요청을 보내려면 Server Action을 거친다.
 *
 * - 요청: 쿠키의 accessToken을 Authorization 헤더에 자동으로 붙인다.
 * - 응답: 401이면 refreshToken으로 토큰을 재발급받고, 원래 요청을 한 번 다시 보낸다.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

// 백엔드 TokenResponse
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  // accessToken이 먼저 만료돼도 401 → 재발급으로 처리되므로 두 쿠키 모두 refresh 기준으로 유지
  maxAge: 60 * 60 * 24 * 14, // 14일
};

/** 로그인/재발급 후 토큰을 쿠키에 저장 (Server Action, Route Handler에서만 호출 가능) */
export const setAuthCookies = async (tokens: TokenResponse) => {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, COOKIE_OPTIONS);
  cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, COOKIE_OPTIONS);
};

/** 로그아웃 시 토큰 쿠키 삭제 (Server Action, Route Handler에서만 호출 가능) */
export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
};

/** 현재 요청의 토큰 읽기 (Server Component에서도 가능) */
export const getAccessToken = async () =>
  (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;

export const getRefreshToken = async () =>
  (await cookies()).get(REFRESH_TOKEN_COOKIE)?.value;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: accessToken 자동 첨부
api.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 응답 인터셉터: 401이면 토큰 재발급 후 1회 재시도
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;

    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      // 인터셉터가 다시 타지 않도록 기본 axios로 호출
      const { data } = await axios.post<TokenResponse>(
        `${API_URL}/api/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      // 쿠키 저장은 Server Action / Route Handler에서만 가능.
      // Server Component 렌더링 중에는 저장에 실패하지만, 이번 요청은 새 토큰으로 계속 진행한다.
      try {
        await setAuthCookies(data);
      } catch {
        // Server Component에서 호출된 경우 — 무시
      }

      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch (refreshError) {
      // refreshToken도 만료/무효 → 로그아웃 상태로 처리
      try {
        await clearAuthCookies();
      } catch {
        // Server Component에서 호출된 경우 — 무시
      }
      return Promise.reject(refreshError);
    }
  },
);
