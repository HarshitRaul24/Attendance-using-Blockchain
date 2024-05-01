const express = require('express');
const router = require('./routes/route');
const cors = require("cors");
require('./config/db')
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
