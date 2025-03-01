import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "data.json");

let destinations = {};
if (fs.existsSync(dataPath)) {
  destinations = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} else {
  console.error(`Error: Data file not found at ${dataPath}`);
}

export default function handler(req, res) {
  const keys = Object.keys(destinations);
  if (keys.length === 0) {
    return res.status(500).json({ error: "Data file is missing" });
  }

  // Select 10 unique random questions
  const shuffledKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 10);
  const questions = shuffledKeys.map((key) => {
    const destination = destinations[key];

    // Generate answer options
    let incorrectOptions = keys
      .filter((k) => k !== key)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((k) => destinations[k].city);

    let answerOptions = [...incorrectOptions, destination.city].sort(() => 0.5 - Math.random());

    return {
      id: destination.id,
      question: destination.clues[Math.floor(Math.random() * destination.clues.length)],
      options: answerOptions,
      // correctAnswer: destination.city
    };
  });

  res.status(200).json({ questions });
}
