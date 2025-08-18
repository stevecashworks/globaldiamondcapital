import { useEffect, useState } from "react";

const useIntersection = (elementId, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementId, options]);

  return isVisible;
};

export default useIntersection;
