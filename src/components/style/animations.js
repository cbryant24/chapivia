import { keyframes } from '@cbryant24/styled-react';
import { css } from 'styled-components';

Math.Ran = function(max){
  let rn = Math.round(Math.random() * max);
  rn *= Math.random() > 0.5 ? -1 : 1;
  return rn
};

export const noiseAnimation = () => {
  let keyframeVals = '';

  for (let i =0; i <= 20; i++) {
    keyframeVals += `${Math.floor((i * (1/20) * 100))}% {
      clip: rect(${Math.floor(Math.random() * 100)+1}px, 9999px, ${Math.floor(Math.random() * 99)+1}px, 0);
    }\n`
  }
  
  return keyframes`${keyframeVals}`;
};

export const bgAnimation = (props) => {
  return keyframes`0% { opacity: 0.9; }
                   50% { opacity: 1; }`
}

export const bgGlowAnimation = (props) => {
  return keyframes`0% { opacity: 0.15; }
                  50% { opacity: 0.25; }
                  75% { opacity: 0.18; }
                  100% { opacity: .28; }`
};

// export const glitch = content => {
//   return keyframes`${noiseAnimation()}`;
//   // css`
//   //   animation: ${noiseAnimation()} 2s infinite linear alternate-reverse;
//   //     &:before {
//   //       content: '${content}';
//   //       position: absolute;
//   //       left:-2px;
//   //       text-shadow:1px 0 blue; 
//   //       color:white;
//   //       overflow:hidden;
//   //       clip:rect(0,900px,0,0); 
//   //       animation: ${noiseAnimation()} 3s infinite linear alternate-reverse;
//   //     }

//   //     &:after {
//   //       content:'${content}';
//   //       position:absolute;
//   //       left:2px;
//   //       text-shadow:-1px 0 red;
//   //       color:white;
//   //       overflow: hidden;
//   //       clip:rect(0,900px,0,0); 
//   //       animation:${noiseAnimation()} 2s infinite linear alternate-reverse;
//   //     }
//   // `
// };

export const textGlitch = (dis, len) => {
  
  function generateRandomKeyFrames(dis, len, name){
    let keyframe = ``;
    for(var i = 0; i < len; i++){
      keyframe += `${(i / len) * 100}%{transform: translateX(${Math.Ran(dis)}px)}`
    }
    // debugger
    return keyframe
  }

  return keyframes`${generateRandomKeyFrames(dis, len)}`;
}

export const glitchTop = () => {
  return keyframes`
    2%{ transform: translate(2px,-2px); }
    4%{ transform: translate(-2px,2px); }
    60% { transform: translate(-2px,2px); }
    62% { transform: translate(13px,-1px) skew(-13deg); }
    64%{ transform: translate(2px,-2px); }
  `
}

export const glitchMiddle = () => {
  return keyframes`
    2%{ transform: translate(2px,0) skew(0deg);}
    4%{ transform: translate(-2px,0) skew(0deg);}
    60%{ transform: translate(-2px,0) skew(0deg);}
    62%{ transform: translate(0,0) skew(5deg); }
    64%{ transform: translate(2px,0) skew(0deg);}
  `
}

export const glitchBottom = () => {
  return keyframes`
    2% { transform: translate(-2px,0); }
    4% { transform: translate(-2px,0); }
    60%{ transform: translate(-2px,0); }
    62%{ transform: translate(-22px,5px) skew(21deg); }
    64%{ transform: translate(-2px,0); }
  `
}

export const randomSquareGlitch = () => {

  function generateRandomClipFrames(len){
    let keyframe = ``;
    let size = 100;
    for(var i = 0; i < len; i++){
      keyframe += 
        `${(i / len) * 100}%{
      clip-path: inset(${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}%)
      }`
    }
    
    return keyframe;
  }

  return keyframes`${generateRandomClipFrames(200)}} 20s steps(1) infinite`;
  
}

export const generateRandomClipFrames = (len = 200) => {
  let keyframe = ``;
  let size = 100;
  for(var i = 0; i < len; i++){
    keyframe += 
      `${(i / len) * 100}%{
    clip-path: inset(${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}%)
    }`
  }

  return (
    css`
      animation: ${keyframes`${keyframe}`} ;
    `
  )
}

export const animationKeys = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

// const animationRule = css`${animation} 1s infinite alternate`
export const animationRule = css`${animationKeys}`

export const infiniteBackground = () => {
// debugger
  return keyframes`
    from { background-position: 0 0; }
    to { background-position: 0 -10000px; }

  `;
}