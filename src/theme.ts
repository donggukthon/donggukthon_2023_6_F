import {DefaultTheme} from 'styled-components';
import 'styled-components';

declare module 'styled-components' {
  export type DefaultThemeColorKey = 'black' | 'white';

  export interface DefaultTheme {
    colors: {
      [key in DefaultThemeColorKey]: string;
    };
  }
}

const colors = {
  black: '#000000',
  white: '#FFFFFF',
};
const theme: DefaultTheme = {
  colors,
};
export default theme;
