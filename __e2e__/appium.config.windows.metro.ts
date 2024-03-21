import { RemoteOptions } from 'webdriverio'
import { config as baseWin } from './appium.config.windows'

export const config: RemoteOptions = {
  ...baseWin,
  capabilities: {
    ...baseWin.capabilities,
  },
}
