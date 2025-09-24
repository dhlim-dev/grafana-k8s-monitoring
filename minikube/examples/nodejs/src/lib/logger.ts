import pino from 'pino'
import { isProduction } from './environment'

const logger = pino({
  base: null,
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isProduction ? undefined : {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
    }
  },
  formatters: {
    level: (label) => {
      return { level: label }
    },
  }
})

export function getLogger(name: string) {
  return logger.child({ name })
}
