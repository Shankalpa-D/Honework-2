const express = require("express");
const fs = require("fs");
const path = require("path");
const server = express();
const port = 3000;
server.use(express.static("public"));

function updateHitCounter() {
  const filePath = "hits.txt";
  let hit = 0;
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    hit = parseInt(data);
  }

  hit++;
  fs.writeFileSync(filePath, hit.toString());
  return hit;
}
server.get("/hits", (req, res) => {
  const hits = updateHitCounter();
  res.json({ hits });
});
server.listen(port, function () {
  console.log("Listening on port {http://localhost:" + port + "}");
});
server.get("/hello", function (req, res) {
  res.send("<h1>hello world</h1>");
});

function getRandomWord() {
  const filePath = "allwords (1).txt";
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    hit = parseInt(data);
    const lines = data.split("\n");
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    const [word, plat, defn] = randomLine.split("\t");
    return { word: word, plat: plat, defn: defn };
  }
}

server.get("/wordRequest", function (req, res) {
  const wordInfo = getRandomWord();
  res.json(wordInfo);
});
