// Dark Mode Switch
const toggleSwitch = document.querySelector('.theme-switch-wrapper input[type="radio"]');

toggleSwitch.addEventListener('change', switchTheme);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', e.target.value);
  }
}

export default toggleSwitch;