// Core quiz data structure
const quizData = [
  {
    id: "verse5-en",
    question: "Establish prayer at the decline of the sun until the darkness of the night...",
    options: ["Verse 5 meaning", "Verse 6 meaning", "Verse 7 meaning", "General advice"],
    answer: 0
  },
  {
    id: "verse6-en",
    question: "And by the Lord of the heavens and the earth, it is indeed the truth...",
    options: ["Verse 5 meaning", "Verse 6 meaning", "Verse 7 meaning", "General advice"],
    answer: 1
  }
  // Add more questions for Verse 7, Arabic, French, etc.
];

// Function to check answers
function checkAnswer(questionIndex, selectedOption) {
  return quizData[questionIndex].answer === selectedOption;
}

// Export for use in render-quiz.js
{ quizData, checkAnswer };