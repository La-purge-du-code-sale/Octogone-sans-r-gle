import changeScore from '../functions/changeScore.js';

/**
 * @param  {Message} msg
 * @param  {Array} args
 */
const victimised = (msg, args) => {
  changeScore(msg, args, -3, 'Victimisation');
};

export default victimised;
