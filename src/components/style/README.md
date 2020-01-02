# Bryant Development Documentation

## React Styling

This section describes how styling is done in react, describes how reusable components work, and themeing. React styling is done using [Styled-Components library](https://www.styled-components.com/) and [Styled-System](https://styled-system.com/) allowing for writing css styles in js directly on react components

### Theme

Themeing is used to create breakpoints for media queries and defining the array values used for various properties a list of which can be seen below.

#### Breakpoints

Breakpoints are set in pixels for ease of use in calculations when using the hook `useWindowSize` which returns the window size in pixels

### Style Helper Functions

`determineBreakPoint - function that takes the theme file as parameter and uses the window size to determine which pixel breakpoint`

## REUSABLE COMPONENTS

### Marquee

Each marquee item needs `width` in order for the element to be determined where it will be placed off screen if using
array theme for width provide theme to marquee as prop `theme`. Currently the width value must be a percentage.

### Carousel

Carousel component takes the following props 
