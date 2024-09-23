const fs = require("fs");
const express = require("express");
const cors = require("cors"); // Import cors middleware
const app = express();

app.use(cors()); // Enable CORS for all routes

// let bookDetails = JSON.parse(fs.readFileSync("bookDetails.json", "utf-8"));
let bookDetails = JSON.parse(fs.readFileSync("bookDetails.json", "utf-8"));
let book1Chapters = JSON.parse(fs.readFileSync("book1Chapters.json", "utf-8"));
let chapter1Verses = JSON.parse(fs.readFileSync("chapter1Verses.json", "utf-8"));
let chapter2Verses = JSON.parse(fs.readFileSync("chapter2Verses.json", "utf-8"));

app.get("/", (req, res) => {
  res.status(200).json(bookDetails);
});

app.get("/geeta", (req, res) => {
  res.status(200).json(book1Chapters);
});

app.get("/geeta/arjun%20vishad%20yoga", (req, res) => {
  res.status(200).json(chapter1Verses);
});

app.get("/geeta/sankhya%20yoga", (req, res) => {
  res.status(200).json(chapter2Verses);
});

app.listen(7600, () => {
  console.log("Listening to 7600 at backend!!");
});
