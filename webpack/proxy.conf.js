const { SERVER_API_URL } = require("./environment");

function setupProxy({ tls }) {
  const serverResources = ['/api', '/services', '/management', '/v3/api-docs', '/h2-console', '/auth', '/health'];
  const conf = [
    {
      context: serverResources,
      target: `http${tls ? 's' : ''}://${SERVER_API_URL}`,
      secure: false,
      changeOrigin: tls,
    },
  ];
  return conf;
}

module.exports = setupProxy;
