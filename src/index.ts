import { Context, Logger, Schema } from 'koishi'
import { Config, type Config as ConfigType } from './services/config'
import { scheduleDaily } from './services/utils'
import { getBirthdayReminder } from './services/services'

export const name = 'birthday-reminder'

export { Config }

export let logger = new Logger(name)


export function apply(ctx: Context, config: ConfigType) {
  const commonConfig = {
    account: config.account,
    plantform: config.plantform,
    sendAccount: config.sendAccount,
    remindTime: config.remindTime,
    configPath: config.configPath,
  }

  const remindTime = getRemindTime(commonConfig.remindTime)
  scheduleDaily(ctx, remindTime.hours, remindTime.minutes, async () => {
    getBirthdayReminder(ctx, commonConfig)
  })
}

function getRemindTime(remindTime: string) {
  const [hours, minutes] = remindTime.split(':').map(Number)
  return { hours, minutes }
}
