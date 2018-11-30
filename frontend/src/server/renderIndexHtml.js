import { ServerStyleSheet } from "styled-components";
import { SheetsRegistry } from "jss";
import { StaticRouter } from "react-router-dom";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { createGenerateClassName } from "@material-ui/core/styles";
import Environment from "../config/Environment";
import App from "../client/App";
import { PrimaryThemeProvider } from "../client/themes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderIndexHtml = (route = "/", config) => {
  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();

  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <PrimaryThemeProvider sheetsManager={sheetsManager}>
          <StaticRouter context={{}} location={route}>
            <App />
          </StaticRouter>
        </PrimaryThemeProvider>
      </JssProvider>
    )
  );

  const materialCss = sheetsRegistry.toString();
  const styledCss = sheet.getStyleTags();
  return render(html, materialCss, styledCss, config);
};

const render = (html, materialCss, styledCss, config) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>CalfBot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        <style id="jss-server-side">${materialCss}</style>
        ${styledCss}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.env = ${JSON.stringify(new Environment(config).public || {})};
        </script>
        <script src="${assets.client.js}" defer></script>
      </body>
    </html>
  `;
};

export default renderIndexHtml;
