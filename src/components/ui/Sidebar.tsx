/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
import { readableColor } from 'polished';
import { StaticImage } from 'gatsby-plugin-image';
import { useTheme } from '../theme/theme';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useNavigationItems } from '../../hooks/useNavigationItems';
import { Navigation } from './Navigation';

type SidebarProps = { bg: string };

export const Sidebar: React.VFC<SidebarProps> = ({ bg }) => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useNavigationItems();
  const {
    theme: { sidebar },
  } = useTheme();

  return (
    <header
      sx={{
        p: [3, 3, 4],
        width: ['100%', '100%', '100%', sidebar.normal, sidebar.wide],
        backgroundColor: bg,
        position: ['relative', 'relative', 'relative', 'fixed'],
        height: '100%',
        display: 'flex',
        flexDirection: ['row', 'row', 'row', 'column'],
        alignItems: ['center', 'center', 'center', 'flex-start'],
        justifyContent: ['space-between', 'space-between', 'space-between', 'flex-start'],
        svg: {
          fill: readableColor(bg),
        },
        variant: 'sidebar',
      }}
      data-testid="sidebar"
    >
      <Link
        to={basePath}
        aria-label={`${siteTitle}, Back to Home`}
        sx={{ width: ['3rem', '4rem', '4.5rem', '5rem'] }}
      >
        <StaticImage
          src="../../assets/images/logo.png"
          width={300}
          quality={95}
          formats={['auto', 'webp', 'avif']}
          alt="logo"
        />
      </Link>
      <div sx={{ py: 4, display: ['none', 'none', 'none', 'block'] }} />
      <Navigation bg={bg} />
    </header>
  );
};
