export const infiniteBackground = {
  continuous: {
    from: { "background-position": "0 0" },
    to: { "background-position": "0 -10000px" }
  },
  duration_continuous: 75,
  animation_timing_function: "linear"
};

export const flashingText = {
  continuous: {
    from: { opacity: "0" },
    to: { opacity: "1" }
  },
  duration_continuous: 1,
  animation_direction: "alternate-reverse"
};

export const dropInFromTop = {
  in: {
    "0%": {
      transform: "translateY(-500px)",
      "animation-timing-function": "ease-in",
      opacity: 0
    },
    "38%": {
      transform: "translateY(0)",
      "animation-timing-function": "ease-out",
      opacity: 1
    },
    "55%": {
      transform: "translateY(-65px)",
      "animation-timing-function": "ease-in"
    },
    "72%": {
      transform: "translateY(0)",
      "animation-timing-function": "ease-out"
    },
    "81%": {
      transform: "translateY(-28px)",
      "animation-timing-function": "ease-in"
    },
    "90%": {
      transform: "translateY(0)",
      "animation-timing-function": "ease-out"
    },
    "95%": {
      transform: "translateY(-8px)",
      "animation-timing-function": "ease-in"
    },
    "100%": {
      transform: "translateY(0)",
      "animation-timing-function": "ease-out"
    }
  }
};
