import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../components/theme/theme';
import { ProjectTemplate } from '../components/templates/Project';

export const query = graphql`
  query ($slug: String, $formatString: String, $relativeDirectory: String) {
    project(slug: { eq: $slug }) {
      body
      excerpt
      color
      date(formatString: $formatString)
      slug
      title
      shortTitle
      category
      cover {
        childImageSharp {
          resize(width: 1200, quality: 85) {
            src
          }
        }
      }
    }
    images: allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 1600, quality: 90)
        }
      }
    }
  }
`;

type DataProps = {
  project: {
    body: string;
    excerpt: string;
    color: string;
    date: string;
    slug: string;
    title: string;
    shortTitle: string;
    category: string;
    cover: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
  images: {
    nodes: {
      name: string;
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    }[];
  };
};

const Project: React.VFC<PageProps<DataProps>> = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <ProjectTemplate {...props}>{children}</ProjectTemplate>
  </ThemeProvider>
);

export default Project;
