import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";

import App from "../client/App";
import Environment from "../config/Environment";

const renderIndexHtml = (context, route, config) => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  const markup = renderToString(
    <StaticRouter context={context} location={route}>
      <App />
    </StaticRouter>
  );

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.env=${JSON.stringify(new Environment(config).public)}
        </script>
    </body>
</html>`;
};

export default renderIndexHtml;
