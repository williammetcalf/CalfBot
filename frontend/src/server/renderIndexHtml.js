import { ServerStyleSheet } from "styled-components";
import { SheetsRegistry } from "jss";
import { StaticRouter } from "react-router-dom";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import ReactDOMServer from "react-dom/server";

import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import Environment from "../config/Environment";
import App from "../client/App";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderIndexHtml = (route = "/", config) => {
  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const theme = createMuiTheme({});
  const generateClassName = createGenerateClassName();

  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <StaticRouter context={{}} location={route}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
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
