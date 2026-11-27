"use client";

import styles from "@/styles/components/layout/Profile.module.css";
import Link from "next/link";
import { useState } from "react";
import type { Me } from "@/app/(main)/layout";

interface Props {
  user: Me | null;
}

type Tab = "alarm" | "notice";

interface LogoutBtnProps {
  onClick?: () => void;
}
const LogoutBtn = ({ onClick }: LogoutBtnProps) => (
  <div className={styles.btn} onClick={onClick}>
    <p className={styles.btnTitle}>로그아웃</p>
  </div>
);

interface MenuBtnProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}
const MenuBtn = ({ title, isActive, onClick }: MenuBtnProps) => (
  <div
    className={`${styles.menuBtn} ${isActive ? styles.menuBtnActive : styles.menuBtnInActive}`}
    onClick={onClick}
  >
    {title === "알람" ? (
      <div
        className={`${isActive ? styles.alarmIcon : styles.alarmIconInActive}`}
      ></div>
    ) : null}
    <div className={styles.menuBtnTextWrap}>
      <p className={styles.menuBtnTitle}>{title}</p>
      {title === "알람" ? (
        <p
          className={`${styles.menuBtnTitle} ${!isActive ? styles.menuBtnTitleInActive : ""}`}
        >
          {ALARMS.length}
        </p>
      ) : null}
    </div>
  </div>
);

const ALARMS: unknown[] = [];

export const Profile = ({ user }: Props) => {
  const [tab, setTab] = useState<Tab>("alarm");

  return (
    <div className={styles.body}>
      <div className={styles.wrap}>
        <div className={styles.aboutWrap}>
          <div className={styles.aboutTextWrap}>
            <p className={styles.aboutTitle}>미림iN 이란?</p>
            <p className={styles.aboutSub}>
              미림을 가장 잘 아는 인증된 학교 구성원이 직접 답하는 학교 전용
              지식 플랫폼이에요.
            </p>
          </div>
        </div>

        <Link href="/question" className={styles.questionWrap}>
          <div className={styles.questionTextWrap}>
            <div className={styles.questionIcon}></div>
            <p className={styles.questionText}>질문하기</p>
          </div>
        </Link>

        <div className={styles.profileWrap}>
          {user ? (
            <div className={styles.userWrap}>
              <div className={styles.userProfile}></div>
              <div className={styles.userInfoWrap}>
                <div className={styles.userProfileWrap}>
                  <div className={styles.userNameWrap}>
                    <p>{user.name}</p>
                    {user.verified && (
                      <div className={styles.checkWrap}>
                        <div className={styles.check}></div>
                      </div>
                    )}
                  </div>
                  <LogoutBtn />
                </div>
                <Link href="/profile" className={styles.profileLink}>
                  <p className={styles.profileLinkText}>프로필 바로가기</p>
                  <div className={styles.arrowRight}></div>
                </Link>
              </div>
            </div>
          ) : (
            // 비로그인 상태 (피그마 UI/UX > Frame 34 > 베리언트2)
            <div className={styles.userWrap}>
              <div className={styles.userProfile}></div>
              <div className={styles.userInfoWrap}>
                <div className={styles.userNameWrap}>
                  <p>로그인이 필요해요</p>
                </div>
                <Link href="/login" className={styles.profileLink}>
                  <p className={styles.loginLinkText}>로그인 / 회원가입</p>
                  <div className={styles.arrowRightGreen}></div>
                </Link>
              </div>
            </div>
          )}

          {/* 알람·공지사항 탭은 로그인했을 때만 표시 */}
          {user && (
            <>
              <div className={styles.buttonWrap}>
                <MenuBtn
                  title={`알람`}
                  isActive={tab === "alarm"}
                  onClick={() => setTab("alarm")}
                >
                  <div className={styles.alarmIcon}></div>
                </MenuBtn>
                <MenuBtn
                  title="공지사항"
                  isActive={tab === "notice"}
                  onClick={() => setTab("notice")}
                />
              </div>
              <div className={styles.tabWrap}>
                <div className={styles.tabTextWrap}>
                  {tab === "alarm" ? (
                    <p className={styles.tabText}>알람이 없습니다.</p>
                  ) : (
                    <p className={styles.tabText}>공지사항이 없습니다.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
