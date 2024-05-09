import { Element, Collection, Browser } from 'selenidejs'
import { testPlatform } from './utils/platform'

const Selenide = {
  Element,
  Collection,
  Browser,
}

global.Selenide = Selenide

Object.defineProperty(globalThis, 'windows', {
  get() {
    return testPlatform.isWindows
  },
})

Object.defineProperty(globalThis, 'ios', {
  get() {
    return testPlatform.isIos
  },
})

Object.defineProperty(globalThis, 'drd', {
  get() {
    return testPlatform.isDrd
  },
})
