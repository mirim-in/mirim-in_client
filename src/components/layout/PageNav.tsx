"use client";

import styles from "@/styles/components/layout/PageNav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isAdmin: boolean;
}
interface NavPage {
  label: string;
  href: string;
  isAdmin?: boolean;
}

const NAV_PAGES: NavPage[] = [
  { label: "홈", href: "/" },
  { label: "질문", href: "/question" },
  { label: "멘토", href: "/mento" },
  { label: "FAQ", href: "/faq" },
  { label: "관리자", href: "/admin", isAdmin: true },
];

interface NavItemProps {
  label: string;
  href: string;
  active: boolean;
}
const NavItem = ({ label, href, active }: NavItemProps) => (
  <Link
    href={href}
    className={`${styles.navItem} ${active ? styles.active : ""}`}
  >
    {label}
  </Link>
);

export const PageNav = ({ isAdmin }: Props) => {
  const pathname = usePathname();
  return (
    <div className={styles.pageNav}>
      <div className={styles.navWrap}>
        {NAV_PAGES.filter((page) => !page.isAdmin || isAdmin).map((page) => (
          <NavItem
            key={page.href}
            label={page.label}
            href={page.href}
            active={
              page.href === "/"
                ? pathname === "/"
                : pathname.startsWith(page.href)
            }
          />
        ))}
      </div>
    </div>
  );
};
