import React, { useState, useEffect, useCallback } from "react";
import "./StarlightField.css";

// --- Configuration ---
const NUM_STARS = 400;
const AURORA_COLORS = ["#45A0F5", "#B785E0", "#FF7E7E"];

/**
 * StarlightField Component
 * Renders a full-screen, interactive starfield with a colorful "Aurora Trail"
 * that follows the user's mouse cursor.
 */
const StarlightField = () => {
  const [stars, setStars] = useState([]);
  const [aurora, setAurora] = useState([]);

  // --- Star Generation ---
  // This effect runs once on component mount to create the starfield.
  useEffect(() => {
    const generatedStars = Array.from({ length: NUM_STARS }).map(() => ({
      id: Math.random(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1.5, // Star size: 1px to 3px
      opacity: Math.random() * 0.5 + 0.3, // Opacity: 0.3 to 0.8
      animationDelay: `${Math.random() * 5}s`,
    }));
    setStars(generatedStars);
  }, []);

  // --- Aurora Trail Handler ---
  // This function is wrapped in useCallback for performance optimization.
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;

    // Create a new particle for the aurora trail
    const newParticle = {
      id: Date.now() + Math.random(),
      left: clientX,
      top: clientY,
      color: AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)],
    };

    // Add the new particle to the state
    setAurora((prevAurora) => [...prevAurora, newParticle]);

    // Set a timeout to remove the particle after its animation completes (1000ms)
    // This is crucial for preventing memory leaks and performance degradation.
    setTimeout(() => {
      setAurora((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  }, []);

  return (
    <div className="starlight-field" onMouseMove={handleMouseMove}>
      {/* Render all the stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Render all the aurora trail particles */}
      {aurora.map((particle) => (
        <div
          key={particle.id}
          className="aurora-particle"
          style={{
            top: particle.top,
            left: particle.left,
            backgroundColor: particle.color,
            // The box-shadow creates the beautiful glowing aura effect
            boxShadow: `0 0 20px 2px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default StarlightField;
