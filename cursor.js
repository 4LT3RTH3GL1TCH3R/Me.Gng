const dot = document.getElementById("cursor-dot");

// Move dot with mouse
window.addEventListener("mousemove", e => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
});

// Scale cursor when hovering clickable elements
function updateCursorScaling() {
  const hoverables = document.querySelectorAll('a, button, nav li');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

updateCursorScaling();
