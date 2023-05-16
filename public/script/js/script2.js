function disableOtherCharacters(checkbox) {
  const characterCheckboxes = document.querySelectorAll('input[name="character"]');
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
  const characterCheckbox = document.querySelector('input[name="character"]:checked');
  const movieCheckbox = document.querySelector('input[name="movie"]:checked');

  let roundScore = 0;

  if (characterCheckbox && movieCheckbox) {
    if (
      characterCheckbox.value === 'character-name' &&
      movieCheckbox.value === 'relevant-movie'
    ) {
      roundScore = 1;
    } else if (
      characterCheckbox.value !== 'character-name' ||
      movieCheckbox.value !== 'relevant-movie'
    ) {
      roundScore = 0;
    }
  }

  const currentScore = parseFloat(localStorage.getItem('score')) || 0;
  const newScore = currentScore + roundScore;

  localStorage.setItem('score', newScore);
  document.getElementById('score-button').textContent = `Score: ${newScore}`;

  const roundCount = parseInt(localStorage.getItem('roundCount')) || 0;
  localStorage.setItem('roundCount', roundCount + 1);

  updateRoundDisplay(roundCount + 1);

  const incorrectSelection = roundScore === 0;
  const roundCountReachedLimit = roundCount === 9;

  if (incorrectSelection || roundCountReachedLimit) {
    document.getElementById('SubmitNR').disabled = true;
    document.getElementById('nr2').disabled = false;
  }
}


function updateRoundDisplay(roundCount) {
  const roundDisplay = document.getElementById('round-display');
  roundDisplay.textContent = `Round: ${roundCount}`;
}


window.addEventListener('DOMContentLoaded', () => {
  const currentScore = parseFloat(localStorage.getItem('score')) || 0;
  document.getElementById('score-button').textContent = `Score: ${currentScore}`;

  const roundCount = parseInt(localStorage.getItem('roundCount')) || 0;
  updateRoundDisplay(roundCount);

  
});


function resetScore() {
  localStorage.removeItem('score');
  localStorage.removeItem('roundCount');
  document.getElementById('score-button').textContent = 'Score: 0';
  updateRoundDisplay(0);
}



async function fetchQuote(characters, characterElement, quoteElement, movieElement) {
  try {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    const response = await axios.get(`https://the-one-api.dev/v2/character/${randomCharacter._id}/quote`, {
      headers: {
        Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
      }
    });
    const quotes = response.data.docs;

    if (quotes.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomQuoteIndex];

      quoteElement.textContent = `${randomQuote.dialog}`;
      characterElement.textContent = `${randomCharacter.name}`;

      const movieResponse = await axios.get(`https://the-one-api.dev/v2/movie/${randomQuote.movie}`, {
        headers: {
          Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
        }
      });
      const movie = movieResponse.data.docs[0];
      movieElement.textContent = `${movie.name}`;

      const character2 = document.getElementById('character-name2');
      const character3 = document.getElementById('character-name3');

      let randomIndex2 = Math.floor(Math.random() * characters.length);
      let randomIndex3 = Math.floor(Math.random() * characters.length);

      while (randomIndex2 === randomIndex3) {
        randomIndex3 = Math.floor(Math.random() * characters.length);
      }

      const randomCharacter2 = characters[randomIndex2];
      const randomCharacter3 = characters[randomIndex3];

      character2.textContent = `${randomCharacter2.name}`;
      character3.textContent = `${randomCharacter3.name}`;

      const relatedMovieId = movieElement.dataset.movieId;

      const movie2 = document.getElementById('movie-name2');
      const movie3 = document.getElementById('movie-name3');

      let randomMovieIndex2 = Math.floor(Math.random() * movies.length);

      while (movies[randomMovieIndex2]._id === relatedMovieId || movies[randomMovieIndex2]._id === movie3.dataset.movieId) {
        randomMovieIndex2 = Math.floor(Math.random() * movies.length);
      }

      const randomMovie2 = movies[randomMovieIndex2];

      let randomMovieIndex3 = Math.floor(Math.random() * movies.length);

      while (movies[randomMovieIndex3]._id === relatedMovieId || movies[randomMovieIndex3]._id === randomMovie2._id) {
        randomMovieIndex3 = Math.floor(Math.random() * movies.length);
      }

      const randomMovie3 = movies[randomMovieIndex3];

      movie2.textContent = `${randomMovie2.name}`;
      movie2.dataset.movieId = randomMovie2._id;

      movie3.textContent = `${randomMovie3.name}`;
      movie3.dataset.movieId = randomMovie3._id;
    } else {
      fetchQuote(characters, characterElement, quoteElement, movieElement);
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchCharacters() {
  try {
    const response = await axios.get('https://the-one-api.dev/v2/character', {
      headers: {
        Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
      }
    });
    const characters = response.data.docs;

    const character1 = document.getElementById('character-name');
    const quote = document.getElementById('quote-name');
    const relatedMovie = document.getElementById('related-movie');

    await fetchQuote(characters, character1, quote, relatedMovie);

    const character2 = document.getElementById('character-name2');
    const character3 = document.getElementById('character-name3');

    let randomIndex2 = Math.floor(Math.random() * characters.length);
    let randomIndex3 = Math.floor(Math.random() * characters.length);

    while (randomIndex2 === randomIndex3) {
      randomIndex3 = Math.floor(Math.random() * characters.length);
    }

    const randomCharacter2 = characters[randomIndex2];
    const randomCharacter3 = characters[randomIndex3];

    character2.textContent = `${randomCharacter2.name}`;
    character3.textContent = `${randomCharacter3.name}`;

    const moviesResponse = await axios.get('https://the-one-api.dev/v2/movie', {
      headers: {
        Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
      }
    });
    
    const movies = moviesResponse.data.docs;

    const relatedMovieId = relatedMovie.dataset.movieId;

    const movie2 = document.getElementById('movie-name2');
    const movie3 = document.getElementById('movie-name3');

    let randomMovieIndex2 = Math.floor(Math.random() * movies.length);

    while (movies[randomMovieIndex2]._id === relatedMovieId || movies[randomMovieIndex2]._id === movie3.dataset.movieId) {
      randomMovieIndex2 = Math.floor(Math.random() * movies.length);
    }

    const randomMovie2 = movies[randomMovieIndex2];

    let randomMovieIndex3 = Math.floor(Math.random() * movies.length);

    while (movies[randomMovieIndex3]._id === relatedMovieId || movies[randomMovieIndex3]._id === randomMovie2._id) {
      randomMovieIndex3 = Math.floor(Math.random() * movies.length);
    }

    const randomMovie3 = movies[randomMovieIndex3];

    movie2.textContent = `${randomMovie2.name}`;
    movie2.dataset.movieId = randomMovie2._id;

    movie3.textContent = `${randomMovie3.name}`;
    movie3.dataset.movieId = randomMovie3._id;
  } catch (error) {
    console.log(error);
  }
}


fetchCharacters();



const correctAnswersEl = document.querySelector('.circle-subtext1');
correctAnswersEl.textContent = `Points accumulated:  ${localStorage.getItem("score")}`
const aantalAntwoorden = document.querySelector('.circle-subtext2');
aantalAntwoorden.textContent = `Total questions:  ${localStorage.getItem("roundCount")}`
localStorage.removeItem('score');
localStorage.removeItem('roundCount');


