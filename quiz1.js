// Quiz: Quantity, Mathematics, and Diachronic History in the Qur’an
// Karim — 7 core questions with explanations, progress, review, and restart.

/*(function () {
  const questions = [
    {
      theme: "Qur’an & Measure",
      text: "According to Qur’an 13:8, how does God describe everything?",
      options: [
        "By philosophy",
        "By imagination",
        "By measure",
        "By destiny"
      ],
      correctIndex: 2,
      explanation:
        "Qur’an 13:8: “وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ” — everything is with God in measure (مقدار), indicating quantitative comprehensibility."
    },
    {
      theme: "Qur’an & Number",
      text: "Qur’an 72:28 states “وَأَحْصَىٰ كُلَّ شَيْءٍ عَدَدًا”. What does this most directly affirm?",
      options: [
        "Subjective intuition",
        "Quantitative enumeration of reality",
        "Philosophical speculation",
        "Historical narrative only"
      ],
      correctIndex: 1,
      explanation:
        "The verse affirms exhaustive numbering (إحصاء عددًا), grounding digitization/statistics as modes of comprehending creation."
    },
    {
      theme: "Epistemology: Qur’an vs Message",
      text: "In Karim’s framework, which statement is accurate?",
      options: [
        "The Qur’an and the Message are both purely objective truths.",
        "The Qur’an is objective truth; the Message comprises contextual rulings.",
        "The Message is objective truth; the Qur’an is contextual rulings.",
        "Both are subjective and depend entirely on custom."
      ],
      correctIndex: 1,
      explanation:
        "The Qur’an is ontological truth distinguishing حق vs وهم; the Message provides circumstantial rulings (حلال/حرام) for society."
    },
    {
      theme: "Language of obligation",
      text: "Why is “كُتِبَ عليكم الصيام” significant compared to “فُرِضَ عليكم”?",
      options: [
        "It removes fasting from any guidance.",
        "It indicates prescription with flexibility and alternatives.",
        "It makes fasting eternally non-applicable.",
        "It declares fasting strictly individualistic."
      ],
      correctIndex: 1,
      explanation:
        "كُتِبَ denotes prescription/being written upon, paired with allowances (illness/travel, feeding), showing adaptive legislation."
    },
    {
      theme: "Mathematics & Physics",
      text: "Which best captures the relation between mathematics and physics here?",
      options: [
        "Mathematics depends on technology to exist.",
        "Physics predates mathematics by centuries.",
        "Mathematics is abstract language that precedes and grounds physical models.",
        "They are identical disciplines."
      ],
      correctIndex: 2,
      explanation:
        "Mathematics (abstract ‘أحسن الحديث’) precedes physics, providing the formal language that physics interprets into models of reality."
    },
    {
      theme: "Four elements of science",
      text: "Which set reflects the four functional elements discussed for sciences?",
      options: [
        "Matter, dimension, position, motion",
        "Faith, charity, fasting, pilgrimage",
        "Space, energy, ethics, narrative",
        "Substance, logic, poetry, history"
      ],
      correctIndex: 0,
      explanation:
        "Functions are grounded in matter, dimension, position, and motion (time-related), distinguishing science (functions) from philosophy (concepts)."
    },
    {
      theme: "Observation & History",
      text: "What is the key parallel between scientific observation and historical method here?",
      options: [
        "Position and motion can be observed simultaneously; history is neither synchronic nor diachronic.",
        "Position and motion cannot be observed simultaneously; history is studied either synchronically or diachronically.",
        "Observation is irrelevant; history is only theological.",
        "Motion is imaginary; synchronic analysis is impossible."
      ],
      correctIndex: 1,
      explanation:
        "Observation has trade-offs (e.g., position vs motion), and history presents two lenses: synchronic snapshots vs diachronic processes."
    }
  ];

  // State
  let current = 0;
  let answered = Array(questions.length).fill(null); // store selected index
  let score = 0;

  // Elements
  const qIndex = document.getElementById("qIndex");
  const qTag = document.getElementById("qTag");
  const qText = document.getElementById("qText");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");
  const progressBar = document.getElementById("progressBar");
  const liveScore = document.getElementById("liveScore");
  const finalScore = document.getElementById("finalScore");

  function renderQuestion() {
    const q = questions[current];
    qIndex.textContent = `Question ${current + 1} of ${questions.length}`;
    qTag.textContent = `Theme: ${q.theme}`;
    qText.textContent = q.text;
    feedbackEl.className = "feedback";
    feedbackEl.style.display = "none";
    finalScore.textContent = "";

    // Build options
    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
      const id = `opt-${current}-${i}`;
      const wrapper = document.createElement("label");
      wrapper.className = "option";
      wrapper.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${current}`;
      input.id = id;
      input.value = i;
      input.checked = answered[current] === i;
      input.setAttribute("aria-describedby", `desc-${id}`);

      const span = document.createElement("span");
      span.textContent = opt;
      span.id = `desc-${id}`;

      wrapper.appendChild(input);
      wrapper.appendChild(span);
      optionsEl.appendChild(wrapper);
    });

    // Buttons state
    submitBtn.disabled = false;
    nextBtn.disabled = current >= questions.length - 1;
    prevBtn.disabled = current <= 0;

    // Progress
    const progress = Math.round((current / questions.length) * 100);
    progressBar.style.width = `${progress}%`;

    // Live score
    liveScore.textContent = `Score: ${score}/${questions.length}`;
  }

  function getSelected() {
    const selected = optionsEl.querySelector("input[type=radio]:checked");
    return selected ? parseInt(selected.value, 10) : null;
  }

  function submitAnswer() {
    const selected = getSelected();
    if (selected === null) {
      feedbackEl.className = "feedback";
      feedbackEl.style.display = "block";
      feedbackEl.textContent = "Please select an option before submitting.";
      return;
    }

    // Prevent double-counting score
    const q = questions[current];
    const wasAnswered = answered[current] !== null;
    answered[current] = selected;

    const isCorrect = selected === q.correctIndex;
    if (isCorrect && !wasAnswered) score++;

    feedbackEl.style.display = "block";
    feedbackEl.className = "feedback " + (isCorrect ? "correct" : "incorrect");
    feedbackEl.textContent = (isCorrect ? "Correct. " : "Not quite. ") + q.explanation;

    liveScore.textContent = `Score: ${score}/${questions.length}`;

    // If last question, show final score and restart
    if (current === questions.length - 1) {
      finalScore.textContent = `Final score: ${score}/${questions.length}`;
      restartBtn.classList.remove("hidden");
      restartBtn.disabled = false;
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    }
  }

  function prevQuestion() {
    if (current > 0) {
      current--;
      renderQuestion();
    }
  }

  function restartQuiz() {
    current = 0;
    answered = Array(questions.length).fill(null);
    score = 0;
    restartBtn.classList.add("hidden");
    finalScore.textContent = "";
    renderQuestion();
  }

  // Wire up
  submitBtn.addEventListener("click", submitAnswer);
  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  // Initial render
  renderQuestion();
})();*/

/*(function () {
  let questions = [];
  let current = 0;
  let answered = [];
  let score = 0;

  // Elements
  const qIndex = document.getElementById("qIndex");
  const qTag = document.getElementById("qTag");
  const qText = document.getElementById("qText");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");
  const progressBar = document.getElementById("progressBar");
  const liveScore = document.getElementById("liveScore");
  const finalScore = document.getElementById("finalScore");

  function renderQuestion() {
    const q = questions[current];
    qIndex.textContent = `Question ${current + 1} of ${questions.length}`;
    qTag.textContent = `Theme: ${q.theme || ""}`;
    qText.textContent = q.text;
    feedbackEl.className = "feedback";
    feedbackEl.style.display = "none";
    finalScore.textContent = "";

    // Build options
    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
      const id = `opt-${current}-${i}`;
      const wrapper = document.createElement("label");
      wrapper.className = "option";
      wrapper.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${current}`;
      input.id = id;
      input.value = i;
      input.checked = answered[current] === i;
      input.setAttribute("aria-describedby", `desc-${id}`);

      const span = document.createElement("span");
      span.textContent = opt;
      span.id = `desc-${id}`;

      wrapper.appendChild(input);
      wrapper.appendChild(span);
      optionsEl.appendChild(wrapper);
    });

    // Buttons state
    submitBtn.disabled = false;
    nextBtn.disabled = current >= questions.length - 1;
    prevBtn.disabled = current <= 0;

    // Progress
    const progress = Math.round((current / questions.length) * 100);
    progressBar.style.width = `${progress}%`;

    // Live score
    liveScore.textContent = `Score: ${score}/${questions.length}`;
  }

  function getSelected() {
    const selected = optionsEl.querySelector("input[type=radio]:checked");
    return selected ? parseInt(selected.value, 10) : null;
  }

  function submitAnswer() {
    const selected = getSelected();
    if (selected === null) {
      feedbackEl.className = "feedback";
      feedbackEl.style.display = "block";
      feedbackEl.textContent = "Please select an option before submitting.";
      return;
    }

    const q = questions[current];
    const wasAnswered = answered[current] !== null;
    answered[current] = selected;

    const isCorrect = selected === q.correctIndex;
    if (isCorrect && !wasAnswered) score++;

    feedbackEl.style.display = "block";
    feedbackEl.className = "feedback " + (isCorrect ? "correct" : "incorrect");
    feedbackEl.textContent = (isCorrect ? "Correct. " : "Not quite. ") + q.explanation;

    liveScore.textContent = `Score: ${score}/${questions.length}`;

    if (current === questions.length - 1) {
      finalScore.textContent = `Final score: ${score}/${questions.length}`;
      restartBtn.classList.remove("hidden");
      restartBtn.disabled = false;
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    }
  }

  function prevQuestion() {
    if (current > 0) {
      current--;
      renderQuestion();
    }
  }

  function restartQuiz() {
    current = 0;
    answered = Array(questions.length).fill(null);
    score = 0;
    restartBtn.classList.add("hidden");
    finalScore.textContent = "";
    renderQuestion();
  }

  // Wire up
  submitBtn.addEventListener("click", submitAnswer);
  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  // Load questions from external JSON
  fetch("./quiz-history.json")
    .then(response => response.json())
    .then(data => {
      questions = data.questions.map(q => ({
        theme: q.theme || "",
        text: q.question || q.text,
        options: q.options,
        correctIndex: q.answer ? q.answer[0] : q.correctIndex,
        explanation: q.explanation
      }));
      answered = Array(questions.length).fill(null);
      renderQuestion();
    })
    .catch(err => {
      qText.textContent = "Failed to load quiz data.";
      console.error("Error loading quiz data:", err);
    });
})();*/

(function () {
  let questions = [];
  let current = 0;
  let answered = [];
  let score = 0;

  // Elements
  const qIndex = document.getElementById("qIndex");
  const qTag = document.getElementById("qTag");
  const qText = document.getElementById("qText");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");
  const progressBar = document.getElementById("progressBar");
  const liveScore = document.getElementById("liveScore");
  const finalScore = document.getElementById("finalScore");
  const quizSelector = document.getElementById("quizSelector");

  function renderQuestion() {
    const q = questions[current];
    qIndex.textContent = `Question ${current + 1} of ${questions.length}`;
    qTag.textContent = `Theme: ${q.theme || ""}`;
    qText.textContent = q.text;
    feedbackEl.className = "feedback";
    feedbackEl.style.display = "none";
    finalScore.textContent = "";

    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
      const id = `opt-${current}-${i}`;
      const wrapper = document.createElement("label");
      wrapper.className = "option";
      wrapper.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${current}`;
      input.id = id;
      input.value = i;
      input.checked = answered[current] === i;

      const span = document.createElement("span");
      span.textContent = opt;

      wrapper.appendChild(input);
      wrapper.appendChild(span);
      optionsEl.appendChild(wrapper);
    });

    submitBtn.disabled = false;
    nextBtn.disabled = current >= questions.length - 1;
    prevBtn.disabled = current <= 0;

    const progress = Math.round((current / questions.length) * 100);
    progressBar.style.width = `${progress}%`;

    liveScore.textContent = `Score: ${score}/${questions.length}`;
  }

  function getSelected() {
    const selected = optionsEl.querySelector("input[type=radio]:checked");
    return selected ? parseInt(selected.value, 10) : null;
  }

  function submitAnswer() {
    const selected = getSelected();
    if (selected === null) {
      feedbackEl.className = "feedback";
      feedbackEl.style.display = "block";
      feedbackEl.textContent = "Please select an option before submitting.";
      return;
    }

    const q = questions[current];
    const wasAnswered = answered[current] !== null;
    answered[current] = selected;

    const isCorrect = selected === q.correctIndex;
    if (isCorrect && !wasAnswered) score++;

    feedbackEl.style.display = "block";
    feedbackEl.className = "feedback " + (isCorrect ? "correct" : "incorrect");
    feedbackEl.textContent = (isCorrect ? "Correct. " : "Not quite. ") + q.explanation;

    liveScore.textContent = `Score: ${score}/${questions.length}`;

    if (current === questions.length - 1) {
      finalScore.textContent = `Final score: ${score}/${questions.length}`;
      restartBtn.classList.remove("hidden");
      restartBtn.disabled = false;
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    }
  }

  function prevQuestion() {
    if (current > 0) {
      current--;
      renderQuestion();
    }
  }

  function restartQuiz() {
    current = 0;
    answered = Array(questions.length).fill(null);
    score = 0;
    restartBtn.classList.add("hidden");
    finalScore.textContent = "";
    renderQuestion();
  }

  function loadQuiz(file) {
    fetch(file)
      .then(response => response.json())
      .then(data => {
        questions = data.questions.map(q => ({
          theme: q.theme || "",
          text: q.question || q.text,
          options: q.options,
          correctIndex: q.answer ? q.answer[0] : q.correctIndex,
          explanation: q.explanation
        }));
        current = 0;
        answered = Array(questions.length).fill(null);
        score = 0;
        renderQuestion();
      })
      .catch(err => {
        qText.textContent = "Failed to load quiz data.";
        console.error("Error loading quiz data:", err);
      });
  }

  // Wire up
  submitBtn.addEventListener("click", submitAnswer);
  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  quizSelector.addEventListener("change", e => loadQuiz(e.target.value));

  // Initial load
  loadQuiz(quizSelector.value);
})();