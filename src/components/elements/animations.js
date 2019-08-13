import { keyframes } from '../element';
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

export const glitch = content => (
  css`
    animation: ${noiseAnimation()} 2s infinite linear alternate-reverse;
      &:before {
        content: '${content}';
        position: absolute;
        left:-2px;
        text-shadow:1px 0 blue; 
        color:white;
        overflow:hidden;
        clip:rect(0,900px,0,0); 
        animation: ${noiseAnimation()} 3s infinite linear alternate-reverse;
      }

      &:after {
        content:'${content}';
        position:absolute;
        left:2px;
        text-shadow:-1px 0 red;
        color:white;
        overflow: hidden;
        clip:rect(0,900px,0,0); 
        animation:${noiseAnimation()} 2s infinite linear alternate-reverse;
      }
  `
);

export const textGlitch = (dis, len) => {
  
  function generateRandomKeyFrames(dis, len, name){
    let keyframe = ``;
    for(var i = 0; i < len; i++){
      keyframe += `${(i / len) * 100}%{transform: translateX(${Math.Ran(dis)}px)}`
    }
    // debugger
    return keyframe
  }

  return (
    css`
      animation: ${keyframes`${generateRandomKeyFrames(dis, len)}`} 1000ms steps(1) alternate infinite;
    `
  );
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

  return (
    css`
      animation: ${keyframes`${generateRandomClipFrames(200)}`} 20s steps(1) infinite;
    `
  );
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