function disableOtherCharacters(checkbox) {
  const characterCheckboxes = document.querySelectorAll(
    'input[name="character"]'
  );
  characterCheckboxes.forEach((charCheckbox) => {
    if (charCheckbox !== checkbox) {
      charCheckbox.disabled = checkbox.checked;
    }
  });
}
function disableOtherMovies(checkbox) {
  const movieCheckboxes = document.querySelectorAll('input[name="movie"]');
  movieCheckboxes.forEach((movieCheckbox) => {
    if (movieCheckbox !== checkbox) {
      movieCheckbox.disabled = checkbox.checked;
    }
  });
}

function submitAnswer() {
  const characterCheckbox = document.querySelector(
    'input[name="character"]:checked'
  );
  const movieCheckbox = document.querySelector('input[name="movie"]:checked');

  let roundScore = 0;

  if (characterCheckbox && movieCheckbox) {
    if (
      characterCheckbox.value === "character-name" &&
      movieCheckbox.value === "relevant-movie"
    ) {
      roundScore = 1;
    } else if (
      characterCheckbox.value === "character-name" ||
      movieCheckbox.value === "relevant-movie"
    ) {
      roundScore = 0.5;
    }
  }

  const currentScore = parseFloat(localStorage.getItem("score")) || 0;
  const newScore = currentScore + roundScore;

  localStorage.setItem("score", newScore);
  document.getElementById("score-button").textContent = `Score: ${newScore}`;

  const roundCount = parseInt(localStorage.getItem("roundCount")) || 0;
  localStorage.setItem("roundCount", roundCount + 1);

  updateRoundDisplay(roundCount + 1);

  if (roundCount === 9) {
    document.getElementById("SubmitNR").disabled = true;
    document.getElementById("nr2").disabled = false;
  }
}

function updateRoundDisplay(roundCount) {
  const roundDisplay = document.getElementById("round-display");
  roundDisplay.textContent = `Round: ${roundCount}`;
}

window.addEventListener("DOMContentLoaded", () => {
  const currentScore = parseFloat(localStorage.getItem("score")) || 0;
  document.getElementById(
    "score-button"
  ).textContent = `Score: ${currentScore}`;

  const roundCount = parseInt(localStorage.getItem("roundCount")) || 0;
  updateRoundDisplay(roundCount);
});

function resetScore() {
  localStorage.removeItem("score");
  localStorage.removeItem("roundCount");
  document.getElementById("score-button").textContent = "Score: 0";
  updateRoundDisplay(0);
}

const apiKey = "k43ZUHBw7jA5D0wxGFtS";
const quoteContainer = document.getElementById("quoteName");
const charactersContainer = document.getElementById("character-name");
const moviesContainer = document.getElementById("related-movie");
const characterOption1 = document.getElementById("character-name2");
const characterOption2 = document.getElementById("character-name3");
const movieOption1 = document.getElementById("movie-name2");
const movieOption2 = document.getElementById("movie-name3");

// Retrieve a random quote
fetch("https://the-one-api.dev/v2/quote", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data.docs.length);
    const quote = data.docs[randomIndex].dialog;
    // localStorage.setItem("quote", quote);
    const characterId = data.docs[randomIndex].character;
    const movieId = data.docs[randomIndex].movie;
    quoteContainer.innerText = quote;

    // Retrieve character
    fetch(`https://the-one-api.dev/v2/character/${characterId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const character = data.docs[0].name;
        charactersContainer.innerHTML = character;
        generateRandomCharacterOptions(characterId);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    // Retrieve movie
    fetch(`https://the-one-api.dev/v2/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const movie = data.docs[0].name;
        moviesContainer.innerHTML = movie;
        generateRandomMovieOptions(movieId);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Generate random character options
function generateRandomCharacterOptions(excludeCharacterId) {
  fetch(`https://the-one-api.dev/v2/character?limit=2`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const options = data.docs
        .filter((doc) => doc._id !== excludeCharacterId)
        .map((doc) => doc.name);
      characterOption1.innerHTML = options[0];
      characterOption2.innerHTML = options[1];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Generate random movie options
function generateRandomMovieOptions(excludeMovieId) {
  fetch(`https://the-one-api.dev/v2/movie?limit=2`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const options = data.docs
        .filter((doc) => doc._id !== excludeMovieId)
        .map((doc) => doc.name);
      movieOption1.innerHTML = options[0];
      movieOption2.innerHTML = options[1];
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

const correctAnswersEl = document.querySelector(".circle-subtext1");
correctAnswersEl.textContent = `Points accumulated:  ${localStorage.getItem(
  "score"
)}`;
const aantalAntwoorden = document.querySelector(".circle-subtext2");
aantalAntwoorden.textContent = `Total questions:  ${localStorage.getItem(
  "roundCount"
)}`;
localStorage.removeItem("score");
localStorage.removeItem("roundCount");

// Om quote meetegeven in post request voor blacklist
// Van h2 kan niet worden gestuurd via req.body by name enkel me input,select of textarea tag
// daarom deze huidige workaround

// const headingValue = document.getElementById("quoteName").textContent;
// document.getElementById("hiddeninput").value = headingValue;
