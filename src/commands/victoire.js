import changeScore from '../functions/changeScore.js';

const victoire = (msg, args) => {
  changeScore(msg, args, 5, 'Victoire');
};

export default victoire;
