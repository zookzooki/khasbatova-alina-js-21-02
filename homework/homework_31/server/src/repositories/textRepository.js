const fs = require('fs');

class TextRepository {
  getText() {
      return new Promise((resolve, reject) => {
          fs.readFile('./text.txt', 'utf8', (err, data) => {
                  if (err) reject(new Error(err));
                  resolve(data);
              }
          )
      });
      };

    saveText(value) {
        return new Promise((resolve, reject) => {
            fs.writeFile('./text.txt', value, 'utf8', (err, data) => {
                    if (err) reject(new Error(err));
                    resolve(data);
                }
            )
        });
    }
}

module.exports = new TextRepository();
