import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div>
      <Link href="/sign-in">
        <Button className="text-white bg-blue-500 hover:bg-blue-600">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button className="text-white bg-blue-500 hover:bg-blue-600">Sign Up</Button>
      </Link>
      <UserButton />
    </div>
  );
};

export default HomePage;
