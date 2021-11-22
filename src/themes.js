import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  fontColor: "#4c4c4c",
  backgroundColor: "#fefffe",
  containerBackgroundColor: "#b0d7ff",
};

export const darkTheme = {
  fontColor: "#e5e5e5",
  backgroundColor: "#4c4c4c",
  containerBackgroundColor: "#464071",
};

const GlobalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");

    body {
        background-color: ${({ theme }) => theme.backgroundColor};
        font-family: 'Source Code Pro', monospace;
    }
    p, a, span{
      font-size: clamp(15px, 80%, 24px);;
    }
`;

export default GlobalStyles;
