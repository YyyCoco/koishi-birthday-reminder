import { Context, Logger, Schema } from 'koishi'
import { Config, type Config as ConfigType } from './services/config'
import { scheduleDaily } from './services/utils'

export const name = 'birthday-reminder'

export { Config }

export let logger = new Logger(name)


export function apply(ctx: Context, config: ConfigType) {
  const commonConfig = {
    account: config.account,
    plantform: config.plantform,
    sendAccount: config.sendAccount,
    configPath: config.configPath,
  }

  scheduleDaily(ctx, 12, 5, async () => {
    // getBirthdayReminder(ctx, commonConfig)
  })
}
