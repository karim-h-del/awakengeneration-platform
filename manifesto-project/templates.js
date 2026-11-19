/**
 * mobile-app/templates.js
 * Dynamic UI Component Layouts & Core DOM Rendering Engines
 */

const FitPulseTemplates = {
  
  /**
   * 1. Render Today's Dashboard List View
   */
  renderDashboard(splits) {
    const container = document.getElementById("today-routine-list");
    const progressSlot = document.getElementById("progress-card-slot");
    if (!container) return;

    const todayTargetDay = "monday";
    const todaysExercises = splits.filter(item => item.day === todayTargetDay);

    if (todaysExercises.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <span>🧘 No items scheduled for today. Rest and recover!</span>
        </div>
      `;
      if (progressSlot) progressSlot.innerHTML = "";
      return;
    }

    // Render Progress Card Summary Component
    if (progressSlot) {
      progressSlot.innerHTML = `
        <div class="metrics-overview-card">
          <div class="metrics-card-text">
            <h3>Push Split Target</h3>
            <p class="metrics-card-subtext">${todaysExercises.length} Movements Bound</p>
          </div>
          <div class="progress-ring-badge">100%</div>
        </div>
      `;
    }

    // Inject Active Routine List Stack
    container.innerHTML = todaysExercises.map(item => `
      <div class="workout-card-item">
        <div class="workout-card-details">
          <h4>${item.name}</h4>
          <span class="workout-card-badge">
            ${item.sets} Sets × ${item.reps} Reps
          </span>
        </div>
        <button class="btn-check-toggle">✅</button>
      </div>
    `).join("");
  },

  /**
   * 2. Render Saved Splits Preview Board
   */
  renderPlannerPreview(splits) {
    const container = document.getElementById("saved-splits-preview");
    if (!container) return;

    if (splits.length === 0) {
      container.innerHTML = `<p class="empty-preview-text">No exercises saved yet.</p>`;
      return;
    }

    const daysOrder = ["monday", "wednesday", "friday"];
    const labelsMap = { monday: "Monday (Push)", wednesday: "Wednesday (Pull)", friday: "Friday (Legs)" };

    let generatedHtml = `<h2 class="split-board-title">Active Split Structure</h2>`;

    daysOrder.forEach(day => {
      const dayExercises = splits.filter(item => item.day === day);
      if (dayExercises.length > 0) {
        generatedHtml += `
          <div class="day-group-block">
            <h5 class="day-group-header">${labelsMap[day]}</h5>
            <div class="day-exercises-stack">
              ${dayExercises.map(ex => `
                <div class="planner-exercise-row">
                  <span class="exercise-row-name">${ex.name}</span>
                  <span class="exercise-row-vol">${ex.sets}x${ex.reps}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = generatedHtml;
  },

  /**
   * 3. Render Volume Metrics Analytical Displays
   */
  renderMetricsView(splits) {
    const container = document.getElementById("volume-metrics-display");
    if (!container) return;

    const dayTotals = splits.reduce((acc, current) => {
      const calculatedVolume = current.sets * current.reps;
      acc[current.day] = (acc[current.day] || 0) + calculatedVolume;
      return acc;
    }, { monday: 0, wednesday: 0, friday: 0 });

    const totalSets = splits.reduce((acc, curr) => acc + curr.sets, 0);

    container.innerHTML = `
      <div class="metrics-dashboard-grid">
        <div class="stat-card-total">
          <span class="stat-card-label">Cumulative Set Count</span>
          <h2 class="stat-card-number">${totalSets} Sets</h2>
        </div>

        <div class="bar-chart-card">
          <h3 class="chart-card-title">Estimated Repetition Volume Breakdown</h3>
          
          <div class="chart-wrapper">
            <div class="chart-row">
              <div class="chart-row-labels"><span>Monday (Push)</span><strong>${dayTotals.monday} reps</strong></div>
              <div class="chart-track"><div class="chart-fill" style="width: ${Math.min(100, (dayTotals.monday/100)*100)}%;"></div></div>
            </div>
            <div class="chart-row">
              <div class="chart-row-labels"><span>Wednesday (Pull)</span><strong>${dayTotals.wednesday} reps</strong></div>
              <div class="chart-track"><div class="chart-fill" style="width: ${Math.min(100, (dayTotals.wednesday/100)*100)}%;"></div></div>
            </div>
            <div class="chart-row">
              <div class="chart-row-labels"><span>Friday (Legs)</span><strong>${dayTotals.friday} reps</strong></div>
              <div class="chart-track"><div class="chart-fill" style="width: ${Math.min(100, (dayTotals.friday/100)*100)}%;"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};