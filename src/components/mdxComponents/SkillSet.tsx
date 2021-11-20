/** @jsx jsx */
import { jsx, Grid, Heading } from 'theme-ui';
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const SkillSet: React.VFC = () => (
  <div>
    <Heading variant="h4" mb={2}>
      言語
    </Heading>
    <Grid gap={4} mb={4} columns={[12, null, 4]}>
      <StaticImage
        loading="lazy"
        src="../../assets/javascript.svg"
        alt="JavaScript"
        objectFit="contain"
      />
      <StaticImage
        loading="lazy"
        src="../../assets/typescript.svg"
        alt="TypeScript"
        objectFit="contain"
      />
      <StaticImage loading="lazy" src="../../assets/go.svg" alt="Go" objectFit="contain" />
    </Grid>
    <Heading variant="h4" mb={2}>
      フレームワーク
    </Heading>
    <Grid gap={4} mb={4} columns={[12, null, 4]}>
      <StaticImage loading="lazy" src="../../assets/react.svg" alt="React" objectFit="contain" />
      <StaticImage loading="lazy" src="../../assets/redux.svg" alt="Redux" objectFit="contain" />
    </Grid>
    <Heading variant="h4" mb={2}>
      クラウド
    </Heading>
    <Grid gap={4} mb={4} columns={[12, null, 4]}>
      <StaticImage loading="lazy" src="../../assets/aws.svg" alt="AWS" objectFit="contain" />
    </Grid>
    <Heading variant="h4" mb={2}>
      SaaS/PaaS
    </Heading>
    <Grid gap={4} mb={4} columns={[12, null, 4]}>
      <StaticImage loading="lazy" src="../../assets/github.svg" alt="GitHub" objectFit="contain" />
      <StaticImage loading="lazy" src="../../assets/sentry.svg" alt="Sentry" objectFit="contain" />
      <StaticImage
        loading="lazy"
        src="../../assets/datadog.svg"
        alt="DataDog"
        objectFit="contain"
      />
    </Grid>
  </div>
);
