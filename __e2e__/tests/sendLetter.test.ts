import { have } from 'selenidejs'
import { $, $$, shared } from '../shared'
import { faker } from '@faker-js/faker'

test('send letter with valid data', async () => {
  const driver = shared.wdioDriver
  let email = faker.internet.email()
  let topic = faker.lorem.words(3)
  let letterText = faker.lorem.sentence()
  const mainWindow = await driver.getWindowHandle()

  await $('NewItem').click()

  let handles = await driver.getWindowHandles()
  let letter = handles.filter(handle => {
    return handle != mainWindow
  })[0]

  await driver.switchToWindow(letter)

  await $('4117').setValue(email)
  await $('4101').setValue(topic)
  await $('//Document').setValue(letterText)
  await $('4256').click()

  await driver.switchToWindow(mainWindow)
  await $$('//TreeItem').filteredBy(have.text('Sent')).first.click()
  await $$('//DataItem').first.click()

  await $('4294').should(have.exactText(topic))
  await $('4117').should(have.exactText(`'${email}'`))
  await $('Body').should(have.exactText(letterText))
})
