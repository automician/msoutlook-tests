import { RemoteOptions } from 'webdriverio'
import { config as base } from './appium.config.base'

export const config: RemoteOptions = {
  ...base,
  capabilities: {
    ...base.capabilities,
    'appium:platformName': 'Windows',
    'appium:automationName': 'Windows',
    'appium:app': 'C:/Program Files/Microsoft Office/root/Office16/outlook.exe',
    'ms:waitForAppLaunch': '2',
  },
}
