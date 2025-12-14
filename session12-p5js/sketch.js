// Dynamic Galaxy Polygons
// Regular Polygon

let t = 0;        // time variable
let stars = [];   // background stars

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  // random star positions
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      twinkle: random(100)
    });
  }
}

function draw() {
  background(10);

  // starfield
  for (let s of stars) {
    noStroke();
    fill(255, 255, 255, 150 + sin(t + s.twinkle) * 100);
    circle(s.x, s.y, s.size);
  }

  translate(width / 2, height / 2);

  let sides = floor(map(mouseX, 0, width, 3, 20)); 
  let baseSize = 100 + sin(t * 2) * 30;           
  let spin = t * 1.5;                            

  // 3 layered rotating polygons
  for (let layer = 0; layer < 3; layer++) {
    push();
    let radius = baseSize + layer * 40;
    rotate(spin + layer * 50);

    let hueValue = (t * 4 + layer * 80) % 360;
    stroke(color(`hsla(${hueValue}, 100%, 60%, 1)`));
    fill(color(`hsla(${hueValue}, 80%, 50%, 0.25)`));
    strokeWeight(3);

    drawPolygon(0, 0, radius, sides + layer * 2);
    pop();
  }

  t += 0.5;
}

function drawPolygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
