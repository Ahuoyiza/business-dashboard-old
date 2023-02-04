const path = require('path');

const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-next-router',
    '@chakra-ui/storybook-addon',
  ],
  features: {
    emotionAlias: false,
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    /**
     * Allow typescript absolute imports
     */
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')];

    /**
     * Allow importation of SVG files
     */
    const svgLoaderRule = config.module.rules.find((rule) => {
      if (rule !== '...' && rule.test instanceof RegExp) {
        return rule.test.test('.svg');
      }
      return false;
    });

    if (svgLoaderRule !== '...') {
      svgLoaderRule.exclude = /components\/icons/;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      include: /components\/icons/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = config;
