/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useLayoutEffect, useState } from 'react';
import { visuallyHidden } from '../../styles/utils';

const triggerCss = {
  ...visuallyHidden,
  position: 'fixed',
  zIndex: 9999999,
  top: 4,
  left: 4,
  padding: 4,
  borderRadius: 'default',
  background: 'white',
  color: 'text',
  textDecoration: 'none',
  boxShadow: 'lg',
  '&:focus': {
    width: 'auto',
    height: 'auto',
    clip: 'auto',
  },
  variant: 'skip-nav',
} as const;

export type SkipNavProps = {
  children?: React.ReactNode;
  targetId?: string;
};

const SKIP_TARGET_ID = 'skip-here';

export const SkipNavTrigger: React.VFC<SkipNavProps> = ({
  children = 'Skip to content',
  targetId = SKIP_TARGET_ID,
}) => {
  const [hasAValidTarget, setHasAValidTarget] = useState<boolean>(false);

  useLayoutEffect(() => {
    const target = document.getElementById(targetId);

    if (!!target !== hasAValidTarget) {
      setHasAValidTarget(!!target);
    }
  }, [targetId, hasAValidTarget]);

  if (!hasAValidTarget) {
    return null;
  }

  return (
    <a href={`#${targetId}`} sx={triggerCss}>
      {children}
    </a>
  );
};

export type SkipNavTargetProps = {
  targetId?: string;
};

export const SkipNavTarget: React.VFC<SkipNavTargetProps> = ({ targetId = SKIP_TARGET_ID }) => (
  <div id={targetId} style={{ contain: 'none' }} />
);
