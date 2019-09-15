import setActivity from '../functions/setActivity.js';
import { client } from '../globals.js';

const ready = () => {
  let nombre = 0;
  setInterval(() => {
    setActivity(++nombre);
  }, 15000);
  console.log(`Logged in as ${client.user.tag}!`);
};

export default ready;
