module.exports = {
  siteMetadata: {
    siteTitle: 'Takeshi Inoue',
    siteTitleAlt: 'Takeshi portfolio',
    siteHeadline: 'Takeshi portfolio',
    siteUrl: 'https://t-keshi-web-developer.co.jp',
    siteDescription: 'web developer. 28yo. I love React.',
    siteLanguage: 'ja',
    siteImage: '/src/assets/images/logo.jpg',
    author: 'Takeshi Inoue',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: false,
        preconnect: ['https://fonts.gstatic.com'],
        interval: 300,
        timeout: 30000,
        web: [
          {
            name: 'Work Sans',
            file: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400..700&display=swap',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'our-portfolio/t-keshi',
        short_name: 'our-portfolio',
        description: 'web developer. 28yo. I love React',
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        reportFilename: '_bundle.html',
        openAnalyzer: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content/projects',
        path: 'content/projects',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content/pages',
        path: 'content/pages',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        lessBabel: true,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
    },
  ],
};
