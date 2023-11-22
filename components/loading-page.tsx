import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
      <div className="flex items-center gap-x-4">
        <div className="p-2 w-fit rounded-md">
          <Skeleton className="w-8 h-8" />
        </div>
        <div className="font-semibold">
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <Skeleton className="w-5 h-5" />
    </div>
  );
};

export default LoadingPage;
