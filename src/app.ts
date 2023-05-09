import { ConfigService } from "./config/config.service";
import { Bot } from "./models/Bot";

const bot = new Bot(new ConfigService());
bot.init();