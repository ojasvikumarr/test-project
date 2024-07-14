import "@/styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return <>
    <UserProvider>
      <Component {...pageProps} />;
    </UserProvider>
  </>
}
