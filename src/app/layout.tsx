import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeRegistry from "@/src/comonents/ThemeRegistry";   // ← add this

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}