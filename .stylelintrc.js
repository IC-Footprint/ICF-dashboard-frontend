module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order', 'stylelint-config-rational-order/plugin'],
  rules: {
    'string-quotes': 'single'
  },
  processors: ['stylelint-processor-styled-components']
};
