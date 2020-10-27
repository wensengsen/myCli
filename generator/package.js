module.exports = function (name) {
  const template = `
{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vue-cli-service serve",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "deploy": "node scripts/scp2.js",
    "start": "npm run build && npm run deploy"
  },
  "devDependencies": {
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2",
    "core-js": "^3.6.5",
    "cornerstone-core": "^2.3.0",
    "cornerstone-math": "^0.1.8",
    "cornerstone-tools": "^4.21.0",
    "cornerstone-wado-image-loader": "^3.1.2",
    "dicom-parser": "^1.8.5",
    "element-ui": "^2.13.2",
    "hammerjs": "^2.0.8",
    "jquery": "^3.5.1",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0",
    "webpack-api-mocker": "^1.7.6"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.4.0",
    "@vue/cli-plugin-eslint": "~4.4.0",
    "@vue/cli-plugin-router": "~4.4.0",
    "@vue/cli-plugin-vuex": "~4.4.0",
    "@vue/cli-service": "~4.4.0",
    "@vue/eslint-config-standard": "^5.1.2",
    "babel-eslint": "^10.1.0",
    "chalk": "^4.0.0",
    "compression-webpack-plugin": "^4.0.0",
    "eslint": "^6.7.2",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^6.2.2",
    "husky": "^4.2.5",
    "lint-staged": "^10.2.6",
    "prettier": "^2.0.5",
    "sass": "^1.26.5",
    "sass-loader": "^8.0.2",
    "scp2": "^0.5.0",
    "vue-template-compiler": "^2.6.11"
  }
}
  `;
  return { template, dir: "", name: "package.json" };
};
