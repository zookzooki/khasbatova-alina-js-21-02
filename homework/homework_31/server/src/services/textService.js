const TextRepository = require('../repositories/textRepository');

class TextService {
    async getText(req, res) {
        try {
          const data = await TextRepository.getText();
          res.status(201).json(data);
        } catch(error) {
            res.status(400).json(error.message);
        }
    }

    async saveText(req, res) {
        try {
            const data = await TextRepository.saveText(req.body.value);
            res.status(201).json(req.body.value);
        } catch(error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = new TextService();
