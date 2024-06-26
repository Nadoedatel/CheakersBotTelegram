
export const showMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Выбирете действия", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Узнать погоду",
              request_location: true,
            },
          ],
          ["Мем с тобой"],
          ["Статистика"],
          ["Игра"],
          ["Закрыть"],
        ],
      },
    });
  };
  
  export const closeMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Клавиатура закрыта", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  };