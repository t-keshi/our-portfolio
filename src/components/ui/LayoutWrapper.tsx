/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { useTheme } from '../theme/theme';

export const LayoutWrapper: React.FC = ({ children }) => {
  const {
    theme: { sidebar },
  } = useTheme();

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr', `${sidebar.normal} 1fr`, `${sidebar.wide} 1fr`],
      }}
    >
      {children}
    </div>
  );
};
