import { useState, useEffect } from "react";

export function HeroBanner() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<
    | "typing-first"
    | "pause-first"
    | "erasing-first"
    | "typing-second"
    | "complete"
  >("typing-first");

  const firstText = "The Community Of Champions";
  const secondText = "Earn Your Rank";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    if (animationPhase === "typing-first") {
      // Type the first text
      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < firstText.length) {
          setDisplayText(firstText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          // Pause for a moment after typing completes
          timeoutId = setTimeout(() => {
            setAnimationPhase("pause-first");
          }, 1000); // Pause for 1 second
        }
      }, 80); // Type each character every 80ms
    } else if (animationPhase === "pause-first") {
      // Brief pause, then start erasing
      timeoutId = setTimeout(() => {
        setAnimationPhase("erasing-first");
      }, 500); // Additional 500ms pause
    } else if (animationPhase === "erasing-first") {
      // Erase the first text (typewriter backwards)
      let currentLength = firstText.length;
      intervalId = setInterval(() => {
        if (currentLength > 0) {
          setDisplayText(firstText.slice(0, currentLength - 1));
          currentLength--;
        } else {
          clearInterval(intervalId);
          // Brief pause before typing second text
          timeoutId = setTimeout(() => {
            setAnimationPhase("typing-second");
          }, 300); // Short pause between texts
        }
      }, 50); // Erase each character every 50ms (faster than typing)
    } else if (animationPhase === "typing-second") {
      // Type the second text
      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < secondText.length) {
          setDisplayText(secondText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setAnimationPhase("complete");
        }
      }, 100); // Type each character every 100ms
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [animationPhase]);

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div
      className="flex h-[218px] flex-col justify-center items-center relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/hero-bg.svg')`,
      }}
    >
      <h1 className="text-white text-center font-nunito text-[40px] font-black leading-[71px] capitalize">
        {displayText}
        <span
          className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
        >
          _
        </span>
      </h1>
    </div>
  );
}
