axios.get('https://the-one-api.dev/v2/character', {
    headers: {
      Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
    }
  })
  .then(response => {
    const characters = response.data.docs;
    const character1 = document.getElementById('character-name');
    const character2 = document.getElementById('character-name2');
    const character3 = document.getElementById('character-name3');
    const randomIndex1 = Math.floor(Math.random() * characters.length);
    const randomIndex2 = Math.floor(Math.random() * characters.length);
    const randomIndex3 = Math.floor(Math.random() * characters.length);
    const randomCharacter1 = characters[randomIndex1];
    const randomCharacter2 = characters[randomIndex2];
    const randomCharacter3 = characters[randomIndex3];
    character1.textContent = `${randomCharacter1.name}`;
    character2.textContent = `${randomCharacter2.name}`;
    character3.textContent = `${randomCharacter3.name}`;
  })
  .catch(error => {
    console.log(error);
  });

  axios.get('https://the-one-api.dev/v2/movie', {
    headers: {
      Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
    }
  })
  .then(response => {
    const movies = response.data.docs;
    const movie1 = document.getElementById('movie-name');
    const movie2 = document.getElementById('movie-name2');
    const movie3 = document.getElementById('movie-name3');
    const randomIndex1 = Math.floor(Math.random() * movies.length);
    const randomIndex2 = Math.floor(Math.random() * movies.length);
    const randomIndex3  = Math.floor(Math.random() * movies.length);
    const randomMovie1 = movies[randomIndex1];
    const randomMovie2 = movies[randomIndex2];
    const randomMovie3 = movies[randomIndex3];
    movie1.textContent = `${randomMovie1.name}`;
    movie2.textContent = `${randomMovie2.name}`;
    movie3.textContent = `${randomMovie3.name}`;
  })
  .catch(error => {
    console.log(error);
  });

  axios.get('https://the-one-api.dev/v2/quote', {
    headers: {
      Authorization: 'Bearer k43ZUHBw7jA5D0wxGFtS'
    }
  })
  .then(response => {
    const quotes = response.data.docs;
    const quote = document.getElementById('quote-name');

    const randomIndex1 = Math.floor(Math.random() * quotes.length);

    const randomQuote = quotes[randomIndex1];

    quote.textContent = `${randomQuote.dialog}`;

  })
  .catch(error => {
    console.log(error);
  });
  