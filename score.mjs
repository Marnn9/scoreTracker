const teams = {
    A: {
        scoreElement: document.querySelector(".teamAScore"),
        addButton: document.querySelector(".addA"),
        subtractButton: document.querySelector(".subtractA"),
        reset: document.querySelector(".resetA"),
        score: 0,
        container: document.getElementById("A"),
        teamName: document.getElementById("nameA"),
        setPoints: 0,
        setScoreElement: document.querySelector(".setScoreA"),
        addSetButton: document.querySelector(".addSetA"),
        subtractSetButton: document.querySelector(".subtractSetA")
    },
    B: {
        scoreElement: document.querySelector(".teamBScore"),
        addButton: document.querySelector(".addB"),
        subtractButton: document.querySelector(".subtractB"),
        reset: document.querySelector(".resetB"),
        score: 0,
        container: document.getElementById("B"),
        teamName: document.getElementById("nameB"),
        setPoints: 0,
        setScoreElement: document.querySelector(".setScoreB"),
        addSetButton: document.querySelector(".addSetB"),
        subtractSetButton: document.querySelector(".subtractSetB")
    }
};

function init() {
    const teamA = localStorage.getItem("teamA");
    const teamB = localStorage.getItem("teamB");

    if (teamA && teamB){
        teams.A.teamName.innerHTML = teamA;
        teams.B.teamName.innerHTML = teamB;
    }else {
        location.href = "inputTeam.html";
    }

    const scoreA = localStorage.getItem("scoreA");
    const scoreB = localStorage.getItem("scoreB");
    if (scoreA) teams.A.score = parseInt(scoreA);
    if (scoreB) teams.B.score = parseInt(scoreB);

    teams.A.scoreElement.innerHTML = teams.A.score;
    teams.B.scoreElement.innerHTML = teams.B.score;

    const setPointsA = localStorage.getItem("setPointsA");
    const setPointsB = localStorage.getItem("setPointsB");
    if (setPointsA) teams.A.setPoints = parseInt(setPointsA);
    if (setPointsB) teams.B.setPoints = parseInt(setPointsB);

    teams.A.setScoreElement.innerHTML = teams.A.setPoints;
    teams.B.setScoreElement.innerHTML = teams.B.setPoints;
}

function updateScore(team, change) {
    if (team.score + change < 0) {
        return;
    }
    team.score += change;
    team.scoreElement.innerHTML = team.score;

    localStorage.setItem(`score${team === teams.A ? 'A' : 'B'}`, team.score);

    if (change > 0) {
        updateBackgroundColor(team === teams.A ? "A" : "B");
    }
}

function updateSetPoints(team, change) {
    if (team.setPoints + change < 0) {
        return;
    }
    team.setPoints += change;
    team.setScoreElement.innerHTML = team.setPoints;

    localStorage.setItem(`setPoints${team === teams.A ? 'A' : 'B'}`, team.setPoints);
}

function resetScore(team) {
    if (confirm("Are you sure you want to reset the score?")) {
        team.score = 0;
        team.scoreElement.innerHTML = team.score;
    } else {
        return
    }
}

Object.values(teams).forEach(team => {
    team.addButton.addEventListener("click", () => updateScore(team, 1));
    team.subtractButton.addEventListener("click", () => updateScore(team, -1));

    team.addSetButton.addEventListener("click", () => updateSetPoints(team, 1));
    team.subtractSetButton.addEventListener("click", () => updateSetPoints(team, -1));

    team.reset.addEventListener("click", () => resetScore(team));
});



function updateBackgroundColor(scoringTeam) {
    if (scoringTeam === "A") {
        teams.A.container.style.backgroundColor = "#97ed73";
        teams.B.container.style.backgroundColor = "";
    } else if (scoringTeam === "B") {
        teams.B.container.style.backgroundColor = "#97ed73";
        teams.A.container.style.backgroundColor = "";
    }
}

init();

document.getElementById("changeOrder").addEventListener("click", function () {
    const teamSetA = document.getElementById("teamSetA");
    const teamSetB = document.getElementById("teamSetB");
    const A = document.getElementById("A");
    const B = document.getElementById("B");

    const setContainer = document.querySelector(".setContainer");
    const teamsContainer = document.querySelector(".teams-container");

    if (setContainer.firstElementChild === teamSetA) {
        setContainer.insertBefore(teamSetB, teamSetA);
        teamsContainer.insertBefore(B, A);
    } else {
        setContainer.insertBefore(teamSetA, teamSetB);
        teamsContainer.insertBefore(A, B);

    }
});

document.getElementById("newMatchBtn").addEventListener("click", () => {
    if (confirm("Do you want to start a new match and delete all previous data?")) {
        localStorage.clear();
        location.href = "inputTeam.html";
    } else {
        return;
    }
})
