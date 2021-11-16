/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { PageProps } from 'gatsby';
import { IGatsbyImageData, GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../ui/Layout';
import { GridItem } from '../ui/GridItem';
import { itemListWrapperStyles, itemStyles } from '../../styles/item-list';
import { locales } from '../../constants/locales';
import { visuallyHidden } from '../../styles/utils';

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

export const HomepageTemplate: React.FC<PageProps<DataProps>> = ({ data: { pages } }) => {
  const pageItems = pages.nodes;

  return (
    <Layout>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className="item-list-wrapper" sx={itemListWrapperStyles}>
        <div className={`item-list div${pageItems.length + 1}`}>
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
          <GridItem to="/project-list" className="item" sx={itemStyles} data-testid="projects">
            <StaticImage
              loading="lazy"
              src="../../assets/images/projects.jpg"
              alt="projects"
              width={1200}
            />
            <span>projects</span>
          </GridItem>
        </div>
      </div>
    </Layout>
  );
};
