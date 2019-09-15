import { client } from '../globals.js';

const setActivity = (nombre) => {
  const activities = [
    ['PLAYING', 'baiser la mère de Tom'],
    ['STREAMING', 'du porno avec la mère de Tom'],
    ['LISTENING', 'Tom pleurer'],
    ['WATCHING', 'la mère de Tom']
  ];
  const activity = activities[nombre % 5];
  client.user.setActivity(activity[1], { type: activity[0] });
};

export default setActivity;
