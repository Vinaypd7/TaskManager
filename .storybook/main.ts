import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    // '@storybook/addon-ondevice-actions',
    // '@storybook/addon-ondevice-controls',
    // '@storybook/addon-ondevice-backgrounds',
  ],
  "framework": {
    "name": "@storybook/react-native-web-vite",
    "options": {}
  }
};
export default config;