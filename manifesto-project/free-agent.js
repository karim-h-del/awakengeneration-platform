/**
 * mobile-app/free-agent.js
 * Handles lightweight, zero-cost inference pipelines using free-tier models.
 */

const FreeAgent = {
  // Target a permanently free, publicly routed model tier
  MODEL_ENDPOINT: "meta-llama/llama-3-8b-instruct:free",
  
  async requestInference(prompt, systemInstruction = "") {
    try {
      const response = await fetch("https://openrouter.ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // HTTP Referer and Title are mandatory for OpenRouter Free Tier routing
          "HTTP-Referer": window.location.origin || "http://localhost:3000",
          "X-Title": "Mobile Free App Planner"
        },
        body: JSON.stringify({
          model: this.MODEL_ENDPOINT,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Network response error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Free Agent Pipeline Failed:", error);
      return null;
    }
  }
};