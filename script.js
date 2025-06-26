const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const PARTICLE_COUNT = 100;
const CONNECT_DISTANCE = 100;
const particles = [];
const pulses = [];
const mouse = { x: null, y: null };

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= 0 || this.x >= width) this.vx *= -1;
    if (this.y <= 0 || this.y >= height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#0ff";
    ctx.fill();
  }
}

class Pulse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.opacity = 0.5;
  }
  update() {
    this.radius += 2;
    this.opacity -= 0.02;
  }
  draw() {
    if (this.opacity <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  isDead() {
    return this.opacity <= 0;
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

// ✅ Use window instead of canvas to capture mouse over any content
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});
window.addEventListener("click", e => {
  pulses.push(new Pulse(e.clientX, e.clientY));
});

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DISTANCE) {
        ctx.strokeStyle = `rgba(0,255,255,${1 - dist / CONNECT_DISTANCE})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
    if (mouse.x !== null && mouse.y !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DISTANCE) {
        ctx.strokeStyle = `rgba(0,255,255,${1 - dist / CONNECT_DISTANCE})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function drawCursorDot() {
  if (mouse.x !== null && mouse.y !== null) {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#0ff";
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  drawCursorDot();

  pulses.forEach(p => {
    p.update();
    p.draw();
  });

  for (let i = pulses.length - 1; i >= 0; i--) {
    if (pulses[i].isDead()) pulses.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();
