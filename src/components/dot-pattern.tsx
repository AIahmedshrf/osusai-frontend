import { cn } from "@/lib/utils";

export const DotPattern = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(
        "fixed -z-10 h-full w-full [mask-image:radial-gradient(white,transparent_80%)]",
        className
      )}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <circle id="pattern-circle" cx="2" cy="2" r="1" fill="black" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#dot-pattern)"
      />
    </svg>
  );
};
