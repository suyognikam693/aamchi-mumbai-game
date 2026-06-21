import express from "express";

const app = express();

app.get("/",(req,res) => {
    res.send("Ganpati Bappa Morya");
});

app.listen(3000,() => {
    console.log("Server running on 3000");
});