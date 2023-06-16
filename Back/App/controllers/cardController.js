const axios = require('axios');

const cardController = {
  async getAllCards(req, res) {
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const cards = response.data.data.map((card) => ({
      id: card.id,
      name: card.name,
    }));

    res.json(cards);
  },
};

module.exports = cardController;
