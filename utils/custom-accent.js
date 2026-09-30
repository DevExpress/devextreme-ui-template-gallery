const accentColorParameter = /[?&]accentColor=([0-9a-f]{6})\b/i;

const applyAccentColor = () => {
  const accentColor = accentColorParameter.exec(window.location.href);

  if (accentColor) {
    document.documentElement.style.setProperty('--dx-accent-color', `#${accentColor[1]}`);
  }
};

applyAccentColor();
window.addEventListener('hashchange', applyAccentColor);
