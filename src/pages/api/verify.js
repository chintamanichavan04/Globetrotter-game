import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "data.json");

let destinations = [];
if (fs.existsSync(dataPath)) {
  destinations = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} else {
  console.error(`Error: Data file not found at ${dataPath}`);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, selectedAnswer } = req.body;

  // Convert id to number
  const cityId = parseInt(id, 10);

  // Validate id range
  if (!cityId || cityId < 1 || cityId > destinations.length) {
    return res.status(400).json({ error: "Invalid city ID" });
  }

  const correctDestination = destinations[cityId];

  if (!correctDestination) {
    return res.status(404).json({ error: "City not found" });
  }

  const isCorrect = selectedAnswer === correctDestination.city;

  res.status(200).json({
    correct: isCorrect,
    funFact: correctDestination.fun_fact[Math.floor(Math.random() * correctDestination.fun_fact.length)],
    correctAnswer: correctDestination.city
  });
}
