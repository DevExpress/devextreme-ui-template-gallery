const { copyFile } = require('fs');
const { join } = require('path');

copyFile(
  join(__dirname, '..', 'metadata', 'themes.json'),
  join(__dirname, 'src', 'app', 'themes.json'),
  (err) => {
    if (err) throw err;
    console.log('themes.json copied');
  },
);
