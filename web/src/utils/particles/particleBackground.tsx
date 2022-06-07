import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./particle-config";

const particleStyle = {
  position: "fixed" as const,
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  zIndex: "-1",
};

export default function ParticleBackground() {
  return (
    <div style={particleStyle}>
      {/* 
  // @ts-ignore */}
      <Particles params={particlesConfig} />
    </div>
  );
}
