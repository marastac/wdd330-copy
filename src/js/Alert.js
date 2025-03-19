export default class Alert {
    constructor() {
      this.loadAlerts();
    }
  
    async loadAlerts() {
      try {
        const response = await fetch("json/alerts.json");
        const alerts = await response.json();
        this.displayAlerts(alerts);
      } catch (error) {
        console.error("Error loading alerts:", error);
      }
    }
  
    displayAlerts(alerts) {
      if (!alerts.length) return;
  
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");
  
      alerts.forEach(({ message, background, color }) => {
        const p = document.createElement("p");
        p.textContent = message;
        p.style.backgroundColor = background;
        p.style.color = color;
        alertSection.appendChild(p);
      });
  
      const main = document.querySelector("main");
      if (main) {
        main.insertAdjacentElement("beforebegin", alertSection);
      }
    }
  }
  