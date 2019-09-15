import changeScore from '../functions/changeScore.js';

const pute = (msg, args) => {
  changeScore(msg, args, 0, 'Cette pute');
};

export default pute;
