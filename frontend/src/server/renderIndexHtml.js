import { ServerStyleSheet } from 'styled-components';
import { SheetsRegistry } from 'jss';
import { StaticRouter } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { createGenerateClassName } from '@material-ui/core/styles';
import Environment from '../config/Environment';
import App from '../client/App';
import { PrimaryThemeProvider } from '../client/themes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderIndexHtml = (route = '/', config) => {
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
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-129406449-2', 'auto');
          ga('send', 'pageview');
        </script>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
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
