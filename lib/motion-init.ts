/** Inline, pre-paint: opt into scroll-reveal motion only when the browser supports it. */
export const motionInitScript = `(function(){if('IntersectionObserver' in window){document.documentElement.classList.add('js-motion');}})();`;
