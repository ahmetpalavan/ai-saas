"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageCircleIcon, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin-ext"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
interface Props {
  apiLimit: number;
  isPro?: boolean;
}
const Sidebar = ({ apiLimit }: Props) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard">
          <div className="flex items-center space-x-2 ml-2">
            <Image
              src="/logo.png"
              width={24}
              height={24}
              alt="
              Logo"
            />
            <span className={cn("text-xl font-bold", montserrat.className)}>Genius</span>
          </div>
        </Link>
        <div className="space-y-2 mt-5">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("flex w-full transition duration-200 ease-in-out rounded-lg p-2 space-x-2 hover:bg-gray-700", {
                "bg-gray-700": pathname === route.href,
              })}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} /> <span className="text-sm">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimit={apiLimit} isPro={false} />
    </div>
  );
};

export default Sidebar;
