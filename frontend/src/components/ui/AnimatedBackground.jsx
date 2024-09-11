import React from "react";
import "@/App.css"; // Import the CSS file

const AnimatedBackground = () => {
  return (
    <ul className="background">
      {[...Array(10)].map((_, i) => (
        <li key={i}></li>
      ))}
    </ul>
  );
};

export default AnimatedBackground;
