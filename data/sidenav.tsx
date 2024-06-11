import { HiHome, HiUsers } from "react-icons/hi2";
import { AiOutlineBarChart, AiFillCodeSandboxSquare } from "react-icons/ai";
import { RiLuggageDepositFill } from "react-icons/ri";
import { GiTrade } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TfiEmail, TfiTicket } from "react-icons/tfi";
import { IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { BsSendCheck } from "react-icons/bs";
export interface NavTypes {
  id: string;
  icon: string;
  desc: string;
  state: boolean;
  link: string;
}
export const navData: NavTypes[] = [
  {
    id: "PDQ17F",
    icon: "HiUsers",
    desc: "User Management",
    state: true,
    link: "/",
  },
  // {
  //   id: "UIO93N",
  //   icon: "IoSettings",
  //   desc: "Settings",
  //   state: false,
  //   link: "/settings",
  // },
  {
    id: "ZXC64B",
    icon: "CiLogout",
    desc: "Logout",
    state: false,
    link: "/logout",
  },
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "HiUsers":
      return <HiUsers fontSize={18} />;
    case "AiOutlineBarChart":
      return <AiOutlineBarChart fontSize={18} />;
    case "RiLuggageDepositFill":
      return <RiLuggageDepositFill fontSize={18} />;
    case "AiOutlineBarChart":
      return <AiOutlineBarChart fontSize={18} />;
    case "GiTrade":
      return <GiTrade fontSize={18} />;
    case "BsSendCheck":
      return <BsSendCheck fontSize={18} />;
    case "BiMoneyWithdraw":
      return <BiMoneyWithdraw fontSize={18} />;
    case "TfiTicket":
      return <TfiTicket fontSize={18} />;
    case "TfiEmail":
      return <TfiEmail fontSize={18} />;
    case "AiFillCodeSandboxSquare":
      return <AiFillCodeSandboxSquare fontSize={18} />;
    case "IoSettings":
      return <IoSettings fontSize={18} />;
    case "CiLogout":
      return <CiLogout fontSize={18} />;

    default:
      return null;
  }
};
