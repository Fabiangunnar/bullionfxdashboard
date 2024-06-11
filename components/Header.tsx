import React, { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import styles from "@/app/styles/Header.module.scss";
import {
  Button,
  Flex,
  createStandaloneToast,
  useDisclosure,
} from "@chakra-ui/react";
import SpinnerPage from "./Spinner";
import { AiOutlineRollback } from "react-icons/ai";
import { setOpenNav, setPrevPage } from "@/redux/features/NavSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
type Props = {};

const Header = (props: Props) => {
  const { errorMessage } = useAppSelector((state) => state.AppSlice);
  const { prevPage } = useAppSelector((state) => state.nav);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = createStandaloneToast();
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState();
  const handleOpenNav = () => {
    dispatch(setOpenNav());
  };

  return (
    <>
      {isLoading && <SpinnerPage />}
      <div className={`${styles.top_nav}`}>
        <Flex w={"100%"} justify={"center"}></Flex>
        <span
          className={`${styles.menu_bar} ${styles.mobile}`}
          onClick={handleOpenNav}
        >
          <HiOutlineBars3BottomRight />
        </span>
      </div>
    </>
  );
};

export default Header;
