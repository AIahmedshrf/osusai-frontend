// src/components/Hero.tsx
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin for the fallback
gsap.registerPlugin(ScrollTrigger);

// --- Configuration for the image sequence ---
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
  
  const [isCssAnimationSupported, setIsCssAnimationSupported] = useState(true);

  // Check for browser support on component mount
  useEffect(() => {
    // CSS.supports is a reliable way to check if the browser understands a property
    if (typeof window !== "undefined" && !CSS.supports("animation-timeline", "scroll()")) {
      console.warn("Browser does not support CSS Scroll-Driven Animations. Falling back to GSAP.");
      setIsCssAnimationSupported(false);
    }
  }, []);

  useLayoutEffect(() => {
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

    images[0].onload = () => {
      context.drawImage(images[0], 0, 0);

      if (isCssAnimationSupported) {
        // --- MODERN NATIVE CSS METHOD ---
        let lastFrame = -1;
        const animationLoop = () => {
          if (componentRef.current) {
            const styles = getComputedStyle(componentRef.current);
            const frameIndex = Math.round(parseFloat(styles.getPropertyValue("--frame-index")));

            if (frameIndex !== lastFrame && images[frameIndex]) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(images[frameIndex], 0, 0);
              lastFrame = frameIndex;
            }
          }
          requestAnimationFrame(animationLoop);
        };
        requestAnimationFrame(animationLoop);

        // Animate text fade separately
        gsap.to(heroContentRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: componentRef.current,
                start: 'top top',
                end: '25% top',
                scrub: true,
            }
        });

      } else {
        // --- FALLBACK GSAP METHOD ---
        const imageSequence = { frame: 0 };
        gsap.timeline({
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.5,
            pin: true,
          },
        })
        .to(heroContentRef.current, { opacity: 0, duration: 0.5 }, 0)
        .to(imageSequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
            onUpdate: () => {
              if (context && images[Math.round(imageSequence.frame)]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[Math.round(imageSequence.frame)], 0, 0);
              }
            },
          }, 0);
      }
    };
  }, [isCssAnimationSupported]);

  return (
    // We apply the CSS class only if the feature is supported
    <section 
      ref={componentRef} 
      className={`relative h-[250vh] w-full overflow-hidden ${isCssAnimationSupported ? 'scroll-driven-animation-container' : ''}`}
    >
      <div className="sticky top-0 h-screen w-full">
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