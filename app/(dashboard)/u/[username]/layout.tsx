import { getUserByUserName } from "@/lib/user-service";
import { redirect } from "next/navigation";
import React from "react";
import NavBar from "./_components/navbar";
import SideBar from "./_components/SideBar";
import { Container } from "./_components/Container";

interface CreatorLayoutProps {
  params: { username: string };
  children: string;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getUserByUserName(params.username);

  if (!self) {
    redirect("/");
  }
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
