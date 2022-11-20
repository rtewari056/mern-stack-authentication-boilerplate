const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const connectDB = require("./config/db");

const app = express();
app.use(express.json());
connectDB(); // Connect to databse

const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/auth"));

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
