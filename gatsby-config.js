require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Dr. Gadget Chile',
    author: 'Víctor Tirreau',
    description:
      'En Dr. Gadget compramos tu equipo. ¡Únete a la economía circular!',
    siteUrl: 'https://retoma.drgadgetchile.cl',
  },
  // pathPrefix: '/gatsby-starter-ecommerce',
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        checkType: true,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-157077196-1`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Dr. Gadget Chile',
        short_name: 'Dr. Gadget',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icons: [
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/apple-touch-icon.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
          {
            src: `/favicons/favicon-16x16.png`,
            sizes: `16x16`,
            type: `image/png`,
          },
          {
            src: `/favicons/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
          {
            src: `/favicons/mstile-70x70.png`,
            sizes: `70x70`,
            type: `image/png`,
          },
          {
            src: `/favicons/mstile-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/favicons/mstile-150x150.png`,
            sizes: `150x150`,
            type: `image/png`,
          },
          {
            src: `/favicons/mstile-310x150.png`,
            sizes: `310x150`,
            type: `image/png`,
          },
          {
            src: `/favicons/mstile-310x310.png`,
            sizes: `310x310`,
            type: `image/png`,
          },
          {
            src: `/favicons/safari-pinned-tab.svg`,
            type: `image/svg`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
