// declare module "theme-ui" {
//   interface Theme {
//     sidebar: SidebarTheme;
//   }
// }

const contentStyles = {
  px: [3, 3, 4, 5, 6],
  py: [3, 3, 4, 5, 5],
  maxWidth: `6xl`,
  margin: `0 auto`,
};

export const additionalTheme = {
  sidebar: {
    normal: "320px",
    wide: "375px",
  },
  content: {
    page: {
      ...contentStyles,
    },
    custom: {
      margin: 0,
      padding: 0,
    },
    project: {
      ...contentStyles,
    },
    imageList: {
      ...contentStyles,
      ".gatsby-image-wrapper:not(:last-child)": {
        marginBottom: 5,
      },
    },
  },
};
