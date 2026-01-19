require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Clinic API running" }));

app.get("/db-test", async (req, res) => {
    try {
        const r = await pool.query("SELECT NOW() as now");
        res.json({ db: "connected", time: r.rows[0].now });
    } catch (e) {
        res.status(500).json({ db: "not connected", error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
