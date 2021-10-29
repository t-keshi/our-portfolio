/* eslint-disable no-underscore-dangle */
import { IGridItem } from './modify-grid';

// Only return nodes with the type "MdxPage"
export const onlyPages = (data: IGridItem[]): IGridItem[] =>
  data.filter((p) => p.__typename === 'MdxPage');

// Only return nodes with the type "MdxProject"
export const onlyProjects = (data: IGridItem[]): IGridItem[] =>
  data.filter((p) => p.__typename === 'MdxProject');

// Only return nodes that match the slugs defined in the given array of slugs
export const filterBySlug = (data: IGridItem[], slugFilter: string[]): IGridItem[] =>
  data.filter((d) => slugFilter.includes(d.slug));

const random = (seed: number) => {
  // eslint-disable-next-line no-param-reassign
  const x = Math.sin(seed + 1) * 10000;

  return x - Math.floor(x);
};

export const shuffle = (originalData: IGridItem[], seed = 1): IGridItem[] => {
  const data = [...originalData];
  const m = data.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(random(seed) * m - 1);
    t = data[m];
    data[m] = data[i];
    data[i] = t;
    // eslint-disable-next-line no-param-reassign
    seed += 1;
  }

  return data;
};
