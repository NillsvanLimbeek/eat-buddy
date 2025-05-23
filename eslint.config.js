import antfu from '@antfu/eslint-config';

export default antfu(
  {
    formatters: true,
    vue: true,
    stylistic: {
      semi: true,
    },
  },
  {
    rules: {
      'style/arrow-parens': 'off',
      'vue/operator-linebreak': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'style/brace-style': 'off',
    },
  },
);
