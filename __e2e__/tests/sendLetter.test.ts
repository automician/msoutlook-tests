import { have } from 'selenidejs'
import { $, $$, shared } from '../shared'
import { faker } from '@faker-js/faker'
import { testPlatform } from '../utils/platform'
import { command } from '../utils/selenidejs/command'

test('send letter with valid data', async () => {
  const driver = shared.wdioDriver
  let email = faker.internet.email()
  let subject = faker.lorem.words(3)
  let letterText = faker.lorem.sentence()
  const mainWindow = await driver.getWindowHandle()

  await $('NewItem').click()

  let handles = await driver.getWindowHandles()
  let letter = handles.filter(handle => {
    return handle != mainWindow
  })[0]

  await driver.switchToWindow(letter)

  await $$('/Window/Pane/ToolBar/Pane/Pane/Pane/Pane/Pane/Group/Group/Button')
    .elementBy(have.exactText('Message Compose'))
    .click()

  await $('recipient').setValue(email)
  await $('subject').setValue(subject)
  await $('message').setValue(letterText)
  await $('composeMessage').click()
  await $('saveMessage').click()

  await driver.switchToWindow(mainWindow)

  await $$('/Window/Pane/Pane/Custom/Pane/Tree/TreeItem/TreeItem')
    .elementBy(have.text('Drafts'))
    .click()

  await $$('//Table/DataItem').first.click()

  await $$('/Window/Pane/Pane/Pane/Edit').should(have.texts(email, '', subject))
  await $('Body').should(have.exactText(letterText))
})
