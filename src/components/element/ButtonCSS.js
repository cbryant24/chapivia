import { css } from 'styled-components';
import { maxHeight } from 'styled-system';
import theme, { cx, hexa } from './theme'

export const button = css`
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  font-weight: ${props => props.theme.bold};
  font-size: ${theme.remSizes[18]}rem;
  line-height: 1.125;
  padding: 0 ${theme.remSizes[10]}rem;
  appearance: none;
  cursor: pointer;
  color:${ props => props.color || theme.colors.primary };
  transition: ${props => props.theme.transition} box-shadow;
  box-shadow: 0 2px 4px ${props => props.theme.shadowColor};
  border-radius: ${props => props.theme.radius && props.borderRadius};
  border-width: ${props => props.borderWidth || 0};
  border-color: ${theme.colors.primary};
  border-style: solid;
  ${props =>
    props.inverted && {
      backgroundColor: cx(props.color),
      color: cx(props.bg)
    }};
  &:hover, &:focus {
    outline: 0;
    cursor: pointer;
    box-shadow: 0 2px 6px ${props =>
      props.inverted ? props.theme.shadowColor : hexa(props.bg, 0.25)};
  }
  &:active {
    outline: 0;
    box-shadow: 0 2px 8px 2px ${props =>
      props.inverted ? props.theme.shadowColor : hexa(props.bg, 0.25)};
  }
  ${props => props.disabled && { opacity: 0.25, cursor: 'not-allowed' }};
  ${props =>
    props.scale &&
    css`
      transition: ${props => props.theme.transition} all;
      will-change: transform;
      transform: scale(1);
      &:hover,
      &:focus {
        transform: scale(${props => props.theme.scaleFactor});
      }
      ${props => props.theme.mediaQueries.reduceMotion} {
        transform: none !important;
      }
    `};
  ${props =>
    props.chevronLeft &&
    css`
      &:before {
        content: '« ';
      }
    `};
  ${props =>
    props.chevronRight &&
    css`
      &:after {
        content: ' »';
      }
    `};
`

export const outlineButton = css`
  box-shadow: none !important;
  background-color: transparent !important;
  color: ${props => cx(props.color)};
  border-width: 2px;
  border-style: solid;
  ${maxHeight}
`