const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./config/db");
const userRoutes = require("./routes/user.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const openapi = require("./docs/openapi");
const { getAllUsers } = require("./controllers/user.controller");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static images folder
app.use("/images", express.static(path.join(__dirname, "..", "images")));

// Routes
app.use("/user", userRoutes);
app.get("/users", getAllUsers);

const swaggerSpec = swaggerJSDoc(openapi);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic health
app.get("/", (_req, res) => res.json({ ok: true }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

module.exports = app;
