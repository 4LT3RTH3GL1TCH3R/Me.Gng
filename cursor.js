const dot = document.getElementById("cursor-dot");

window.addEventListener("mousemove", e => {
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
});
