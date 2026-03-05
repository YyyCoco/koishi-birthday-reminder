import { Context } from "koishi"

function msUntil(hour: number, minute: number): number {
    const now = new Date()
    const next = new Date(now)
    next.setHours(hour, minute, 0, 0)
    if (next.getTime() <= now.getTime()) {
      next.setDate(next.getDate() + 1)
    }
    return next.getTime() - now.getTime()
  }
  
  function scheduleDaily(ctx: Context, hour: number, minute: number, task: () => void | Promise<void>) {
    const run = () => {
      void Promise.resolve(task()).finally(() => {
        const delay = msUntil(hour, minute)
        ctx.setTimeout(run, delay)
      })
    }
    const delay = msUntil(hour, minute)
    ctx.setTimeout(run, delay)
  }

  export { scheduleDaily }