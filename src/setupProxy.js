const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/sundry', {
            target: 'http://localhost:8000',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/sundry': '/sundry',
            },
        })
    );
};
