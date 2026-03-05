import { Context } from "koishi";
import * as fs from "fs";

export function getBirthdayReminder(ctx: Context, commonConfig: any) {
    const { account, plantform, sendAccount, configPath } = commonConfig;
    const config = fs.readFileSync(configPath, "utf-8");
    const data = JSON.parse(config);
    const birthdayList = data.birthdayList || [];

    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${mm}-${dd}`;

    const todayBirthdayNames: string[] = [];

    for (const item of birthdayList) {
        const { name, birthday } = item;
        if (birthday === todayStr && name) {
            todayBirthdayNames.push(name);
        }
    }

    if (todayBirthdayNames.length > 0) {
        const msg = `今天[${todayStr}]生日的人：${todayBirthdayNames.join("，")}`;
        ctx.bots[`${plantform}:${account}`].sendMessage(sendAccount, msg);
    }
}