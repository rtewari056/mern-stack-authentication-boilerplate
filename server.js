const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
