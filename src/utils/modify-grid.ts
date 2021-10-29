import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface IGridItem {
  slug: string;
  title: string;
  isProjectTop?: boolean;
  cover: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  __typename: 'MdxProject' | 'MdxPage';
}

const defaultResolver = (data: IGridItem[]): IGridItem[] => data;

export const modifyGrid = (data: IGridItem[], resolver = defaultResolver): IGridItem[] =>
  resolver(data);
