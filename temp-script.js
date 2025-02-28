import fs from 'fs';
import path from 'path';

const folderPath = '/Users/sergeykrasnolutskiy/Downloads/screenshots-angular';

fs.readdir(folderPath, (err, files) => {
  console.log(files)
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }

  files.forEach((file) => {
    if (file.includes('etalon') || file.includes('diff') || file.includes('mask')) {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Ошибка удаления ${file}:`, err);
        } else {
          console.log(`Удален: ${file}`);
        }
      });
    }
  });
});
