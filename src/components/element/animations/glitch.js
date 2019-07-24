import { keyframes } from 'styled-components';

export const GlitchAnimation = (args) => {
  const noiseAnimation = () => {
    let keyframeVals = '';
  
    for (let i =0; i <= 20; i++) {
      keyframeVals += `${Math.floor((i * (1/20) * 100))}% {
        clip: rect(${Math.floor(Math.random() * 100)+1}px, 9999px, ${Math.floor(Math.random() * 99)+1}px, 0);
      }\n`
    }
    
    return keyframes`${keyframeVals}`;
  };

  
}