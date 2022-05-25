const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.paths = {
      auth: "/api/auth",
      Movement: "/api/Movement",
      search: "/api/search",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  connectDB() {
    db.authenticate()
      .then(() =>
        console.log("MySQL DB connection established successfully!")
      )
      .catch((error) => {
        throw new Error(error);
      });
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/authRoute"));
    this.app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname + "/public/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;