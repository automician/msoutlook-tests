export const testPlatform = {
  get name() {
    return process.env.TEST_PLATFORM
  },
  get isAndroid() {
    return ['android', 'drd'].includes(this.name?.toLowerCase() ?? '')
  },
  /**
   * A shorter alias, of same length as isIos ;)
   */
  get isDrd() {
    return this.isAndroid
  },
  get isIos() {
    return this.name?.toLowerCase() === 'ios'
  },
  get isWindows() {
    return this.name?.toLowerCase() === 'windows'
  },
}
