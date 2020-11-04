let time = 0;
const initialPos = { x: 200, y: 200 };
let path = [];
let xArray = [];
let yArray = [];
let fourierTransformX;
let fourierTransformY;

// Colors
const darkBlue = '#14213d';
const gray = '#e5e5e5';
const mustard = 'rgba(252,163,17, 1)';
const mustard2 = 'rgba(252,163,17, 0.3)';
const salmon = '#FA8072';

function setup() {
  createCanvas(1000, 800);

  codingTrainDrawing.forEach(({ x, y }, i) => {
    if (i % 10 !== 0) return;
    xArray.push(x);
    yArray.push(y);
  });

  fourierTransformX = dft(xArray);
  fourierTransformY = dft(yArray);

  fourierTransformX.sort((a, b) => b.amplitude - a.amplitude);
  fourierTransformY.sort((a, b) => b.amplitude - a.amplitude);
}

function epiCycles(x, y, rotation, fourierTransform) {
  for (let i = 0; i < fourierTransform.length; i++) {
    let prevX = x;
    let prevY = y;

    const radius = fourierTransform[i].amplitude;
    const { frequency, phase } = fourierTransform[i];
    const angle = frequency * time + phase + rotation;

    x += radius * cos(angle);
    y += radius * sin(angle);

    // Radial lines
    line(prevX, prevY, x, y);

    // Rotating circles
    noFill();
    stroke(mustard2);
    ellipse(prevX, prevY, 2 * radius);

    // Circle centers
    fill(mustard);
    ellipse(x, y, 3);
  }
  return createVector(x, y);
}

function draw() {
  background(darkBlue);
  noFill();
  stroke(mustard);

  let vx = epiCycles(650, 150, 0, fourierTransformX);
  let vy = epiCycles(150, 450, HALF_PI, fourierTransformY);
  let cyclesVector = createVector(vx.x, vy.y);

  path.unshift(cyclesVector);

  // The Tracing
  stroke(255, 100)
  line(vx.x, vx.y, cyclesVector.x, cyclesVector.y);
  line(vy.x, vy.y, cyclesVector.x, cyclesVector.y);
  beginShape();
  noFill();
  stroke(salmon);
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  if (time > TWO_PI) {
    noLoop();
    setTimeout(() => {
      path = [];
      time = 0;
      loop();
    }, 5000)
  }

  const dt = TWO_PI / fourierTransformX.length;
  time += dt;
}
