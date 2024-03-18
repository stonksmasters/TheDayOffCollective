const webpack = require('webpack');

module.exports = function override(config, env) {
    // Allow importing from outside of src directory
    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => plugin.constructor.name !== 'ModuleScopePlugin'
    );

    // Polyfills for Node.js core modules
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        zlib: require.resolve('browserify-zlib'),
        assert: require.resolve('assert')
    };

    // Plugin to provide global variables (needed for some browserify packages)
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    ]);

    return config;
};
