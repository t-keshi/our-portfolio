/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { PageProps } from 'gatsby';
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../ui/Layout';
import { GridItem } from '../ui/GridItem';
import { itemListWrapperStyles, itemStyles } from '../../styles/item-list';
import { locales } from '../../constants/locales';
import { visuallyHidden } from '../../styles/utils';

type DataProps = {
  projects: {
    nodes: {
      slug: string;
      title: string;
      isProjectTop: true;
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      __typename: 'MdxProject';
    }[];
  };
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

export const HomepageTemplate: React.FC<PageProps<DataProps>> = ({ data: { pages, projects } }) => {
  const pageItems = pages.nodes;
  const projectItems = projects.nodes;
  // const items = modifyGrid(rawItems);

  return (
    <Layout>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className="item-list-wrapper" sx={itemListWrapperStyles}>
        <div className={`item-list div${pageItems.length + projectItems.length}`}>
          {pageItems.length > 0 ? (
            pageItems.map((item, index) => (
              <GridItem
                to={item.slug}
                className="item"
                key={item.title}
                sx={itemStyles}
                data-testid={item.title}
              >
                <GatsbyImage
                  loading={index === 0 ? `eager` : `lazy`}
                  image={item.cover.childImageSharp.gatsbyImageData}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </GridItem>
            ))
          ) : (
            <div sx={{ padding: 3 }}>No pages found at the locations defined</div>
          )}
          {projectItems.length > 0 ? (
            projectItems.map((item) => (
              <GridItem
                to="/project-list"
                className="item"
                key={item.title}
                sx={itemStyles}
                data-testid={item.title}
              >
                <GatsbyImage
                  loading="lazy"
                  image={item.cover.childImageSharp.gatsbyImageData}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </GridItem>
            ))
          ) : (
            <div sx={{ padding: 3 }}>No projects found at the locations defined</div>
          )}
        </div>
      </div>
    </Layout>
  );
};
