import pino from 'pino'

const logger = pino({
  base: null,
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
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

export function getLogger(name) {
  return logger.child({ name })
}
