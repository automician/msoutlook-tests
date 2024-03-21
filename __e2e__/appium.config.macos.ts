import { RemoteOptions } from 'webdriverio'
import { config as base } from './appium.config.base'

export const config: RemoteOptions = {
  ...base,
  capabilities: {
    ...base.capabilities,
    platformName: 'mac',
    'appium:automationName': 'mac2',
    'appium:bundleId': 'com.microsoft.Outlook',
  },
}
