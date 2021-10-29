import { graphql, useStaticQuery } from "gatsby";

type Data = {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteTitleAlt: string;
      siteHeadline: string;
      siteUrl: string;
      siteDescription: string;
      siteLanguage: string;
      siteImage: string;
      author: string;
      [key: string]: unknown;
    };
  };
};

export const useSiteMetadata = (): Data["site"]["siteMetadata"] => {
  const data = useStaticQuery<Data>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteLanguage
          siteImage
          author
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
