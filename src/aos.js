export const animatedClasses = [
  "fadeinUp",
  "fadeinDown",
  "fadeinLeft",
  "fadeinRight",
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

const observeClass = (className) => {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    observer.observe(element);
  });
};

export default observeClass;
