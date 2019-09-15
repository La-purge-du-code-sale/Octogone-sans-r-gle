import changeScore from '../functions/changeScore.js';

/**
 * @param  {Message} msg
 * @param  {Array} args
 */
const bisounours = (msg, args) => {
  changeScore(msg, args, 20, 'Bisounours');
};

export default bisounours;
