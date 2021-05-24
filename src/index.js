let debounce = require('lodash.debounce');

import './styles/styles.css';
import countryTmpl from './templates/countryTmpl.hbs';
import countryListTmpl from './templates/countryListTmpl.hbs';
import API from './js/fetchCountries';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  countryContainer: document.querySelector('.country-section'),
  searchInput: document.querySelector('.search-input'),
};

function createCountryMarkup(data) {
  return countryTmpl(data);
}

function createCountriesList(data) {
  return countryListTmpl(data);
}

function pnotifyMessage(message) {
  error({
    title: `${message}`,
    delay: 1200,
  });
}

function onInput(e) {
  const searchQuery = e.target.value;

  refs.countryContainer.innerHTML = '';
  API.fetchCountries(searchQuery)
    .then(data => {
      if (data.status === 404) {
        return pnotifyMessage('No countries found!');
      } else if (data.length > 20) {
        return pnotifyMessage('Too many matches found! Please enter more specific query.');
      } else if (data.length === 1) {
        refs.countryContainer.insertAdjacentHTML('beforeend', createCountryMarkup(data));
      } else if (data.length >= 2 && data.length <= 19) {
        refs.countryContainer.insertAdjacentHTML('beforeend', createCountriesList(data));
      }
    })
    .finally(() => (refs.searchInput.innerHTML = ' '));
}

refs.searchInput.addEventListener('input', debounce(onInput, 500));
