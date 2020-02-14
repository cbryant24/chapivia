export const infiniteBackground = {
  continuous: {
    from: { 'background-position': '0 0' },
    to: { 'background-position': '0 -10000px' }
  },
  duration_continuous: 75,
  animation_timing_function: 'linear'
};

export const flashingText = {
  continuous: {
    from: { opacity: '0' },
    to: { opacity: '1' }
  },
  duration_continuous: 3
};
