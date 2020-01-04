import React, { useEffect } from 'react';

import { BoxAll, keyframes } from './element';
import { determineBreakPoint } from '../components/helpers';
import { useWindowSize, useAnimationFrame } from '../hooks';

//TODO: ADD Logic to use width values other than percentage
//TODO: ADD Logic to use parts of the size value i.e. width={[4,5]} currently doesn't work
//TODO: ADD Logic to determine contionus duration
function LedMarquee({ theme, children, ...props }) {
  const SCROLLER_LENGTH = 60;
  const HEIGHT = 7;
  // const theInput = $('#theInput');
  const fps = 30;

  const myMessage = textToLED('Hello everyone ');
  let leftPointer = SCROLLER_LENGTH + 1;
  const rightPointer = 0;
  const furthestLeftPoint = 0 - myMessage.length;
  const LedLightBoard = [];

  const light = {
    width: "5px",
    height: "5px",
    margin: "1px 1px",
    textAlign: "center",
    fontSize: "15px",
    float: "left",
    borderRadius: "50%"
  };

  const off = {
    backgroundColor: "#121212"
  };

  const on = {
    backgroundColor: "#0ff",
    boxShadow: "0px 0px 5px #0ff"
  }

  function textToLED(theWord){
    var theMessage = [];
    theWord = theWord.toUpperCase();
    for(var i=0; i < theWord.length; i++) {
      theMessage.push(charToLED(theWord.charAt(i)));
      theMessage.push(charToLED());
    }
    
    var flatten = [];
    flatten = flatten.concat.apply(flatten, theMessage);
    
    return flatten;
  }

  useEffect(() => {
    draw();
  }, [])

  function charToLED(theChar){
    var theLed = [];
    switch(theChar){
      case 'A' :
        theLed = [[false, false, true, true, true, true, true], 
                  [false, true, false, false, true, false, false], 
                  [true, false, false, false, true, false, false],
                  [false, true, false, false, true, false, false],
                  [false, false, true, true, true, true, true]];
        break;
      case 'B' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [false, true, true, false, true, true, false]];
        break;
      case 'C' :
        theLed = [[false, true, true, true, true, true, false], 
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [false, true, false, false, false, true, false]]; 
        break;
       case 'D' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [false, true, true, true, true, true, false]]; 
        break;
      case 'E' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, false, false, false, false, true]];
        break;
      case 'F' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [true, false, false, false, false, false, false]];
        break;
      case 'G' :
        theLed = [[false, true, true, true, true, true, false], 
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, true, false, true],
                  [true, true, false, false, true, true, true]];
        break;
      case 'H' :
        theLed = [[true, true, true, true, true, true, true], 
                  [false, false, false, true, false, false, false],
                  [false, false, false, true, false, false, false],
                  [false, false, false, true, false, false, false],
                  [true, true, true, true, true, true, true]];
        break;
      case 'I' :
        theLed = [[false, false, false, false, false, false, false], 
                  [true, false, false, false, false, false, true],
                  [true, true, true, true, true, true, true],
                  [true, false, false, false, false, false, true],
                  [false, false, false, false, false, false, false]];
        break;
      case 'J' :
        theLed = [[false, false, false, false, false, true, false], 
                  [false, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [true, true, true, true, true, true, false],
                  [true, false, false, false, false, false, false]];
        break;  
      case 'K' :
        theLed = [[true, true, true, true, true, true, true], 
                  [false, false, false, true, false, false, false],
                  [false, false, true, false, true, false, false],
                  [false, true, false, false, false, true, false],
                  [true, false, false, false, false, false, true]];
        break;
      case 'L' :
        theLed = [[true, true, true, true, true, true, true], 
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, false, true]];
        break;
      case 'M' :
        theLed = [[true, true, true, true, true, true, true], 
                  [false, true, false, false, false, false, false],
                  [false, false, true, false, false, false, false],
                  [false, true, false, false, false, false, false],
                  [true, true, true, true, true, true, true]];
        break;
      case 'N' :
        theLed = [[true, true, true, true, true, true, true], 
                  [false, false, true, false, false, false, false],
                  [false, false, false, true, false, false, false],
                  [false, false, false, false, true, false, false],
                  [true, true, true, true, true, true, true]];
        break;
      case 'O' :
        theLed = [[false, true, true, true, true, true, false], 
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, false, false, true],
                  [false, true, true, true, true, true, false]];
        break;
      case 'P' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [false, true, true, false, false, false, false]];
        break;
      case 'Q' :
        theLed = [[false, true, true, true, true, true, false], 
                  [true, false, false, false, false, false, true],
                  [true, false, false, false, true, false, true],
                  [true, false, false, false, false, true, false],
                  [false, true, true, true, true, false, true]];
        break;
      case 'R' :
        theLed = [[true, true, true, true, true, true, true], 
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [true, false, false, true, false, false, false],
                  [false, true, true, false, true, true, true]];
        break;
      case 'S' :
        theLed = [[false, true, true, false, false, false, true], 
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, false, false, true, true, false]];
        break;
      case 'T' :
        theLed = [[true, false, false, false, false, false, false], 
                  [true, false, false, false, false, false, false],
                  [true, true, true, true, true, true, true],
                  [true, false, false, false, false, false, false],
                  [true, false, false, false, false, false, false]];
        break;
      case 'U' :
        theLed = [[true, true, true, true, true, true, false], 
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, false, true],
                  [true, true, true, true, true, true, false]];
        break;
      case 'V' :
        theLed = [[true, true, true, true, true, false, false], 
                  [false, false, false, false, false, true, false],
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, false, true, false],
                  [true, true, true, true, true, false, false]];
        break;
      case 'W' :
        theLed = [[true, true, true, true, true, true, false], 
                  [false, false, false, false, false, false, true],
                  [false, false, false, false, true, true, false],
                  [false, false, false, false, false, false, true],
                  [true, true, true, true, true, true, false]];
        break;
      case 'X' :
        theLed = [[true, false, false, false, false, false, true], 
                  [false, true, true, false, true, true, false],
                  [false, false, false, true, false, false, false],
                  [false, true, true, false, true, true, false],
                  [true, false, false, false, false, false, true]];
        break;
      case 'Y' :
        theLed = [[true, false, false, false, false, false, false], 
                  [false, true, false, false, false, false, false],
                  [false, false, true, true, true, true, true],
                  [false, true, false, false, false, false, false],
                  [true, false, false, false, false, false, false]];
        break;
      case 'Z' :
        theLed = [[true, false, false, false, false, true, true], 
                  [true, false, false, false, true, false, true],
                  [true, false, false, true, false, false, true],
                  [true, false, true, false, false, false, true],
                  [true, true, false, false, false, false, true]];
        break;
      default:
        theLed = [[false, false, false, false, false, false, false]];
    }  
    return theLed;
  }

  // function draw() {
  //   setTimeout(function() {
  //     requestAnimationFrame(draw);
      
  //        if(leftPointer==furthestLeftPoint){
  //           leftPointer = SCROLLER_LENGTH + 1;
  //        }
      
  //        drawMessage(myMessage, leftPointer);
  //        leftPointer--;     
        
  //   }, 1000 / fps);
  // }

  function draw() {
    setTimeout(function() {
      useAnimationFrame(draw);
      
         if(leftPointer==furthestLeftPoint){
            leftPointer = SCROLLER_LENGTH + 1;
         }
      
         drawMessage(myMessage, leftPointer);
         leftPointer--;     
        
    }, 1000 / fps);
  }

  function drawMessage(messageArray, leftPointer) {
    const messageLength = messageArray.length;
    const totalScrollLength = SCROLLER_LENGTH + messageLength;
    

    if(messageLength > 0){
      LedLightBoard = [];
      for(var col=0; col < messageLength; col++) {
        for(var row=0; row < HEIGHT; row++) {
          var offsetCol = leftPointer + col;
          
          if(offsetCol < SCROLLER_LENGTH || offsetCol >= 0){
            setLight(row, offsetCol, messageArray[col][row]);
          }   
        }
      }
    }
  }

  // function setLight(row, col, state){
  //   var theLight = $('.'+row+'_'+col);
    
  //   if (theLight.hasClass('on') && !state){
  //     theLight.removeClass('on');
  //     theLight.addClass('off');
  //   } else if(theLight.hasClass('off') && state){
  //     theLight.removeClass('off');
  //     theLight.addClass('on');
  //   }
  // }

  function setLight(row, col, state){
    if (!state) {
      LedLightBoard.push(<BoxAll {...light} {...off}></BoxAll>);
      return;
    }

    LedLightBoard.push(<BoxAll{...light} {...off}></BoxAll>)
  }

  function createLedBoard() {
    let rows = 5;
    let columns = 60;
    const ledDivs = [];

    for (let i = 0; i < SCROLLER_LENGTH; i++) {
      for (let k = 0; k < HEIGHT; k++) {
        ledDivs.push(
          <BoxAll className={`${i}_${k} light off`}></BoxAll>
        )
      }
    }

    return ledDivs;
  }


  return (
    <BoxAll
      id="wrapper"
      width="420px"
      margin="50px auto"
    >
      <BoxAll
        id="theMarquee"
        height="55px"
        background="linear-gradient(0deg, #111, #222)"
        box-shadow="
          0px 0px 2px 0px #aaa inset,
          0px -1px 2px 0px #aaa inset,
          2px -5px 5px 0px #111 inset,
          0px -5px 5px 0px #111 inset,
          2px 5px 5px 0px #111"
        border-radius="5px"
      >
        {LedLightBoard}
      </BoxAll>
    </BoxAll>
  )
}

export default LedMarquee;