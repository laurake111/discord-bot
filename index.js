const { Client, MessageAttachment } = require('discord.js');
const unirest = require('unirest');

const client = new Client();
const token = process.env.TOKEN;

let insults = [
  "Girl look how orange you fucking look girl", 
  "Ur make-up aint right gurrrl", 
  "Sinust ei saa spirituaalset sõnni!",
  "Girl, can we have some water? Her hair is thirsty, baby.",
  "When you're on the runway, do you keep the 800 number for suicide? BECAUSE THOSE TOES ARE READY TO JUMP!",
  "You remind me of a Russian Doll... Full. Of. Your. Self",
  "It's called Forever 21 not Forever 41!",
  "Was your barbecue cancelled?! Because your grill is f*cked up!",
  "You’re the reason God created the middle finger.",
  "Hold still. I’m trying to imagine you with personality.",
  "Your face makes onions cry.",
  "You look so pretty. Not at all gross, today.",
  "Don’t worry, the first 40 years of childhood are always the hardest.",
  "Don’t be ashamed of who you are. That’s your parents’ job.",
  "Your face is just fine but we’ll have to put a bag over that personality.",
  "You bring everyone so much joy…when you leave the room.",
  " I thought of you today. It reminded me to take out the trash.",
  "You are like a cloud. When you disappear it’s a beautiful day.",
  "OH MY GOD! IT SPEAKS!",
  "Britney would rather be lonely than with you",
  "Is your ass jealous of the amount of sh*t that comes out of your mouth?",
  "*Thumbs down*",
  "U ugly",
  "Eww mingi incel",
  "DISGOSTANG!",
  "I get incel vibes from you",
  "Is the carpet comfortable?",
  "Cuddling you as the little spoon is perfect, I don't have to look at your face",
  "BMW, Body Made Wrong",
  "Aaviksoo ei anna sulle midagi",
  "Isegi EKRE ei saadaks sind Rootsi",
  "Even Britney wouldn't hit you baby one more time",
  "ole nüüd kuss natuke aega",
  "kullakene lõpeta need ilusad sõnad ära",
  "su lõust meenutab mu pahteldatud seina",
  "🥵 🥵 🥵 🥵 🥵 🥵",
  "Kes sa oled?",
  "Mama, this is garbage",
  "My phone battery lasts longer than your relationships.",
  "Is your drama going to an intermission soon?",
  "If I wanted a bitch, I would have bought a dog.",
  "It’s a shame you can’t Photoshop your personality.",
  "The smartest thing that ever came out of your mouth was a penis.",
  "Jealousy is a disease. Get well soon, bitch!",
  "My middle finger gets a boner every time I see you.",
  "Ma sõidaks sinust üle bemmiga",
  "If I had a face like yours I’d sue my parents.",
  "I have heels higher than your standards.",
  "Keep rolling your eyes. Maybe you’ll find your brain back there.",
  "Everyone brings happiness to a room. I do when I enter, you do when you leave.",
  "I’m not shy. I just don’t like you.",
  ""
]

client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', async (message) => {
  
  //HELP MODULE
   if (message.content.startsWith("!help")) {
		message.channel.send(
      '```' + 
      '*Insult a person -> shade/roast/insult @person \n' +
      '*Ask the bot a question -> Aaviksoo {question} ? \n'+
      '*Ask to see those jinkies 🍊-> velma\n' +
      '*Ask to see daddy wan kenobi -> HELLO THERE\n' +
      '```'
    )};

  //the insults API
  if (message.content.startsWith('/insult')) {
    var req = unirest('GET', 'https://insult.mattbas.org/api/insult');

    let member = message.mentions.members.first();
    if (member == '' || member == null) {
      return message.reply(
        'You have to insult someone.. insult @someone'
      );
    }

    if (member.user.username === message.author.username) {
      message.reply(
        'Why do you hate yourself?'
      );
    }
    req.end((res) => {
      if (res.error) {
        errorMessage();
        throw new Error(res.error);
      }
      try {
        var insult = res.raw_body.toLowerCase();
        message.channel
          .send(`<@${member.user.id}> ` + insult + " 🥵")
          .then((e) => {
            e.react('🔥');
            stats.insult.update();
          })
          .catch((err) => {
            console.error('insult stats error: ' + err)
          });
      } catch (err) {
        console.error('insult api error: ' + err)
      }
    });
    }

    //the 8ball API
    if (message.content.startsWith("Aaviksoo") && message.content.endsWith("?")) {
      let query = message.content.split(' ');
      let member = message.mentions.members.first();
  
      if (query.length >= 2) {
        query.shift();
        let answer = query.join(' ');
        var req = unirest(
          'get',
          'https://8ball.delegator.com/magic/JSON/' + answer
        );
  
        req.end((res) => {
          try {
            message.channel
              .send(
                '```' +
                  "Küsimus: \n" +
                  res.body.magic.question +
                  '?\n\n' +
                  'Aaviksoo: \n' +
                  res.body.magic.answer +
                  '```'
              )
              .then(() => {
                stats.answer.update();
              })
              .catch((err) => {
                console.error('8ball stats error: ' + err)
              });
          } catch (err) {
            console.error('8ball error: ' + err)
          }
        });
      } else {
        message.channel.send('Gotta have words behind it homie.');
      }
    }
});

//My personal insults
client.on('message', msg => {
  if (msg.content.startsWith('shade') || 
      msg.content.startsWith('roast') ||
      msg.content.startsWith('insult')){

    let member = msg.mentions.members.first();
    if (member == '' || member == null) {
      return msg.reply(
        'You have to insult someone.. insult @someone'
      );
    }

    const randomElement = Math.floor(Math.random() * insults.length);
    msg.channel.send(`<@${member.user.id}> ` + insults[randomElement]);
  }
});


client.on('message', msg => {
  //VELMA
  if (msg.content === 'velma') {
      msg.reply(
      "Scoob 🍊 ⬆️ ⬇️ Shaggy 🍊🍊 ⬆️ ⬇️  omg Daphne 🍊🍊 ⬆️ ⬇️ frederick 🍊🍊 ⬆️ ⬇️"
      + "omg mystery inc 🤩 🤩 oh where is everybody 😭 😭 omg i'm just thinking is it is it a man 🤡 in a mask or is it actually aliens 👽 "
      + "omg my glasses 👹 U KNO I CANT SEE WITHOITHH MUH GLÆÅSĘSS 👹 ugh omg where could"
      + "they be 🥴 jinkies 🥴 omg where are they 😡 oh omg ugh lets solve " 
      + " 💃 this mystery for once and for all 💃 mystery inc rocks 🗿 yea DAPHNE 🥵 🥵");
      const attachment = new MessageAttachment('./velma.mp4');
      msg.channel.send(attachment);
  }
  //OBIWAN
  if (msg.content === 'HELLO THERE') {
    msg.reply('GENERAL KENOBI!');
    const attachment = new MessageAttachment('./grieve.jpg');
    const attachment2 = new MessageAttachment('./obi.jpg');
    msg.channel.send(attachment);
    msg.channel.send(attachment2);
  }
  //SUS
  if (msg.content === 'SUS') {
    msg.reply('SUS!');
    const attachment = new MessageAttachment('./sus.mp4');
    msg.channel.send(attachment);
  }
  
  //garbage
  if (msg.content === 'garbage') {
    msg.reply("Mama, this is garbage");
    const attachment = new MessageAttachment('./garbage.mp4');
    msg.channel.send(attachment);
  }

  //orange
  if (msg.content === 'orange') {
    msg.reply("🍊🍊");
    const attachment = new MessageAttachment('./orange.mp4');
    msg.channel.send(attachment);
  }

  //penis
  if (msg.content === 'penis') {
    msg.reply("MIKS SA NII VULGAARNE OLED? 😡 EKSMATI SAAD! uwu!"
    + "\n 8============================D 💦 💦 💦");
  }

});

client.login(token);
