/** @jsx jsx */
import { jsx, Link } from 'theme-ui';
import React from 'react';
import { readableColor } from 'polished';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useTheme } from '../theme/theme';

interface Props {
  bg: string;
}

export const Footer: React.VFC<Props> = ({ bg }) => {
  const { siteTitle } = useSiteMetadata();
  const {
    theme: { sidebar, rawColors },
  } = useTheme();

  const text = readableColor(bg, rawColors.textMuted, rawColors.textMutedLight);

  return (
    <footer
      sx={{
        position: [`relative`, `relative`, `relative`, `fixed`],
        width: [`100%`, `100%`, `100%`, sidebar?.normal ?? 0, sidebar?.wide ?? 0],
        bottom: 0,
        color: text,
        fontSize: 0,
        p: [3, 3, 4],
        background: bg,
        a: {
          color: readableColor(bg),
          '&:hover,&:focus': {
            color: readableColor(bg, `primary`, `primaryLight`, false),
          },
        },
        variant: `footer`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {siteTitle}.
      </div>
    </footer>
  );
};
