const teams = {
    A: {
        scoreElement: document.querySelector(".teamAScore"),
        addButton: document.querySelector(".addA"),
        subtractButton: document.querySelector(".subtractA"),
        value: 0,
        container: document.getElementById("A") // Add the team container here
    },
    B: {
        scoreElement: document.querySelector(".teamBScore"),
        addButton: document.querySelector(".addB"),
        subtractButton: document.querySelector(".subtractB"),
        value: 0,
        container: document.getElementById("B") // Add the team container here
    }
};

function updateScore(team, change) {
    team.value += change;
    team.scoreElement.innerHTML = team.value;
    
    // Determine which team to highlight based on who is scoring
    if (change > 0) {
        updateBackgroundColor(team === teams.A ? "A" : "B");
    }
}

Object.values(teams).forEach(team => {
    team.addButton.addEventListener("click", () => updateScore(team, 1));
    team.subtractButton.addEventListener("click", () => updateScore(team, -1));
});

function updateBackgroundColor(scoringTeam) {
    if (scoringTeam === "A") {
        teams.A.container.style.backgroundColor = "#52AB42"; // Make team A's background green
        teams.B.container.style.backgroundColor = ""; // Reset team B's background
    } else if (scoringTeam === "B") {
        teams.B.container.style.backgroundColor = "#52AB42"; // Make team B's background green
        teams.A.container.style.backgroundColor = ""; // Reset team A's background
    }
}
