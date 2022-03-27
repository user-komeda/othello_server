/**
 * stylelint Configuration
 */
module.exports = {
  plugins: [
    // stylelintにprettierの設定を読み込むためのプラグイン
    'stylelint-prettier',
    // displayプロパティの値によって無視されるプロパティを記載していないか検知するルールを追加するプラグイン
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    // プロパティの記述順に関するルール
    'stylelint-config-recess-order',
    // 一般的なルール
    'stylelint-config-standard',
    // prettierと連携するためのルール
    'stylelint-prettier/recommended',
    // prettier設定と重複するルールを打ち消すルール
    'stylelint-config-prettier',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    // custom
  },
  ignoreFiles: ['**/node_modules/**'],
}
