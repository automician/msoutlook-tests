import { $, $$, shared } from '../shared'
import { have } from 'selenidejs'

const driver = shared.wdioDriver
export const app = {
  async createNewLetter() {
    await $('NewItem').click()
  },

  async openLastDraft() {
    await $$('/Window/Pane/Pane/Custom/Pane/Tree/TreeItem/TreeItem')
      .elementBy(have.text('Drafts'))
      .click()
    await $$('//Table/DataItem').first.click()
  },

  async draftShouldHaveData(email, copyEmail, subject) {
    await $$('/Window/Pane/Pane/Pane/Edit').should(
      have.texts(email, copyEmail, subject),
    )
  },

  async draftShouldHaveText(text) {
    await $('Body').should(have.text(text))
  },

  async openMainMenu() {
    await $('TabMail').click()
  },
}

export const message = {
  async setData(email, copyEmail, subject) {
    await $$('/Window/Pane/Pane/Edit').elementAt(0).setValue(email)
    await $$('/Window/Pane/Pane/Edit').elementAt(1).setValue(copyEmail)
    await $$('/Window/Pane/Pane/Edit').elementAt(2).setValue(subject)
  },

  async addText(text) {
    await $('//Document').setValue(text)
  },

  async saveDraft() {
    await $('FileSave').click()
    await driver.closeWindow()
  },
}

export const addIn = {
  async open() {
    await $$('/Window/Pane/ToolBar/Pane/Pane/Pane/Pane/Pane/Group/Group/Button')
      .elementBy(have.exactText('Message Compose'))
      .click()
    // workaround for disabling popup window
    await driver.executeScript('windows: keys', [
      {
        actions: [
          { virtualKeyCode: 0x1b, down: true },
          { virtualKeyCode: 0x1b, down: false },
        ],
      },
    ])
  },

  async setSignature(text) {
    await $('signature').setValue(text)
    await $('signature').pressTab()
  },

  async saveMessage() {
    await $('saveMessage').click()
  },
}
