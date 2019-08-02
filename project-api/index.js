import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import schema from './graphql/';

const app = express();
dotenv.config();
const PORT = process.env.PORT || '3001';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
/* const db =
  'mongodb://administrador:administrador@contactmongo-mrx2o.mongodb.net/graphql-mongodb-server'; */
// Connect to MongoDB with Mongoose.
const db = 'mongodb://localhost:27017/foroJara';
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressGraphQL({
    graphiql: true,
    schema
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
