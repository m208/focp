const net = require('net');

// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");

const servers = require("./servers.json");
const greetings = require("./greetings.json");
const badwords = require("./badwords.json");
let bw = badwords.words;

let resString = '';
let results = [];


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret


async function mainLoop(){
	const guild = client.guilds.get(config.guild);
	if (!guild) return console.log('Unable to find guild.');

	const channel = guild.channels.find(c => c.id === config.statusChannel && c.type === 'text');
	if (!channel) return console.log('Unable to find channel.');
	
	while (1){
		try {
			const message = await channel.fetchMessage(config.statusMessage);
			if (!message) return console.log('Unable to find message.');
   
			resString = 'Текущие статусы:  \n';
			await asyncQuerry(servers);
			let timeStamp = getTimeStamp();
			resString += ' \n Обновлено: ' + timeStamp;
			await message.edit(resString);
			console.log('Info updated.' + timeStamp);
		} catch(err) {
			console.error(err);
		}

		await timeout(config.delay*1000);

	}
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	client.user.setPresence({ game: { name: 'Evgen`s FOnline', type: 0 } });
	mainLoop();
});

client.on('error', console.error);

client.on("message", async message => {
  if(message.author.bot) return;
  	
	let agro = badwords.words.some(word => message.content.includes(word));
	if(agro) { 
		message.delete();
	}
  
    if(message.content === "+say") {
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
	}
  
  /*
    if(message.content === "+greetings") {
		let quote = getRandomMessage(greetings.greetings);
		message.reply(quote); 
	}
  */
 
});


//-------------------------------------------------------------------
//		------			 GREETINGS 				------
//-------------------------------------------------------------------

/*
client.on("guildMemberAdd", member => { 
	let guildChannel = member.guild.channels.find(channel => channel.id === 'config.defaultChannel'); 
	if(!guildChannel) { return } 
	if(guildChannel.type != "text"){ return } 
	let quote = getRandomMessage(greetings.greetings);
	guildChannel.send(''+member.user+' '+quote+'').catch(console.error);
});
*/
//-------------------------------------------------------------------

function getRandomMessage(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

async function connectServer(host, port, name){
	const sendMsg = Buffer.alloc(4, 0xFFFFFFFF);
	
	return new Promise(function(resolve, reject) {
		
		let socket = new net.Socket();

		socket.connect(port, host, function() {
			socket.write(sendMsg);
		});
		
		socket.setTimeout(1000);
			socket.on('timeout', () => {
			//console.log('socket timeout');
			results[name] = [-1]; //timeout
			socket.end();
			resolve('ok');
		});
			
		socket.on('error', function(err){
			//console.log("Error: "+err.message);
			socket.end();
			resolve('ok');
		});

		socket.on('data', function(data) {
			let ppl =  data.readUIntLE(0, 3);
			let upTimeOfset = data.slice(4,7);
			let upTime = secToDays(upTimeOfset.readUIntLE(0, 3));
			results[name] = [ppl, upTime];
			//console.log(': онлайн: ', ppl, ', аптайм: ', upTime ); 
			socket.end();
		});
		socket.on('end', function() {
			socket.end();
			resolve('ok');
		});
	});
}


async function asyncQuerry(array){
	for (let name in array) {
		let host = array[name][0];
		let port = array[name][1];
		await connectServer(host, port, name);
	}
	sortResults();
}


function sortResults(){
	let sortable = [];
		for (let name in results) {
			sortable.push([name, results[name]]);
		}
		sortable.sort(function(a, b) {
			return  b[1][0]- a[1][0];
		});
		
		for (val in sortable){
			let name = sortable[val][0];
			let ppl = sortable[val][1][0];
			let upTime = sortable[val][1][1];
			var txt = (ppl>=0) ? (''+name+': онлайн: '+ppl+', аптайм: '+upTime+'') : ''+name+' : offline';
			var okSymbol = (ppl>=0) ? '+' : '-';
			resString +=('```diff\n'+okSymbol+''+txt+'\n```');
		}
		//console.log(resString); 
}

function secToDays(sec){
	let min = Math.floor( sec / 60 );
	let hrs = Math.floor( min / 60 );
	let days = Math.floor( hrs / 24 );
	
	if ( days > 0 ) {
		return (days + ' дн') ;
	}else if (hrs > 0){
		return (hrs + ' ч') ;
	}else return (min + ' мин');	
}

function getTimeStamp(){
let date = new Date()
let timeZone = 3; // +3.00
let tzDifference = timeZone * 60 + date.getTimezoneOffset();
let offsetTime = new Date(date.getTime() + tzDifference * 60 * 1000);
return offsetTime.toString().slice(16, 21);
}



function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


