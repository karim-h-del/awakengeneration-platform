// render-quiz.js

console.log("render-quiz.js loaded");


async function renderQuiz(containerId) {
  const container = document.getElementById(containerId);
  const jsonPath = container.getAttribute("data-json");
  const submitLabel = container.getAttribute("data-submit-label") || "Submit Answers";

  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
    const quizData = await res.json();

    // ✅ Handle both formats
    const questions = Array.isArray(quizData) ? quizData : quizData.questions;
    const meta = Array.isArray(quizData) ? null : quizData.meta || {};

    // Optional: display meta info
    if (meta && meta.date) {
      const header = document.querySelector("header");
      header.insertAdjacentHTML(
        "beforeend",
        `<p class="quiz-meta">Last updated: ${meta.date} — Theme: ${meta.theme || ""}</p>`
      );
      console.log("Quiz meta:", meta);
    }

    // Clear container before rendering
    container.innerHTML = "";

    const form = document.createElement("form");
    form.id = "quiz-form";

    // Feedback container at the top
    const feedback = document.createElement("div");
    feedback.id = "quiz-feedback";
    form.appendChild(feedback);

    // Build quiz UI from questions
    questions.forEach((q, i) => {
      const questionEl = document.createElement("div");
      questionEl.className = "quiz-question";

      const questionText = document.createElement("p");
      questionText.className = "quiz-question-text";
      questionText.textContent = `${i + 1}. ${q.question}`;
      questionEl.appendChild(questionText);

      const optionsWrap = document.createElement("div");
      optionsWrap.className = "quiz-options";

      // Normalize correct answers to a Set of indices
      const correctSet = new Set(
        Array.isArray(q.answer)
          ? q.answer.map(n => parseInt(n, 10))
          : [parseInt(q.answer, 10)]
      );

      // Render radio options
      q.options.forEach((opt, j) => {
        const label = document.createElement("label");
        label.className = "quiz-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${i}`;
        input.value = j;

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + opt));

        optionsWrap.appendChild(label);
        optionsWrap.appendChild(document.createElement("br"));
      });

      // Explanation container
      const explain = document.createElement("div");
      explain.className = "quiz-explanation";
      explain.style.display = "none";

      // Store helpers
      questionEl.dataset.correct = JSON.stringify([...correctSet]);
      questionEl.dataset.explanation = q.explanation || "";

      questionEl.appendChild(optionsWrap);
      questionEl.appendChild(explain);
      form.appendChild(questionEl);
    });

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = submitLabel;
    form.appendChild(submitBtn);

    // Submit handler
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // stops reload
      let score = 0;

      const questionsEls = [...form.querySelectorAll(".quiz-question")];
      const feedback = form.querySelector("#quiz-feedback");

      questionsEls.forEach((qEl, i) => {
        const selected = form.querySelector(`input[name="question-${i}"]:checked`);
        const correct = new Set(JSON.parse(qEl.dataset.correct));

        const explain = qEl.querySelector(".quiz-explanation");
        explain.style.display = "block";

        if (!selected) {
          qEl.classList.remove("correct", "wrong");
          qEl.classList.add("unanswered");
          explain.textContent = `⚠️ No answer selected — ${qEl.dataset.explanation}`;
          return;
        }

        const chosenIndex = parseInt(selected.value, 10);
        if (correct.has(chosenIndex)) {
          score++;
          qEl.classList.remove("wrong", "unanswered");
          qEl.classList.add("correct");
          explain.textContent = `✅ Correct — ${qEl.dataset.explanation}`;
        } else {
          qEl.classList.remove("correct", "unanswered");
          qEl.classList.add("wrong");
          explain.textContent = `❌ Wrong — ${qEl.dataset.explanation}`;
        }
      });

      feedback.textContent = `You scored ${score} out of ${questionsEls.length}`;
    });

    container.appendChild(form);
  } catch (err) {
    console.error("Quiz loading error:", err);
    container.innerHTML = "<p>⚠️ Unable to load quiz data.</p>";
  }
}

// Auto-run
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz("quiz-container");
});
