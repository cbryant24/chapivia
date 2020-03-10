# Components

---

## Carousel

### Carousel Types

Used to specifiy the type of carousel to display by using the `type` prop

- `infinite`

#### Infinite

##### Instructions

The inifinte carousel will infinitely scroll multiple React or Styled-React components when and adjusts according to screen width. It takes the following props to set max display amounts of carousels and at what pixel breakpoint an item should appear accroding to screen width and the initial carousel item.

`carouselCount`: Takes a positive integer for Maximum number or carousel items that the screen should ever display if not set defaults to maximum alloted by screen size
`initialSlide`: integer representing which carousel item provided the carousel should begin foucs on
`bp`: The pixel value for carousel size to be displayed on screen i.e. if `bp={100}` and screen width is 1000px ten carousel items will be displayed on screen
`maxItems`: Integer specifiying how many items to display at one time if not set is set to the number elements provided for the carousel
`carouselStyle`: This provides styling to container for the carousel using the library [styled-react](https://github.com/cbryant24/styled-react) provide an object of camelCase css properties or if using a theme the corresponding theme named passed to the `ThemeProvider`
`carouselItemStyle`: This provides styling to container for the carousel item using the library [styled-react](https://github.com/cbryant24/styled-react) provide an object of camelCase css properties or if using a theme the corresponding theme named passed to the `ThemeProvider`
`carouselIndicator`: Boolen indicating whether a clickable caorusel indicator should be displayed [see here for more info](#carousel-indicator)

###### initial slide

To set the intial slide provide the prop `initialSlide` to the Carousel component

```javascript
<Carousel initialSlide={1}>
  <p>Hello</p>
  <p>World</p>
</Carousel>
```

or add `initialSlide` to the Carousel item to be displayed initially

```javascript
<Carousel>
  <p initialSlide>Hello</p>
  <p>World</p>
</Carousel>
```

#### Carousel Indicator

To include a carousel indicator pass the `true` to the carouselIndicator prop in the `<InfiniteCarousel>` component.
The text to be displayed when the indicator is hovered can be passed as the prop `indicatorDisplayName`

```javascript
<InfiniteCarousel>
  <Div indicatorDisplayName="Item 1">Item One</Div>
  <Div>Item Two</Div>
</InfiniteCarousel>
```

To style the carousel indicator use the `carouselIndicatorStyle` property
