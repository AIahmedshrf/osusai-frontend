// src/components/Hero.tsx
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const frameCount = 281;
const imagePath = "/sequence/16x9_281/standard/";
const imagePrefix = "graded_4K_100_gm_50_1080_3-";
const imageExtension = ".jpg";

const currentFrame = (index: number) =>
  `${imagePath}${imagePrefix}${(index + 1).toString().padStart(3, "0")}${imageExtension}`;

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- RELIABLE SEQUENTIAL PRELOADING LOGIC ---
  useEffect(() => {
    const loadImageSequentially = async () => {
      for (let i = 0; i < frameCount; i++) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = currentFrame(i);
          img.onload = () => {
            setLoadingProgress(Math.floor(((i + 1) / frameCount) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            resolve();
          };
        });
      }
      setTimeout(() => setIsLoaded(true), 500);
    };

    loadImageSequentially();
  }, []);

  // --- GSAP-ONLY ANIMATION SETUP ---
  useLayoutEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // This object will be animated by GSAP
    const imageSequence = { frame: 0 };

    images[0].onload = () => {
      context.drawImage(images[0], 0, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "+=200%", // Control animation speed by changing this value
          scrub: 1.5,
          pin: true,
        },
      });

      // Animate the hero text to fade out
      tl.to(heroContentRef.current, { opacity: 0 }, 0);

      // Animate the image sequence frames using GSAP
      tl.to(
        imageSequence,
        {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          onUpdate: () => {
            if (context && images[Math.round(imageSequence.frame)] && images[Math.round(imageSequence.frame)].complete) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(images[Math.round(imageSequence.frame)], 0, 0);
            }
          },
        },
        0 // Start at the same time
      );
    };
  }, [isLoaded]);

  return (
    <section 
      ref={componentRef} 
      className="relative w-full"
    >
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-text">{loadingProgress}</div>
        </div>
      )}

      {/* The `h-screen` makes the section take up the full viewport height */}
      <div className={`h-screen w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <canvas ref={canvasRef} className="h-full w-full object-cover"></canvas>
        <div
          ref={heroContentRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center p-4"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black">
              The single platform to iterate, evaluate, deploy, and monitor LLMs
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};