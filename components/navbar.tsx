import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <Button variant={"ghost"} size={"icon"} className="mr-4">
        <Menu />
      </Button>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
};

export default Navbar;
