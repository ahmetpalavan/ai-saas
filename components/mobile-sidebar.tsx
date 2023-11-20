"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { checkSubscription } from "@/lib/subscription";
interface MobileSidebarProps {
  apiLimit: number;
  isPro?: boolean;
}

const MobileSidebar = ({ apiLimit, isPro = false }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar apiLimit={apiLimit} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
