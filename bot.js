const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
var prefix = "-"
const fs = require('fs');
const todo = JSON.parse(fs.readFileSync('./todo.json' , 'utf8'));


client.on('message',async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(!todo[message.author.id]) todo[message.author.id] = {todos: [], id: message.author.id};
  let todos = todo[message.author.id].todos;
  let args = message.content.split(' ');
  let todolist = Array.from(todos);
  if(message.content.startsWith(prefix + "todo")) {
  if(message.content.split(' ')[0] !== `${prefix}todo`) return;
  if(!args[1] || args[1] && args[1] === 'add') {
    let todoName = message.content.split(' ').slice(2).join(" ");
    if(!todoName) return message.channel.send(`**:x: | Example : ${prefix}todo add [todoname]**`)
    todos.push(todoName);
    message.channel.send(`**:white_check_mark: | Done Add \`${todoName}\`**`)
  } 
  if(!args[1] || args[1] && args[1] === 'list') {
    let i = 1;
    let o = 1;
    let embed = new Discord.MessageEmbed()
    .setColor(`#141414`)
    .setTitle('Todos List')
    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    .setDescription(`No Todos`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if(todos.length == 0) return message.channel.send(embed)
    let todoembed = new Discord.MessageEmbed()
    .setColor(`#141414`)
    .setTitle('Todos List')
    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    .setDescription(todolist.map(r => `\`${o++}.\` **|| ${r}**`).join('\n') || `No Todos`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    message.channel.send(todoembed)
  }
  if(!args[1] || args[1] && args[1] === 'remove') {
    let todoid = args[2]
    let todoid1 = todoid - 1
    if(!todoid) return message.channel.send(`**:x: | Example : ${prefix}todo remove [todoid]**`)
    if(isNaN(todoid)) return message.channel.send(`**:x: | Its Must Be A Number**`)
    if(todolist[todoid1] === undefined) return message.channel.send(`**:x: | No ID Called \`${todoid}\`**`)
    todos.splice(todoid1, 1);
    message.channel.send(`**:white_check_mark: | Done Delete \`${todolist[todoid1]}\`**`)
  }
}
fs.writeFile("./todo.json", JSON.stringify(todo), (err) => {
  if (err) console.error(err)
  .catch(err => {
  console.error(err);
});
});
});

client.login('TOKEN HERE');