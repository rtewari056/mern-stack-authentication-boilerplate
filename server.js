const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
