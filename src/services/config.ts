import { Schema } from 'koishi'

export interface Config {
  account: string,
  plantform: string,
  sendAccount: string,
  configPath: string,
}

export const Config: Schema<Config> = Schema.object({
  account: Schema.string().description("账号(qq号)"),
  plantform: Schema.string().default("onebot").description("账号平台"),
  sendAccount: Schema.string().description("发送账号(qq号)"),
  configPath: Schema.string().description("配置文件路径"),
})

