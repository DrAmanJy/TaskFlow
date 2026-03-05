import { Outlet } from "react-router-dom";
import ActiveNav from "./ActiveNav";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
