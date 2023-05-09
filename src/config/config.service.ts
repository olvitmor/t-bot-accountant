import { IConfigService } from "./config.interface";
import { DotenvParseOutput, config } from "dotenv";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor() {
        const { error, parsed } = config();
        if (error){
            throw Error("File '.env' not found");
        }
        if (!parsed){
            throw Error("File '.env' is empty");
        }
        this.config = parsed;
    }
    get(k: string): string {
        const res = this.config[k];
        if (!res){
            throw Error("No such key");
        }
        return res;
    }

}