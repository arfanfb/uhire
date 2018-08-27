import { Server } from 'http';
import Express from 'express';
import path from 'path';
import { scrapRoute } from './routes/scrap.js'
import { apiRoute } from './routes/api.js'

const app = new Express();
const server = new Server(app);

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.send("You can buy a candle or you can hire your gmaps.");
})

app.use('/scrap', scrapRoute)
app.use('/api', apiRoute)

// start the server
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
