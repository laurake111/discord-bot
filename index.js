const { Client, MessageAttachment } = require('discord.js');

const client = new Client();
const token = 'ODE2MDMyMzQwODY1NzEyMjA5.YD1DVw.NzBbXkGYVmqTNXiZlXx9VV2U74I';


client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', msg => {
    if (msg.content === 'HELLO THERE') {
        msg.reply('GENERAL KENOBI!');
        const attachment = new MessageAttachment('./grieve.jpg');
        const attachment2 = new MessageAttachment('./obi.jpg');
        msg.channel.send(attachment);
        msg.channel.send(attachment2);
    }
})

client.login(token);
