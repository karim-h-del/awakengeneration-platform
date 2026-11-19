/**
 * mobile-app/app.js
 * View Switcher, Central Event Handlers, & Asynchronous State Engine
 */

const FitPulseApp = {
  state: {
    currentDate: "2026-10-26",
    activeView: "view-dashboard",
    workoutSplits: []
  },

  /**
   * 1. View Switcher Engine
   */
  switchView(targetViewId) {
    const views = document.querySelectorAll(".app-view");
    const tabs = document.querySelectorAll(".nav-tab");
    
    views.forEach(view => {
      view.classList.toggle("active", view.id === targetViewId);
    });

    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.target === targetViewId);
    });

    this.state.activeView = targetViewId;
  },

  /**
   * 2. Event Binding Subsystems
   */
  bindEvents() {
    // Bottom Tab Click Controller
    const navBar = document.querySelector(".bottom-nav-bar");
    if (navBar) {
      navBar.addEventListener("click", (e) => {
        const tabButton = e.target.closest(".nav-tab");
        if (!tabButton) return;
        this.switchView(tabButton.dataset.target);
      });
    }

    // Intercept Workout Builder Form Dispatch 
    const builderForm = document.getElementById("workout-builder-form");
    if (builderForm) {
      builderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(builderForm);
        
        const newExercise = {
          id: Date.now().toString(),
          day: formData.get("day"),
          name: formData.get("exerciseName"),
          sets: parseInt(formData.get("sets"), 10),
          reps: parseInt(formData.get("reps"), 10)
        };

        this.state.workoutSplits.push(newExercise);
        localStorage.setItem("FITPULSE_SPLITS", JSON.stringify(this.state.workoutSplits));
        
        builderForm.reset();
        this.renderAllTemplates();
      });
    }

    // Trigger Free Inference AI Optimization Callback
    const aiBtn = document.getElementById("trigger-free-inference-btn");
    const aiDisplay = document.getElementById("ai-response-display");
    
    if (aiBtn && aiDisplay) {
      aiBtn.addEventListener("click", async () => {
        aiDisplay.textContent = "Analyzing structure via meta-llama/llama-3-8b-instruct:free...";
        aiBtn.disabled = true;

        const summaryPrompt = `Analyze this weekly training split: ${JSON.stringify(this.state.workoutSplits)}. Provide a 2-sentence actionable smartphone screen insight.`;
        const systemRule = "You are a professional athletic trainer. Be hyper-concise and punchy.";

        if (typeof FreeAgent !== "undefined") {
          const insight = await FreeAgent.requestInference(summaryPrompt, systemRule);
          aiDisplay.textContent = insight || "Connection failed. Verify local proxy routing configs.";
        } else {
          aiDisplay.textContent = "Dependency error: free-agent.js missing.";
        }
        aiBtn.disabled = false;
      });
    }
     // Trigger Macro Reset Pipeline
    const resetBtn = document.getElementById("macro-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", async () => {
        // Safe UX Confirmation Dialogue for Mobile viewports
        if (confirm("Reset layout to base program matrices? All custom additions will be cleared.")) {
          localStorage.removeItem("FITPULSE_SPLITS");
          this.state.workoutSplits = [];
          
          try {
            const response = await fetch("workout-data.json");
            if (response.ok) {
              this.state.workoutSplits = await response.json();
              localStorage.setItem("FITPULSE_SPLITS", JSON.stringify(this.state.workoutSplits));
            }
          } catch (error) {
            console.error("Reset seed recovery failed:", error);
          }
          
          this.renderAllTemplates();
          // Visual confirmation flash
          resetBtn.style.transform = "rotate(360deg)";
          resetBtn.style.transition = "transform 0.4s ease";
          setTimeout(() => { resetBtn.style.transform = "none"; }, 400);
        }
      });
    }
  },

  /**
   * 3. Sync Render Pipeline
   */
  renderAllTemplates() {
    if (typeof FitPulseTemplates !== "undefined") {
      FitPulseTemplates.renderDashboard(this.state.workoutSplits);
      FitPulseTemplates.renderPlannerPreview(this.state.workoutSplits);
      FitPulseTemplates.renderMetricsView(this.state.workoutSplits);
    }
  },

  /**
   * 4. Asynchronous Data Initializer & Bootstrap
   */
  async init() {
    // Assert structural date token stability
    const dateBadge = document.getElementById("current-date-badge");
    if (dateBadge) {
      dateBadge.textContent = "Oct 26, 2026";
    }

    // Load Cached Splits or fetch from workout-data.json payload structure
    const localCachedData = localStorage.getItem("FITPULSE_SPLITS");
    if (localCachedData) {
      this.state.workoutSplits = JSON.parse(localCachedData);
    } else {
      try {
        const response = await fetch("workout-data.json");
        if (response.ok) {
          this.state.workoutSplits = await response.json();
          localStorage.setItem("FITPULSE_SPLITS", JSON.stringify(this.state.workoutSplits));
        }
      } catch (error) {
        console.error("Fallback seed data retrieval failed:", error);
        this.state.workoutSplits = []; // Graceful empty fallback state anchor
      }
    }

    this.bindEvents();
    this.renderAllTemplates();
  }
};

// Fire up the matrix sequence as soon as the DOM settles
document.addEventListener("DOMContentLoaded", () => {
  FitPulseApp.init();
});