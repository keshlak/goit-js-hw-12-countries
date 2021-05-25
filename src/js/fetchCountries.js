function fetchCountries(searchQuery) {
  if (searchQuery.trim() !== '') {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log('Request error:', error);
      });
  }
}

export default { fetchCountries };
