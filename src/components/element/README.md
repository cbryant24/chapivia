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


##Animations

### Custom Animations

A function `keyframes` is made available to create custom animations. To create a custom animation pass the created keyframes animation to Animated component in the appropriate places where keyframes are expected.


##Psuedo Classes

Psuedo classes can be added to elements using `psuedoClass` prop to the element and passing an object with valid css style properties and selectors. The `pre` property to set the selector(s) if using multiple selectors provide an array. To specifiy an element to select with the  To use a specific selector use the `custom` property and provide only the property `type` with the custom css selector, along with the styling like normal.

| Selector      |    Example                                 |  Output |
| ------------- |:-------------:                             | -----:   |
| &             | `psuedo={{ pre: '&', type: 'hover', color: 'red.1'}}`     | `&:hover { color: #FF0000 }` |
| ,             | `psuedo={{ pre: ['div', ',', 'p'], fontSize: {3} }}` |  `div:hover, p:hover { font-size: 1.6em }` |
| >             | `psuedo={{ pre: ['div', '>', 'p'], type: 'focus', color: 'red.1'}}`     |    `` |

```javascript
  psuedo={{
    type: String,
    pre: String['&', 'element', 'id'] || Array['&', '~', '+', '*'],
    element: String['a', 'p','h1'],
    additionalSelector: String['element', '#id', '.class'],
  }}
```