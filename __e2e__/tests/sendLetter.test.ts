import { $, shared } from '../shared'
import { faker } from '@faker-js/faker'
import { message, app, addIn } from '../utils/model'

const driver = shared.wdioDriver

test('compose letter', async () => {
  // Create unique test data
  let email = faker.internet.email()
  let copyEmail = faker.internet.email()
  let subject = faker.word.words(3)
  let text = faker.word.words(6)
  const mainWindow = await driver.getWindowHandle()

  // Open message compose window
  await app.createNewLetter()
  const letterWindow = (await shared.wdioDriver.getWindowHandles()).filter(
    handle => {
      return handle != mainWindow
    },
  )[0]
  await driver.switchToWindow(letterWindow)

  // Set test data in message, finding Edit fields by index
  await message.setData(email, copyEmail, subject)
  await message.addText(text)

  // Save a draft and close message compose window
  await message.saveDraft()

  // Open message drafts
  await driver.switchToWindow(mainWindow)
  await app.openLastDraft()

  // Assert latest draft has test data
  await app.draftShouldHaveData(email, copyEmail, subject)
  await app.draftShouldHaveText(text)
})

test('compose letter with add-in signature', async () => {
  let email = faker.internet.email()
  let copyEmail = faker.internet.email()
  let subject = faker.word.words(3)
  let text = faker.word.words(6)
  let signature = ' Best regards, ' + faker.person.fullName()
  const mainWindow = await driver.getWindowHandle()

  // Open message compose window
  await app.createNewLetter()
  const letterWindow = (await shared.wdioDriver.getWindowHandles()).filter(
    handle => {
      return handle != mainWindow
    },
  )[0]
  await driver.switchToWindow(letterWindow)

  // Set test data in message, finding Edit fields by index
  await message.setData(email, copyEmail, subject)
  await message.addText(text)

  // Open add-in webview
  await addIn.open()

  // Add signature in message and save message draft
  await addIn.setSignature(signature)
  await addIn.saveMessage()

  // Open message drafts
  await driver.switchToWindow(mainWindow)
  await app.openLastDraft()

  // Assert latest draft has test data
  await app.draftShouldHaveData(email, copyEmail, subject)
  await app.draftShouldHaveText(text)
  await app.draftShouldHaveText(signature)
})

afterEach(async () => {
  await app.openMainMenu()
})
