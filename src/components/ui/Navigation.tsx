/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
import { readableColor } from 'polished';
import { replaceSlashes } from '../../utils/replace-slashes';
import { useNavigationItems } from '../../hooks/useNavigationItems';

interface Props {
  bg: string;
}

export const Navigation: React.VFC<Props> = ({ bg }) => {
  const { navigation, basePath } = useNavigationItems();

  return (
    <nav
      aria-label="Primary Navigation"
      sx={{
        a: {
          color: readableColor(bg),
          textDecoration: `none`,
          fontSize: [1, 2, 2, 3],
          marginLeft: [2, 3, 3, 0],
          '&:hover,&:focus': {
            color: readableColor(bg, `primary`, `primaryLight`, false),
          },
        },
        ul: {
          margin: 0,
          padding: 0,
          li: {
            listStyle: `none`,
            display: [`inline-block`, `inline-block`, `inline-block`, `block`],
          },
        },
        variant: `navigation`,
      }}
    >
      <ul>
        {navigation.map((navItem) => (
          <li key={navItem.slug}>
            <Link to={replaceSlashes(`/${basePath}/${navItem.slug}`)}>{navItem.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
