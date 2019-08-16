##Basics
Importing a styled-system component to display wrap the component in curly braces to render

export const StyledFlex = (
  <Flex
    width="75%"
    maxHeight="75"
  />
)

import StyledFlex from './StyledFlex

return (
  <div>
    {StyledFlex}
  </div>
)

##Adding Props
If props need to be added to a passed styled-system component a helper function can be imported and used

export const Input = (
  <Input
    width="45%"
    color="#ffffff"
  />
)

import { addProps } from 'react-styled-everything;
import { Input } from './Input';

export default Form = (props) => {
  const InputPassword = addProps(Input, { type: 'password'});

  return (
    <div>
      {InputPassword}
    </div>
  )
}

Adding props to multiple elements can be done by passing an array of styled-system Components

import { Input } from './Input';


export default Form = (props) => {
  const InputPassword = addProps([Input, Input], { type: 'text'});

  return (
    <div>
      {InputPassword}
    </div>
  )
}

Adding props to multiple elements with varying props can be done by passing an array of styled-system Components and an array of props. Note that the props applied to each is done in a one to one application

import { Input } from './Input';


export default Form = (props) => {
  const InputPassword = addProps([Input, Input], [{ type: 'text'}, { type: 'password'}]);

  return (
    <div>
      {InputPassword}
    </div>
  )
}

##Input

| Props              | CSS Style                | Value      |
|--------------------|:------------------------:|:-----------|
| placeHolderColor     ::placeholder -> {color}   [rgba, hex]|
| focusOutline         :focus { outline }         string     |
| focusBorderColor     :focus { boder }           string     |
| focusBoxShadow       :focus { box-shadow }      string     |

## Animations/Transitions

Use the `Animated` component that is exported to add animations to an element. To define the animations provide an object to the animations props. 

`animation_fill_mode` property accepts `none | forwards | backwards | both | initial | inherit;` if none is provided the default value `none` will be used.

`animation_timing_function` property accepts `linear | ease | ease-in | ease-out | ease-in-out | step-start | step-end | steps(int, start|end) | cubic-bezier(n,n,n,n) | initial | inherit` if none is provided the default value of `ease` will be used.

`animation_direction` property accepts `normal | reverse | alternate | alternate-reverse | initial | inherit ` if none is provided the default value of `normal` will be used.

| Animation Property | Description                                                                                                                                                                                                                                                                                       | value    | output                                                                                                                                                                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| delay_in           | receives integer greater than 0 to delay the in <br> animation                                                                                                                                                                                                                                    | integer  | ```javascript animation={delay_in: 5} ```                                                                                                                                                                                                                      |
| in                 | receives keyframe animation from either provided <br>  animation or animation created using `keyframe` <br> and is run after the `delay_in`                                                                                                                                                       | keyframe | ```javascript animation={ in: FadeAnimations.FadeIn} ``` ```javascriptimport {keyframes} from 'react-styled-everything' var customAnimation = keyframes`0% { opacity: 0.1; },100% { opacity: 1; }` animation={in: customAnimation }```                         |
| continuous         | Receives keyframe animation from either provided <br> animation or animation created using `keyframe` <br> this animation is used for a continuous animation <br> and is run after `in` and before `out` animation <br> if provided otherwise this animation can be used <br> to run continuously | keyframe | ```javascript animation={continuous: FadeAnimations.FadeInFadeOut} ``` ```javascript import {keyframes} from 'react-styled-everything'  var customAnimation = keyframes`0% { opacity: 0.9; },50% { opacity: 1; }` animation={continuous: customAnimation } ``` |
| duration_continous | Receives an integer greater than 0 and sets how <br> the continuous animation will run                                                                                                                                                                                                            | Integer  | ```javascript animation{ duration_continuous: 5 } ```                                                                                                                                                                                                          |
| out                | Receives keyframe animation from either provided <br> animation or animation created using `keyframe` <br> this animation is used for exiting the element <br>                                                                                                                                    | keyframe | ```javascript animation={out: FadeAnimations.Fadeout} ``` ```javascript import {keyframes} from 'react-styled-everything' var customAnimation = keyframes`0% { opacity: 1;}, 100% { opacity: 0%; }` animation={out: customAnimation} ```                       |
| duration_out       | Receives an integer greater than 0 and sets how <br> the out animation will take to exit                                                                                                                                                                                                          | integer  | ```javascript animation={duration_out: 5} ```                                                                                                                                                                                                                  |
| delay_between      | Receives an integer greater than 0 and sets how <br> much time between the `in` animation and `out` animation                                                                                                                                                                                     | integer  | ```javascript animation={delay_between: 10} ```                                                                                                                                                                                                                |
| iteration          | Receives and integer greater than 0 or will be set to <br> `infinite` and determines the number of animation iterations                                                                                                                                                                           | integer  | ```javascript animation={iteration: 20} ```                                                                                                                                                                                                                    |

```javascript
  <Animated
    animations={{
      
    }}
  >
  
  </Animated>
```

### Custom Animations

A function `keyframes` is made available to create custom animations. To create a custom animation pass the created keyframes animation to Animated component in the appropriate places where keyframes are expected.

## Psuedo Classes/Elements
The pseudo classes `active, focus, hover, lang, link, visited` and pseudo elements `after, before, first-letter, first-line, selection` can be used to further style elments. Include the keyword `pseudo` and pass an object using the appropriate pseudo name to style. 

```javascript
  <Box
    pseudo
    hover={{ fontSize: [1, 2], color: 'blue.1'}}
  >
    I am a pseudo element
  </Box>
```

Pseudo element animations are not able to hook into the themimng, and therefore can't take advantage of the array repsonsive design. A function that returns the window size is exported that will allow you to get the window size and update the animations is available as an alternativet

```javascript 
  import { useWindowSize, keyframes } from 'react-styled-everything'

  var keyframes = windowSize >= '320px' ? 
  keyframes`
    0% { font-size: 16px; }
    100% { font-size: 24px; }
  ` :
  keyframes`
    0% { font-size: 18px: }
    100% { font-size: 26px; }
  `
  var 
  const pseudoElementAnimations = {

  }
```
