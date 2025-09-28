"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Background = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]",
        className
      )}
    >
      <div className="fixed inset-0 -z-20 h-full w-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-30 h-full w-full"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3,
        }}
      >
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      </motion.div>
    </div>
  );
};