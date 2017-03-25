module.exports = function buildConfig(env) {
    return require(`./webpack.config.${env}.js`);
};
