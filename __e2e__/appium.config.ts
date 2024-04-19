import { RemoteOptions } from 'webdriverio'
import { testPlatform } from './utils/platform'

export const config: RemoteOptions =
  require(`./appium.config.${testPlatform.name}`).config
