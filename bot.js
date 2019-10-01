// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const gen='https://api.genderize.io/?name=peter';
class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
       /* this.onMessage(async (context, next) => {
            await context.sendActivity(context.activity.text.split('').reverse().join(''));

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });*/
         // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await context.sendActivity(http.get(gen))
            .then(response => {
                    console.log(response.data);
            })
            .catch(error => console.error('On get student error', error));//context.activity.text.split('').reverse().join(''));

            // By calling next() you ensure that the next BotHandler is run.
             await next();
        });


        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
