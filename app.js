// Brought you by StonksDev - https://github.com/StonksDev - https://www.stonkscoin.org/
const {Discord, Guild, Client, Channel, GuildMemberManager} = require('discord.js');
const client = new Client();
const {exec} = require('child_process');
client.login('ODQxNjQwOTUwOTQ1ODA4Mzg2.YJptNw.uRcIvh1Fq55SksbxUwAy5usIwfM');

var url = 'https://prod-api.solana.surf/v1/token/3x7UeXDF4imKSKnizK9mYyx1M5bTNzpeALfPeB8S6XT9?';
var request = require("request")

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(function () {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                var price = Math.trunc(body['meta']['marketPrice'] * 100) / 100;
                client.user.setUsername('Token Symbol: $' + price);
            }
        });
        var datetime = new Date();
        console.log('update on: ' + datetime);
    }, 1800000);
})


client.on('message', msg => {
    if (msg.author.bot) return;

    if (msg.channel.id != 'Preferred channelID') {
        return;
    }

    if (msg.content === '/TokenSymbol price') {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var price = Math.trunc(body['meta']['marketPrice'] * 100) / 100;
                msg.reply('Token Symbol: $' + price);
            }
        })
    } else if (msg.content === '/TokenSymbol volume') {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var volume = Math.trunc(body['meta']['marketVolume'] * 100) / 100;
                msg.reply('TokenSymbol volume: $' + volume);
            }
        })
    } else if (msg.content === '/TokenSymbol moon') {
        msg.reply('Soon https://tenor.com/view/stonks-up-stongs-meme-stocks-gif-15715298');
    }
});

