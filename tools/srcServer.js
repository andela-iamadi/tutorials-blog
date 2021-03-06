import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import path from 'path';
import schema from '../data/schema';
import graphiql from 'graphiql';
import GraphQLHTTP from 'express-graphql';

/* eslint-disable no-console */

const port = process.env.PORT || 9000;
const app = express();
const compiler = webpack(config);

app.use(
  require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '../src')));

app.use('/graphql', GraphQLHTTP({
  schema,
  graphiql: true
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.info('Listening "🌎" on port %s. Open up http://127.0.0.0:%s/ in your browser.', port, port);
});

// (async () => {
//   try {
//     let json = await graphql(schema, introspectionQuery);
//     fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
//       if (err) throw err;

//       console.log('write was successful');
//     })
//   } catch (e) {
//     console.log(e);
//   }
// })();
