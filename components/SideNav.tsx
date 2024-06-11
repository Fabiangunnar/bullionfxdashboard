import React, { useEffect } from "react";
import { NavTypes, getIconComponent, navData } from "../data/sidenav";
import Link from "next/link";
import styles from "@/app/styles/SideNav.module.scss";
import {
  setCurrentPage,
  setNavLink,
  closeNav,
} from "@/redux/features/NavSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { usePathname } from "next/navigation";

type Props = {};

const SideNav = (props: Props) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const handleChangeNav = (link: NavTypes) => {
    dispatch(setCurrentPage(link.link));
    dispatch(setNavLink(link));
    dispatch(closeNav());
  };

  return (
    <div className={`${styles.sidenav_block}`}>
      <h1>Admin</h1>
      <div className={`${styles.sidenav_items}`}>
        <h5>Menus</h5>
        <ul className={`${styles.nav_links} w-full`}>
          {navData.map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);

            return (
              <Link
                href={item.link}
                key={item.id}
                className={`${styles.nav_link} ${
                  pathname === item.link ? styles.active : ""
                }
                      `}
              >
                <span>{icon}</span>
                <span>{item?.desc} </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
