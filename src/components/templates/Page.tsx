/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Layout } from '../ui/Layout';
import { Seo } from '../ui/Seo';

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

export const PageTemplate: React.FC<PageProps<DataProps>> = ({ data: { page }, location }) => (
  <Layout color={page.color || undefined}>
    <Seo
      title={page.title}
      description={page.excerpt}
      pathname={location.pathname}
      image={page.cover.childImageSharp.resize.src}
    />
    <div
      sx={{
        variant: page.custom ? `content.custom` : `content.page`,
      }}
      data-testid="page-content"
    >
      <MDXRenderer>{page.body}</MDXRenderer>
    </div>
  </Layout>
);
