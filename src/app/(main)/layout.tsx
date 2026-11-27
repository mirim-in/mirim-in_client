import { Header } from "@/components/layout/Header";
import { Profile } from "@/components/layout/Profile";
import { Footer } from "@/components/layout/Footer";
import { api, getAccessToken } from "@/api/axios";

export interface Me {
  id: number;
  email: string;
  name: string;
  role: string;
  memberTypeLabel: string;
  verified: boolean;
  profileImageUrl: string | null;
  point: number;
}

const getMe = async ():Promise<Me | null> => {
  const token = await getAccessToken();
  if(!token) return null;

  try{
    const { data } = await api.get<Me>("/api/users/me")
    return data;
  } catch {
    return null;
  }
}

export default  async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();
  return (
    <div className="page">
      <Header user={me} />
      <div className="scroll">
        <div className="pageBody">
          <div className="content">{children}</div>
          <Profile user={me} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
