import { RemoteOptions } from 'webdriverio'
import { config as baseMac } from './appium.config.macos'

export const config: RemoteOptions = {
  ...baseMac,
  capabilities: {
    ...baseMac.capabilities,
  },
}
