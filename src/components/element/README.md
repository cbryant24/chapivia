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

## Animations

### Custom Animations

A function `keyframes` is made available to create custom animations. To create a custom animation pass the created keyframes animation to Animated component in the appropriate places where keyframes are expected.

## Psuedo Classes
The pseudo classes `active, active, focus, hover, lang, link, visited` can be used to further style elments. To do so include the keyword `pseudo` and pass the an object using the appropriate pseudo name to style.

```javascript
  <Box
    pseudo
    hover={{ fontSize: [1, 2], color: 'blue.1'}}
  >
    I am a pseudo element
  </Box>
```

```javascript
  psuedo={{
    type: String,
    pre: String['&', 'element', 'id'] || Array['&', '~', '+', '*'],
    element: String['a', 'p','h1'],
    additionalSelector: String['element', '#id', '.class'],
  }}
```