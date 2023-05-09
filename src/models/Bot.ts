import { Telegraf } from "telegraf";
import { IConfigService } from "../config/config.interface";
import { IBotContext } from "../context/context.interface";
import { Command } from "../commands/command.class";
import { StartCommand } from "../commands/start.command";
import LocalSession from "telegraf-session-local";

export class Bot {
    bot:Telegraf<IBotContext>;
    commands:Command[];
    constructor(private readonly configService: IConfigService){
        this.bot = new Telegraf<IBotContext>(configService.get("BOT_TOKEN"));
        this.bot.use(
            new LocalSession({database: "sessions.json"}).middleware()
        );
        this.commands = [];
    }

    init(){
        this.commands = [new StartCommand(this.bot)]
        for (const command of this.commands){
            command.handle();
        }
        this.bot.launch();
    }
}