import * as React from 'react'
import { useState } from 'react'
import { Button, Field, Textarea } from '@fluentui/react-components'

const TextInsertion: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [text, setText] = useState<string>('')

  const handleTextInsertion = async () => {
    const insertText = async (to: string, subject: string, text: string) => {
      try {
        Office.context.mailbox.item.to.setAsync(
          [to],
          (asyncResult: Office.AsyncResult<void>) => {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
              throw asyncResult.error.message
            }
          },
        )
        Office.context.mailbox.item.subject.setAsync(
          subject,
          (asyncResult: Office.AsyncResult<void>) => {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
              throw asyncResult.error.message
            }
          },
        )
        Office.context.mailbox.item.body.setSelectedDataAsync(
          text,
          { coercionType: Office.CoercionType.Text },
          (asyncResult: Office.AsyncResult<void>) => {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
              throw asyncResult.error.message
            }
          },
        )
      } catch (error) {
        console.log('Error: ' + error)
      }
    }
    await insertText(recipient, subject, text)
  }

  const handleMessageSaving = async () => {
    const saveDraft = async () => {
      Office.context.mailbox.item.saveAsync(
        (asyncResult: Office.AsyncResult<string>) => {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            throw asyncResult.error.message
          }
        },
      )
      Office.context.mailbox.item.close()
    }

    await saveDraft()
  }

  const handleRecipientChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRecipient(event.target.value)
  }

  const handleSubjectChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSubject(event.target.value)
  }

  const handleTextChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(event.target.value)
  }

  return (
    <div>
      <Field size="medium" label="Address">
        <Textarea
          size="medium"
          value={recipient}
          onChange={handleRecipientChange}
          id={'recipient'}
        />
      </Field>
      <Field size="medium" label="Subject">
        <Textarea
          size="medium"
          value={subject}
          onChange={handleSubjectChange}
          id="subject"
        />
      </Field>
      <Field size="medium" label="Message">
        <Textarea
          size="medium"
          value={text}
          onChange={handleTextChange}
          id="message"
        />
      </Field>
      <Field>Click the button to insert text.</Field>
      <Button
        appearance="primary"
        disabled={false}
        size="medium"
        id="composeMessage"
        onClick={handleTextInsertion}
      >
        Set message data
      </Button>
      <Button
        appearance="primary"
        disabled={false}
        size="medium"
        id="saveMessage"
        onClick={handleMessageSaving}
      >
        Save message draft
      </Button>
    </div>
  )
}

export default TextInsertion
