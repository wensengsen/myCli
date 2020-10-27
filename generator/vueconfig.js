module.exports = function (name) {
  const template = `
const merge = require("webpack-merge");
const path = require("path");

const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const CompressionPlugin = require("compression-webpack-plugin");

// const apiMocker = require("webpack-api-mocker");

module.exports = {
devServer: {
    open: IS_PROD,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false,
    before(app) {
    // apiMocker(app, path.resolve("./mocker/index.js"), {
    //     proxy: {
    //     // "/api/*": "https://api.github.com/",
    //     },
    //     changeHost: true,
    // });
    },
},
outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
lintOnSave: false,
runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
productionSourceMap: false, // 生产环境的 source map
chainWebpack: (config) => {
    config.resolve.alias
    .set("@", resolve("src"))
    .set("assets", resolve("src/assets"))
    .set("components", resolve("src/components"))
    .set("api", resolve("src/api"))
    .set("css", resolve("src/assets/css"));
    config.resolve.symlinks(true);
    config.externals = {
        vue: "Vue",
        "element-ui": "ELEMENT",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        };
        config.plugin("html").tap((args) => {
        args[0].title = '${name}';
        return args;
        });
    },
};
    `;
  return { template, dir: "", name: "vue.config.js" };
};
