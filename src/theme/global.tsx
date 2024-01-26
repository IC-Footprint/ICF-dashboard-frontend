import { css, Global } from '@emotion/react';

import { primary } from '@/theme/colors';
import '@/theme/fonts.css';

export const globalStyles = (
  <Global
    styles={css`
      :root {
        --primary-color: ${primary};
      }

      * {
        font-family: 'Inter', sans-serif;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--surface-ground);
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin: 0;
      }

      h1,
      h2,
      h3 {
        color: var(--primary-color);
      }

      h1 {
        font-weight: 400;
        font-size: 2.25rem;
        line-height: 2.625rem;
      }

      h3 {
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 2.25rem;
      }

      h4 {
        font-weight: 700;
        font-size: 1.3125rem;
        line-height: 1.5625rem;
      }

      h5 {
        font-weight: 700;
        font-size: 1.125rem;
        line-height: 1.3125rem;
      }

      .p-component {
        font-size: 0.875rem;
      }

      .twitter-timeline iframe {
        border-radius: 0.75rem;
      }
    `}
  />
);
