import React from "react";
import Lottie from "lottie-react";
import animationData from "./ui/b.json";

function Banner() {
  return (
    <div
      className="flex w-[98.7vw] justify-center relative mb-12"
      style={{
        marginTop: "-30px", // Adjust this value to control the overlap with the navbar
      }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 260, height: 220 }}
      />
      <div
        className="absolute bottom-0 text-center"
        style={{
          transform: "translateY(50%)", // Adjust this value to control the overlap of text with the animation
          width: "100%",
        }}
      >
        <p className="text-lg font-light text-[26px]">
          "Unlock a World of Stories"
        </p>
      </div>
    </div>
  );
}

export default Banner;
