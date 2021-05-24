const refs = {
  themeSwitchToggle: document.querySelector('#theme-switch-toggle'),
  body: document.body,
};

let storedTheme = localStorage.getItem('theme');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.themeSwitchToggle.addEventListener('change', onSwitchToggleClick);

window.addEventListener('load', currentTheme);

function onSwitchToggleClick(event) {
  event.currentTarget.checked ? enableDarkTheme() : enableLightTheme();
}

function toggleTheme(add, remove) {
  refs.body.classList.remove(remove);
  refs.body.classList.add(add);
  localStorage.setItem('theme', add);
}

function enableDarkTheme() {
  toggleTheme(Theme.DARK, Theme.LIGHT);
  refs.themeSwitchToggle.checked = true;
}

function enableLightTheme() {
  toggleTheme(Theme.LIGHT, Theme.DARK);
  refs.themeSwitchToggle.checked = false;
}

function currentTheme() {
  if (storedTheme === Theme.LIGHT || storedTheme === null) {
    enableLightTheme();
    return;
  }

  if (storedTheme === Theme.DARK) {
    enableDarkTheme();
    return;
  }
}
