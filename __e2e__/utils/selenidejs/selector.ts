import { By } from 'selenium-webdriver'
import { testPlatform } from '../platform'
// import { config } from '../../../app.config';

export const selector = {
  toMobileBy(value: string): By {
    // BY XPATH
    if (['/', '(', '..', './', '*/'].some(it => value.startsWith(it))) {
      return new By('xpath', value)
    }

    // BY EXACT TEXT
    const matchedByExactText = value.match(
      /(?:^"(.*?)"$)|(?:^text='(.*?)')|(?:^text="(.*?)")/s,
    )
    if (matchedByExactText) {
      const text =
        matchedByExactText[1] || matchedByExactText[2] || matchedByExactText[3]
      if (testPlatform.isWindows) {
        return new By('xpath', `//*[text() = "${text}"]`)
      } else if (testPlatform.isAndroid) {
        return new By(
          '-android uiautomator',
          `new UiSelector().text("${text}")`,
        )
      } else {
        // ios...
        return new By('-ios predicate string', `label == "${text}"`)
      }
    }

    // BY CONTAINED TEXT
    const matchedByTextContains = value.match(/^text=(.*?)$/s)
    if (matchedByTextContains) {
      const text = matchedByTextContains[1]
      if (testPlatform.isWindows) {
        return new By('xpath', `//*[contains (text(), "${text}")]`)
      } else if (testPlatform.isAndroid) {
        return new By(
          '-android uiautomator',
          `new UiSelector().textContains("${text}")`,
        )
      } else {
        // ios...
        // in ios we have to additionally select last ([-1]) element,
        // because it considers all parent elements as well the ones with same label attribute
        return new By(
          '-ios class chain',
          '**/*[`label CONTAINS "' + text + '"`][-1]',
        )
      }
    }

    // BY name
    const matchedByExactName = value.match(/^name=(.*?)$/s)
    if (matchedByExactName) {
      const name = matchedByExactName[1]
      return new By('name', name)
    }

    // BY CLASS NAME
    if (
      [
        'uia',
        'xcuielementtype',
        'cyi',
        'android.widget',
        'android.view',
        '.',
      ].some(it => value.toLowerCase().startsWith(it))
    ) {
      return new By('class name', value)
    }

    // const byNamespaceId = (value: string) =>
    //   new By('id', `${config.android.package}:id/${value}`)

    // BY explicit ID
    const matchedCssLikeID = value.match(/^#([a-zA-Z0-9-_]+)$/)
    if (matchedCssLikeID) {
      return new By('id', matchedCssLikeID[1])
    }

    // BY react native testID
    const matchedWordWithDashesUnderscoresOrNumbers =
      value.match(/^[a-zA-Z_\d-]+$/)
    if (matchedWordWithDashesUnderscoresOrNumbers) {
      if (testPlatform.isAndroid) {
        /**
         * By default because of:
         * - Android resource-id generated from testID not contains package name
         *   - https://github.com/facebook/react-native/issues/32237
         * - https://github.com/appium/appium/issues/15354
         * only the following will work:
        return new By('-android uiautomator', `new UiSelector().resourceId("${value}")`);
         * but if you additionaly set appium setting:
         * - disableIdLocatorAutocompletion: true
         * then you can use:
         */
        return new By('id', value)
      } else {
        // ios, Windows
        return new By('accessibility id', value)
      }
    }

    const matchedAndroidID = value.match(
      /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+:id\/[a-zA-Z0-9-_]+$/,
    )
    if (matchedAndroidID) {
      return new By('id', value)
    }

    throw new Error(`invalid selector: ${value}`)
  },
}
