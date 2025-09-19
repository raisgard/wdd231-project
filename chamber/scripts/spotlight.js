async function loadSpotlights() {
  const response = await fetch("data/membership.json");
  const members = await response.json();

  // Filter for gold/silver
  const eligible = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");

  // Pick 2–3 random members
  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.querySelector(".spotlight-container");
  container.innerHTML = selected.map(m => `
    <div class="spotlight-card">
      <img src="images/${m.logo}" alt="${m.name} logo">
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank">Visit Website</a>
      <p class="level">${m.membershipLevel}</p>
    </div>
  `).join("");
}

loadSpotlights();
