import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from 'theme-ui';
import { PageTemplate } from '../components/templates/Page';
import { theme } from '../components/theme/theme';

export const query = graphql`
  query ($slug: String!) {
    page(slug: { eq: $slug }) {
      title
      slug
      excerpt
      body
      color
      custom
      cover {
        childImageSharp {
          resize(width: 1200, quality: 85) {
            src
          }
        }
      }
    }
  }
`;

type DataProps = {
  page: {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    color: string;
    custom: boolean;
    cover: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
};

const Page: React.VFC<PageProps<DataProps>> = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <PageTemplate {...props}>{children}</PageTemplate>
  </ThemeProvider>
);

export default Page;
