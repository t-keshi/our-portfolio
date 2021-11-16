import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../components/theme/theme';
import { HomepageTemplate } from '../components/templates/Homepage';

export const query = graphql`
  query {
    pages: allPage(sort: { fields: displayOrder, order: ASC }) {
      nodes {
        slug
        title
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
        }
      }
    }
  }
`;

type DataProps = {
  pages: {
    nodes: {
      slug: string;
      title: string;
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      __typename: 'MdxPage';
    }[];
  };
};

const Homepage: React.FC<PageProps<DataProps>> = (props) => (
  <ThemeProvider theme={theme}>
    <HomepageTemplate {...props} />
  </ThemeProvider>
);

export default Homepage;
