## Basics
Importing a styled-system component to display wrap the component in curly braces to render

```Javascript
export const StyledFlex = (
  <Flex
    width="75%"
    maxHeight="75"
  />
)

import StyledFlex from './StyledFlex'

return (
  <div>
    {StyledFlex}
  </div>
)
```

### Setting HTML Elements
To set an Component as a specific HTML element use the `forwardedAs` prop on the component 

```Javascript <Box forwadedAs="span"> I'm a span element now</Box>```

## Adding Props
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
      delay_in: 5,
      in: FadeAnimations.FadeInBottom,
      duration_in: 1,
      continuous: RotateAnimations.RotateCenter,
      duration_continuous: 1,
      out: FadeAnimations.FadeOutTop,
      duration_out: 1,
      delay_between: 5
    }}
  >
    I'm animating
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
  <BoxPseudo
    pseudo
    before={{
      color: 'blue.1'
      fontSize: [1, 2],
      animation: {
        in: keyframes,
        duration_in: 5,
        delay_in: 5
      }
    }}
  >
    I'm Pseudo Animation
  </BoxPseudo>
```

## Transitions

Transitions can be added for the following states `hover, focus, & active` you can add a transition by either adding the pseudo class as instructed to here (TODO ADD A REFERENCE LINK BACK TO THE PSEUDO SECTION) then define the transition in the `transition` property

```javascript
<BoxPseudo
  pseudo
  hover={ { fontSize: [4] } }
  transition="font-size 4s linear"
>
  I will transition on hover
<BoxPseudo>
```

## Modal

To use a styled-react-modal import both the `ModalProvider, Modal` components. Set the `<ModalProvider></ModalProvider>` at the level you want to render the modal. 

```javascript
import { ModalProvider, Modal } from 'react-styled-everything';


<ModalProvider BackgroundComponent={ModalBackground}>
  <div style={{ position: 'relative' }}>
    <App>
    </App>
  </div>
</ModalProvider>


function ModalDemo(props) {

  return (
      <Modal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Box color="#ffffff">I am a modal!</Box>
        <Box color="#FF0000">I am another box in the modal</Box>
        <button onClick={toggleModal}>Close Me</button>
      </Modal>
  ) 
}
```

| Property          | Type     | Description                                                                                                                                     |
|-------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| isOpen            | Boolean  | A boolean that indicates whether the modal is to be open or closed.                                                                             |
| onBackgroundClick | Function |  A function that is called when the modal background is clicked.                                                                                |
| onEscapeKeydown   | Function | A function that is called when the escape key is pressed while the modal is open.                                                               |
| backgroundProps   | Object   | A props object that is spread over the backgroundComponent when included.                                                                       |
| allowScroll       | Boolean  | When true, scrolling in the document body is not disabled when the modal is open.                                                               |
| beforeOpen        | Function | A function that is called before the modal opens. If this function returns a promise, then the modal is opened after the promise is resolved.   |
| afterOpen         | Function | A function that is called after the modal opens.                                                                                                |
| beforeClose       | Function | A function that is called before the modal closes. If this function returns a promise,  then the modal is closed after the promise is resolved. |
| afterClose        | Function |  A function that is called after the modal closes.                                                                                              |

The `BackgroundComponent` Takes a component that will be rendered as the background for this level modal if one is not provided the default `BackgroundComponent` will be used. 

```javascript
<BoxPosition 
  display='flex'
  position='fixed'
  top="0"
  left="0"
  width='100vw'
  height='100vh'
  zIndex="30"
  backgroundColor='rgba(0, 0, 0, 0.5)'
  alignItems='center'
  justifyContent='center'
/>

```