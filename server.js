require('dotenv').config();
const express = require("express");
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");


connectDB();
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/",function(req, res){
  res.sendFile(__dirname+'/bin/index.html'); // change the path to your index.html
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/gifts", require("./routes/gifts"));
app.use("/api/chats", require("./routes/chatRoute"));
app.use("/api/messages", require("./routes/messageRoute"));
// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),

);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
