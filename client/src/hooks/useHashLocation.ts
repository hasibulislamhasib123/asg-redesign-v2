import { useState, useEffect } from "react";
import { BaseLocationHook } from "wouter/use-location";

// returns the current hash location (minus the '#' prefix)
export const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState(window.location.hash.replace(/^#/, "") || "/");

  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");

    // subscribe to hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => (window.location.hash = to);

  return [loc, navigate];
};