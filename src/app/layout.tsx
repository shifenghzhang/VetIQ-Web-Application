import "~/styles/globals.css";

import { Karla } from "next/font/google";

import Appbar from "./_components/appbar";
import Header from "./_components/header";
import PageWrapper from "./_components/pagewrapper";

import { SidebarProvider } from "./_contexts/sidebarContext";
import { LoginCardProvider } from "./_contexts/logincardContext";
import { AuthProvider } from "./_contexts/authProvider";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <SidebarProvider>
      <LoginCardProvider>
        <AuthProvider>     

          <html lang="en">

            <body className={`font-sans ${karla.variable}`}>
              <div className="flex min-h-screen">
                <div>
                  <Appbar></Appbar>
                </div>

                <div className="flex h-full w-full flex-col">
                  <Header />
                  <PageWrapper>{children}</PageWrapper>

                </div>
              </div>

              </body>
          </html>
        </AuthProvider>
      </LoginCardProvider>
    </SidebarProvider>


  );
}