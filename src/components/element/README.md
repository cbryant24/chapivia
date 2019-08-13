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

| Animation Property | Description                                                                                                                                                                                                                                                                                       | value    | output                                                                                                                                                                                                                                                                                          |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| delay_in           | receives integer greater than 0 to delay the in <br> animation                                                                                                                                                                                                                                    | integer  | ```javascript<br> animation={delay_in: 5}<br> ```                                                                                                                                                                                                                                               |
| in                 | receives keyframe animation from either provided <br>  animation or animation created using `keyframe` <br> and is run after the `delay_in`                                                                                                                                                       | keyframe | ```javascript <br> animation={ in: FadeAnimations.FadeIn}<br> ```<br> ```javascriptimport <br> {keyframes} from 'react-styled-everything' <br> var customAnimation = keyframes`0% { opacity: 0.1; },100% { opacity: 1; }`<br> animation={in: customAnimation }```<br>                           |
| continuous         | Receives keyframe animation from either provided <br> animation or animation created using `keyframe` <br> this animation is used for a continuous animation <br> and is run after `in` and before `out` animation <br> if provided otherwise this animation can be used <br> to run continuously | keyframe | ```javascript <br> animation={continuous: FadeAnimations.FadeInFadeOut}<br> ``` <br> ```javascript <br> import {keyframes} from 'react-styled-everything' <br>  var customAnimation = keyframes`0% { opacity: 0.9; },50% { opacity: 1; }`<br> animation={continuous: customAnimation } <br> ``` |
| duration_continous | Receives an integer greater than 0 and sets how <br> the continuous animation will run                                                                                                                                                                                                            | Integer  | ```javascript<br> animation{ duration_continuous: 5 } <br> ```                                                                                                                                                                                                                                  |
| out                | Receives keyframe animation from either provided <br> animation or animation created using `keyframe` <br> this animation is used for exiting the element <br>                                                                                                                                    | keyframe | ```javascript <br> animation={out: FadeAnimations.Fadeout}<br> ``` ```javascript <br> import {keyframes} from 'react-styled-everything' <br> var customAnimation = keyframes`0% { opacity: 1;}, 100% { opacity: 0%; }`<br> animation={out: customAnimation}<br> ```                             |
| duration_out       | Receives an integer greater than 0 and sets how <br> the out animation will take to exit                                                                                                                                                                                                          | integer  | ```javascript<br> animation={duration_out: 5}<br> ```                                                                                                                                                                                                                                           |
| delay_between      | Receives an integer greater than 0 and sets how <br> much time between the `in` animation and `out` animation                                                                                                                                                                                     | integer  | ```javascript<br> animation={delay_between: 10}<br> ```                                                                                                                                                                                                                                         |
| iteration          | Receives and integer greater than 0 or will be set to <br> `infinite` and determines the number of animation iterations                                                                                                                                                                           | integer  | ```javascript<br> animation={iteration: 20}<br> ```                                                                                                                                                                                                                                             |

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
