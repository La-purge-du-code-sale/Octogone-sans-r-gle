import changeScore from '../functions/changeScore.js';

/**
 * @param  {Message} msg
 * @param  {Array} args
 */
const victoire = (msg, args) => {
  changeScore(msg, args, 5, 'Victoire');
};

export default victoire;
