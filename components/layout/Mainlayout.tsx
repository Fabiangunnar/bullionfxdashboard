"use client";
import { Providers } from "@/redux/provider";
import styles from "@/app/styles/Home.module.scss";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { getAllUsers } from "@/redux/features/AppSlice";
import { closeNav } from "@/redux/features/NavSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
// const { ToastContainer } = createStandaloneToast();

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { openNav } = useAppSelector((state) => state.nav);

  const sideNavRef: any = useRef();
  const topNavRef: any = useRef();

  const handleClickOutside = (event: any) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !topNavRef.current.contains(event.target)
    ) {
      dispatch(closeNav());
    }
  };

  useEffect(() => {
    dispatch(closeNav());
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    dispatch(closeNav());

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    let admin = storedUser ? JSON.parse(storedUser) : null;
    // if (admin) dispatch(getAdmin(admin.id));
  }, []);

  useEffect(() => {
    if (JSON.parse(`${localStorage.getItem("admin")}`) === null) {
      router.push("/auth");
    } else {
      const adminInfo = JSON.parse(`${localStorage.getItem("admin")}`);
      // dispatch(setAdminInfo(adminInfo));
    }
  }, [router]);
  return (
    <div className={`app-block ${styles.app_block}`}>
      {pathname === "/auth" ? (
        <div className="w-screen h-screen">{children}</div>
      ) : (
        <>
          <aside
            ref={sideNavRef}
            className={` ${styles.sidenav} ${
              openNav ? styles.navbox_active : ""
            }`}
          >
            <SideNav />
          </aside>
          <section className={`${styles.navbox_section} `}>
            <header ref={topNavRef}>
              <Header />
            </header>
            <main className="pb-16">{children}</main>
          </section>
        </>
      )}
    </div>
  );
}
