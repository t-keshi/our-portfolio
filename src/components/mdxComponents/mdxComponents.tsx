import { MDXProviderComponentsProp, MDXProviderProps } from '@mdx-js/react';
import { MyYearsOld } from './MyYearsOld';
import { SkillSet } from './SkillSet';

export const mdxComponents: MDXProviderProps['components'] = {
  MyYearsOld,
  SkillSet,
  // // eslint-disable-next-line react/jsx-props-no-spreading
  // h2: ({ children }): React.ReactElement => <p className="paragraph">{children}</p>,
};
