const express = require('express');
const bodyParser = require('body-parser');
const templateRoutes = require('./routes/templateRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/connection');

const app = express();
const PORT = process.env.PORT||3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(templateRoutes);
app.use(userRoutes);
app.use(imageRoutes);

app.listen(PORT, () => console.log(`Server up and running at PORT: ${PORT}`));
