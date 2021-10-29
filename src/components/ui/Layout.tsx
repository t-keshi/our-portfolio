// /** @jsx jsx */
import { jsx } from 'theme-ui';
import { Global } from '@emotion/react';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { LayoutWrapper } from './LayoutWrapper';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Seo } from './Seo';
import { SkipNavTarget, SkipNavTrigger } from './SkipNav';
import { useTheme } from '../theme/theme';
import { mdxComponents } from '../mdxComponents/mdxComponents';

type LayoutProps = { children: React.ReactNode; color?: string };

export const Layout: React.VFC<LayoutProps> = ({ children, color = `white` }) => {
  const { theme } = useTheme();

  return (
    <MDXProvider components={mdxComponents}>
      <Global
        styles={{
          '*,*:after,*:before': {
            boxSizing: `border-box`,
          },
          html: {
            fontSize: `18px`,
            WebkitTextSizeAdjust: `100%`,
          },
          img: {
            borderStyle: `none`,
          },
          pre: {
            fontFamily: `monospace`,
            fontSize: `1em`,
          },
          '[hidden]': {
            display: `none`,
          },
          '::selection': {
            background: theme.colors.primary,
            color: theme.colors.white,
          },
          'ul > li > code, ol > li > code, p > code': {
            color: `#393A34`,
            background: `#f6f8fa`,
            padding: 2,
          },
          '@media(max-width: 600px)': {
            html: {
              fontSize: `16px`,
            },
          },
        }}
      />
      <Seo />
      <SkipNavTrigger />
      <LayoutWrapper>
        <Sidebar bg={color} />
        <main sx={{ gridColumnStart: [1, 1, 1, 2] }}>
          <SkipNavTarget />
          {children}
        </main>
        <Footer bg={color} />
      </LayoutWrapper>
    </MDXProvider>
  );
};
