import { graphql, useStaticQuery } from 'gatsby';

type Data = {
  portfolioConfig: {
    projectsPrefix: string;
    basePath: string;
    formatString: string;
    navigation: {
      name: string;
      slug: string;
    }[];
    pagesPath: string;
    projectsPath: string;
    projectsUrl: string;
  };
};

export const useNavigationItems = (): Data['portfolioConfig'] => {
  const data = useStaticQuery<Data>(graphql`
    query {
      portfolioConfig {
        projectsPrefix
        basePath
        formatString
        navigation {
          name
          slug
        }
        pagesPath
        projectsPath
        projectsUrl
      }
    }
  `);

  return data.portfolioConfig;
};
