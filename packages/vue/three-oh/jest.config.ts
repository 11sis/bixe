module.exports = {
  displayName: 'vue-three-oh',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+.vue$': 'vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../../coverage/packages/vue/three-oh',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'packages/vue/three-oh/tsconfig.spec.json',
      babelConfig: 'packages/vue/three-oh/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'packages/vue/three-oh/tsconfig.spec.json',
      babelConfig: 'packages/vue/three-oh/babel.config.js',
    },
  },
};
