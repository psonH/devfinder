import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  fontColor: "#2d2926",
  backgroundColor: "rgba(255, 253, 248, 0.55)",
  containerBackgroundColor: "rgba(245, 240, 230, 0.5)",
  bodyGradient: "linear-gradient(135deg, #faf7f0 0%, #ede8de 100%)",
  scrollbarThumb: "rgba(180, 160, 130, 0.5)",
  scrollbarTrack: "rgba(255, 250, 240, 0.3)",
  glowColor: "rgba(180, 155, 110, 0.6)",
  skeletonBase: "#e8e0d0",
  skeletonHighlight: "#f5f0e6",
};

export const darkTheme = {
  fontColor: "#e0ddd8",
  backgroundColor: "rgba(32, 32, 34, 0.55)",
  containerBackgroundColor: "rgba(44, 44, 48, 0.55)",
  bodyGradient: "linear-gradient(135deg, #1a1a1c 0%, #242428 50%, #1e1e20 100%)",
  scrollbarThumb: "rgba(110, 110, 118, 0.6)",
  scrollbarTrack: "rgba(0, 0, 0, 0.25)",
  glowColor: "rgba(150, 145, 135, 0.6)",
  skeletonBase: "#2e2e32",
  skeletonHighlight: "#3a3a40",
};

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.bodyGradient};
    font-family: 'Source Code Pro', monospace;
    min-height: 100vh;
    transition: background 0.5s ease;
  }

  p, a, span {
    font-size: clamp(13px, 80%, 22px);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    opacity: 0.8;
  }
`;

export default GlobalStyles;
