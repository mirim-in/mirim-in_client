import { Header } from "@/components/layout/Header";
import { Profile } from "@/components/layout/Profile";
import { Footer } from "@/components/layout/Footer";

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
    <div className="page">
      <Header user={user} isLogin={true} />
      <div className="scroll">
        <div className="pageBody">
          <div className="content">{children}</div>
          <Profile user={user} isLogin={true} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
