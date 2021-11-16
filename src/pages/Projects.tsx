import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../components/theme/theme';
import { ProjectsTemplate } from '../components/templates/Projects';

export const query = graphql`
  query {
    projects: allProject(sort: { fields: displayOrder, order: ASC }) {
      nodes {
        shortTitle
        slug
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
  projects: {
    nodes: {
      shortTitle: string;
      slug: string;
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    }[];
  };
};

const Projects: React.VFC<PageProps<DataProps>> = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <ProjectsTemplate {...props}>{children}</ProjectsTemplate>
  </ThemeProvider>
);

export default Projects;
