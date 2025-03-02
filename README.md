# Globetrotter - The Ultimate Travel Guessing Game!

## 🌍 About the Project
Globetrotter is a fun travel guessing game where users get cryptic clues about a city and must guess the correct destination. The game provides fun facts and trivia for an engaging experience!

## 🚀 Features
- **Random Destination Selection**: Fetches 10 unique city-based questions.
- **Multiple Choice Answers**: Users select the right city from four options.
- **Answer Verification API**: Validates user responses.
- **Optimized JSON Storage**: Key-value format for fast lookups.

---

## 📁 Project Structure
```
/globetrotter
├── public/                  # Static assets (e.g., images)
├── components/              # Next.js components
|   ├── QuizCard.js          # Main Quiz Card
├── pages/                   # Next.js pages
│   ├── api/                 # API routes
│   │   ├── destination.js   # Fetches 10 random questions
│   │   ├── verify.js        # Validates user answers
│   ├── index.js             # Main Page (user login)
|   ├── guess-city-quiz.js   # Game Page
├── data/                    # Local data store (3JSON-based)
│   ├── unique_cities.json   # Key-value JSON dataset
├── components/              # Reusable components
├── styles/                  # Global and component styles
├── README.md                # Documentation
└── package.json             # Project dependencies
```

---

## ⚙️ Setup & Installation
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/globetrotter.git
cd globetrotter
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file and add:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **4️⃣ Run the Development Server**
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔥 API Endpoints
### **1️⃣ GET /api/destination**  
Fetches 10 random destination questions.
#### **Response Example:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "This city is known as the 'City of Love'.",
      "options": ["Paris", "New York", "Tokyo", "London"],
      "correctAnswer": "Paris"
    }
  ]
}
```

### **2️⃣ POST /api/verify**  
Validates the selected answer.
#### **Request Example:**
```json
{
  "id": 1,
  "selectedAnswer": "Paris"
}
```
#### **Response Example:**
```json
{
  "correct": true,
  "funFact": "Paris has only one stop sign in the entire city."
}
```

---

## 🧪 Test Cases
We use **Jest & React Testing Library** for unit testing.
### **1️⃣ Install Jest**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### **2️⃣ Example Test: API Response Check**
#### **`__tests__/destination.test.js`**
```javascript
import { render, screen } from "@testing-library/react";
import Game from "../pages/game";

test("renders game question", async () => {
  render(<Game />);
  expect(await screen.findByText(/Guess the City/i)).toBeInTheDocument();
});
```

### **3️⃣ Example Test: API Verification Check**
#### **`__tests__/verify.test.js`**
```javascript
test("verifies correct answer", async () => {
  const response = await fetch("http://localhost:3000/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 1, selectedAnswer: "Paris" })
  });
  const result = await response.json();
  expect(result.correct).toBe(true);
});
```

### **4️⃣ Run Tests**
```bash
npm test
```

---

## 📌 Deployment
### **Deploy on Vercel**
```bash
npm install -g vercel
vercel login
vercel
```
Or visit **[https://vercel.com](https://vercel.com/)** and connect your GitHub repo.

---

## 🎯 Next Steps
🔹 Add a leaderboard for top scores.  
🔹 Implement multiplayer mode (Challenge a Friend).  
🔹 Improve UI with animations.  

---

## 👏 Contributing
Feel free to fork the project and submit pull requests! 🚀

---

## 📜 License
MIT License © 2025 Globetrotter Team

