import changeScore from '../functions/changeScore.js';

const victimised = (msg, args) => {
  changeScore(msg, args, -3, 'Victimisation');
};

export default victimised;
