"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { IoSettings } from "react-icons/io5";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  WrapItem,
  createStandaloneToast,
} from "@chakra-ui/react";
import SpinnerPage from "@/components/Spinner";
import { updateAdminInfo, resetAdmin3State } from "@/redux/features/AppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

type Props = {};

const Settings = (props: Props) => {
  const [input, setInput] = useState("");
  const { toast } = createStandaloneToast();
  const [isLoading, setisLoading] = useState(false);
  const { adminInfo, adminState3, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: adminInfo?.username,
    password: adminInfo?.password,
    phone: adminInfo?.phone,
    email: adminInfo?.email,
    btc: adminInfo?.btc,
    eth: adminInfo?.eth,
    usdt: adminInfo?.usdt,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateAdminInfo([adminInfo?.id, formData]));
  };
  useEffect(() => {
    if (adminState3.isSuccess) {
      toast({
        title: "Success",
        description: "Information Updated",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (adminState3.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (adminState3.isLoading) {
      setisLoading(true);
    }

    dispatch(resetAdmin3State());
  }, [
    adminState3.isSuccess,
    adminState3.isError,
    adminState3.isLoading,
    dispatch,
  ]);

  const handleInputChange = (e: any) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isError = input === "";
  return (
    <section className={`${styles.user_block}`}>
      {isLoading && <SpinnerPage />}

      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <IoSettings />
          <p>Settings</p>
        </div>
        <Box p={2}>
          <form action="" onSubmit={handleSubmit}>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Username</FormLabel>
              <Input
                type="text"
                fontSize={12}
                required
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Password</FormLabel>
              <Input
                type="text"
                fontSize={12}
                required
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Phone</FormLabel>
              <Input
                type="tel"
                fontSize={12}
                required
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Email</FormLabel>
              <Input
                type="email"
                fontSize={12}
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl p={2}>
              <FormLabel fontSize={12}>Bitcoin</FormLabel>
              <Input
                type="text"
                fontSize={12}
                required
                name="btc"
                value={formData.btc}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={12}>Ethereum</FormLabel>
              <Input
                type="text"
                fontSize={12}
                required
                name="eth"
                value={formData.eth}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={12}>USDT</FormLabel>
              <Input
                type="text"
                fontSize={12}
                required
                name="usdt"
                value={formData.usdt}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl p={2}>
              <Button type="submit" w="100%" colorScheme="messenger">
                Update
              </Button>
            </FormControl>
          </form>
        </Box>
      </div>
    </section>
  );
};

export default Settings;
