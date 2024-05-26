import { Telegraf, Markup } from "telegraf";
import { config } from "./config.js";
import { getWeather } from "./weather.js"
import { getCat } from "./cat.js"
import { showMenu, closeMenu } from "./menu.js"
import { getStatistics, updateStatistics } from './getStatistics.js'; 


const bot = new Telegraf(config.telegramToken, {});

bot.start((ctx) => {
    ctx.reply('Привет! Напиши "Меню".', Markup.keyboard([
        ['Меню', 'Мем с тобой', 'Статистика', 'Игра']
    ]).resize());
});
bot.on("message", async (ctx) => {
    const chatId = ctx.chat.id;

    if (ctx.message.text === "Меню") {
        showMenu(bot, chatId);
    } else if (ctx.message.location) {
        let { text, iconUrl } = await getWeather(ctx);
        await ctx.replyWithPhoto({ url: iconUrl }, { caption: text });
    } else if (ctx.message.text === "Мем с тобой") {
        let { url, mimeType } = await getCat();

        if (mimeType === 'image/gif') {
            await ctx.replyWithAnimation(url);
            updateStatistics('gif');
        } else {
            await ctx.replyWithPhoto(url);
            updateStatistics('photo');
        }
    } else if (ctx.message.text === "Статистика") {
        const stats = getStatistics();
        await ctx.reply(`Показано картинок: ${stats.photos}\nПоказано GIF: ${stats.gifs}`);
    } else if (ctx.message.text === "Игра") {
        await ctx.reply('Откройте игру', Markup.inlineKeyboard([
            [Markup.button.url('Играть', 'http://127.0.0.1:5500/ChearterGameBot/Public/index.html')]
        ]));
    } else {
        closeMenu(bot, chatId);
    }
});

bot.launch()
