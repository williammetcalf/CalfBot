import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import Environment from "../config/Environment";
import App from "../client/App";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderIndexHtml = (route = "/", config) => {
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const theme = createMuiTheme({});
  const generateClassName = createGenerateClassName();

  const html = ReactDOMServer.renderToString(
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
  );

  const css = sheetsRegistry.toString();
  return render(html, css, config);
};

const render = (html, css, config) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>CalfBot</title>
        <script src="${assets.client.js}" defer crossorigin}></script>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.env = ${JSON.stringify(new Environment(config).public || {})};
        </script>
      </body>
    </html>
  `;
};

export default renderIndexHtml;
