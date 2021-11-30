module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended", "cherryfe"],
  rules: {
    "vue/no-v-html": 0,
    "vue/array-bracket-spacing": 1,
    "vue/arrow-spacing": 1,
    "vue/block-spacing": 1,
    "vue/comma-dangle": 1,
    "vue/component-name-in-template-casing": [
      1,
      "kebab-case",
      { registeredComponentsOnly: false }
    ],
    'vue/eqeqeq': 1,
    'vue/key-spacing': 1,
    'vue/keyword-spacing': 1,
    'vue/match-component-file-name': 1,
    'vue/no-boolean-default': 0,
    'vue/no-empty-pattern': 1,
    'vue/no-irregular-whitespace': 1,
    'vue/no-reserved-component-names': 1,
    'vue/no-static-inline-styles': 0,
    'vue/no-unsupported-features': 1,
    'vue/object-curly-spacing': [2, "always"],
    'vue/padding-line-between-blocks': 1,
    'vue/require-direct-export': 1,
    'vue/require-name-property': 1,
    'vue/script-indent':  [1, 2, { switchCase: 1 }],
    'vue/space-unary-ops': 1,
    'require-unicode-regexp': 0,
    'vue/no-unused-components': 1,
    'no-new': 0,
    'no-bitwise': 0
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 0
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
