/**
 * Discrete Fourier Transform algorithm - https://en.wikipedia.org/wiki/Discrete_Fourier_transform
 *
 * @param {Array<number>} signal
 * @returns {Array<object>} transformed signal
 */
function dft(signal) {
  const X = [];
  const N = signal.length;
  for (let k = 0; k < N; k++) {
    let real = 0;
    let imaginary = 0;
    for (let n = 0; n < N; n++) {
      const x_n = signal[n];
      const angle = (TWO_PI * k * n) / N;
      real += x_n * cos(angle);
      imaginary -= x_n * sin(angle);
    }
    // Common procedure for DFTs
    real = real / N;
    imaginary = imaginary / N;

    const frequency = k;
    const amplitude = sqrt(sq(real) + sq(imaginary)); // Pythagorean theorem
    const phase = atan2(imaginary, real);
    X[k] = {
      amplitude,
      frequency,
      imaginary,
      phase,
      real
    };
  }

  return X;
}
