"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function useReducedMotionSafe() {
  const prefersReduced = useFramerReducedMotion();
  return prefersReduced ?? false;
}