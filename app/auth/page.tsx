"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Home.module.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  createStandaloneToast,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import SpinnerPage from "@/components/Spinner";
import { login, resetAdminState } from "@/redux/features/AppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Props = {};

const Index = (props: Props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const { adminState, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );
  const { toast } = createStandaloneToast();
  const handleShowPassword = () => setShow(!show);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (adminState?.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(resetAdminState());
    }
  }, [adminState.isError]);
  useEffect(() => {
    if (adminState.isLoading) {
      setLoad(true);
    }

    return () => {
      setLoad(false);
    };
  }, [load, adminState.isLoading]);
  useEffect(() => {
    if (adminState.isSuccess) {
      router.push("/");
      dispatch(resetAdminState());
    }
  }, [adminState.isSuccess]);

  useEffect(() => {
    const myData = localStorage.getItem("admin");

    if (myData) {
      router.push("/");
    }
  }, []);

  return (
    <section className={styles.auth_block}>
      {load && <SpinnerPage />}
      <Card>
        <CardHeader>
          <Text fontWeight={"semibold"} fontSize={24}>
            Login to your account
          </Text>
        </CardHeader>

        <CardBody className={styles.auth_info}>
          <form action="" onSubmit={handleSubmit}>
            <FormControl p={2}>
              <FormLabel fontSize={14}>Username</FormLabel>
              <Input
                type="text"
                fontSize={16}
                required
                name="username"
                placeholder="Your username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={14}>Password</FormLabel>

              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  fontSize={14}
                  required
                  w="100%"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputRightElement padding={0} width="3rem">
                  <Button
                    bg={"transparent"}
                    _hover={{
                      color: "#FFF",
                      background: "#ffffff30",
                    }}
                    onClick={handleShowPassword}
                  >
                    {show ? (
                      <BsEyeSlashFill fontSize={18} />
                    ) : (
                      <BsEyeFill fontSize={18} />
                    )}
                  </Button>{" "}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl p={2}>
              <Button
                fontSize={16}
                type="submit"
                w="100%"
                colorScheme="messenger"
                className="bg-[#236AEE]"
              >
                Login
              </Button>
            </FormControl>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default Index;
