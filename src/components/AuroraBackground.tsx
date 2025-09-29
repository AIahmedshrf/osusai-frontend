// src/components/AuroraBackground.tsx

export const AuroraBackground = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full -z-10 transition-transform duration-300 ease-linear">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    </div>
  );
};