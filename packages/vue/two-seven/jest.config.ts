module.exports = {
  displayName: 'vue-two-seven',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+.vue$': '@vue/vue2-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../../coverage/packages/vue/two-seven',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'packages/vue/two-seven/tsconfig.spec.json',
      babelConfig: 'packages/vue/two-seven/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'packages/vue/two-seven/tsconfig.spec.json',
      babelConfig: 'packages/vue/two-seven/babel.config.js',
    },
  },
};
