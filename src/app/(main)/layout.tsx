import { Header } from "@/components/layout/Header";
import { Profile } from "@/components/layout/Profile";

const user = {
  name: "윤기진",
  stuId: "2106",
  email: "s2546@e-mirim.hs.kr",
  isAdmin: true,
};
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header user={user} isLogin={true} />
      <div className="pageBody">
        <div className="scroll">{children}</div>
        <Profile user={user} isLogin={true} />
      </div>
    </>
  );
}
