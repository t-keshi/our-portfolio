/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { PageProps } from 'gatsby';
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../ui/Layout';
import { Seo } from '../ui/Seo';
import { GridItem } from '../ui/GridItem';
import { locales } from '../../constants/locales';
import { visuallyHidden } from '../../styles/utils';

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

export const ProjectsTemplate: React.FC<PageProps<DataProps>> = ({
  data: { projects },
  location,
}) => (
  <Layout>
    <Seo title="Projects" pathname={location.pathname} />
    <h1 sx={visuallyHidden} data-testid="page-title">
      {locales.projects}
    </h1>
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr 1fr'],
        gridAutoRows: '50vw',
      }}
    >
      {projects.nodes.length > 0 ? (
        projects.nodes.map((project) => (
          <GridItem to={project.slug} key={project.slug} data-testid={project.shortTitle}>
            <GatsbyImage
              image={project.cover.childImageSharp.gatsbyImageData}
              alt={project.shortTitle}
            />
            <span>{project.shortTitle}</span>
          </GridItem>
        ))
      ) : (
        <div sx={{ padding: 3 }}>
          No projects found at the location defined for &rdquo;.projectsPath&rdquo;.
        </div>
      )}
    </div>
  </Layout>
);
