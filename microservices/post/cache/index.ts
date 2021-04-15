import express from "express";
import { json } from "body-parser";
import * as cron from 'node-cron';
import redis from 'redis';

const PORT = process.env.PORT || 6000;
const app = express();

const redisClient = redis.createClient({
    port: 6379,
    host: "0.0.0.0",
});

app.use(json());

cron.schedule('25 * * * *', function () {
    console.log('wake up!');
});

app.post("/", (req, res) => {
    const key = req.body.key;
    try {
        redisClient.get(key, async (err, val) => {
            if (err) throw err;

            res.setHeader("Content-Type", "application/json");
            if (!val) {
                res.status(404).send({ value: null });
            } else {
                const value = JSON.parse(val);
                res.status(200).send({ value });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.put("/", (req, res) => {
    try {
        const key = req.body.key;
        const value = req.body.value;
        redisClient.set(key, JSON.stringify(value));
        res.status(200).send({});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.put("/delete", (req, res) => {
    try {
        const key = req.body.key;
        redisClient.del(key);
        res.status(200).send({});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});

redisClient.on("error", function (error) {
    console.error("redis:", error);
});
