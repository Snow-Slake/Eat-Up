import express from "express";
import { json } from "body-parser";

import redis from "redis";

const PORT = process.env.PORT || 3000;
const app = express();

const redisClient = redis.createClient({
    port: 6379,
    host: "0.0.0.0",
});

/////////////////////////////////////////////////////////
app.use(json());

////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    console.log(req);
    const key = req.body["key"];
    try {
        redisClient.get(key, async (err, val) => {
            if (err) throw err;

            res.setHeader("Content-Type", "application/json");
            if (!val) {
                res.send({ value: val });
            } else {
                const value = JSON.parse(val);
                res.send({ value });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.put("/", (req, res) => {
    console.log(req);
    const key = req.body["key"];
    const value = req.body["value"];
    redisClient.set(key, JSON.stringify(value));
    res.send();
});
///////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});

//////////////////////////////////////////////////////
redisClient.on("error", function (error) {
    console.error("redis:", error);
});
