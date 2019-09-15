import changeScore from '../functions/changeScore.js';

/**
 * @param  {Message} msg
 * @param  {Array} args
 */
const pute = (msg, args) => {
  changeScore(msg, args, 0, 'Cette pute');
};

export default pute;
