import * as React from 'react'
import { useState } from 'react'
import { Button, Field, Textarea } from '@fluentui/react-components'

const TextInsertion: React.FC = () => {
  const [signature, setSignature] = useState<string>('')

  const handleTextInsertion = async event => {
    const insertText = async (signature: string) => {
      try {
        Office.context.mailbox.item.body.setSelectedDataAsync(
          signature,
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
    await insertText(signature)
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

  const handleSignatureChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSignature(event.target.value)
  }

  return (
    <div>
      <Field size="medium" label="Signature">
        <Textarea
          size="medium"
          value={signature}
          onChange={handleSignatureChange}
          onBlur={handleTextInsertion}
          id="signature"
        />
      </Field>
      <Field>Click the button to save draft.</Field>
      <Button
        appearance="primary"
        disabled={false}
        size="medium"
        id="saveMessage"
        onClick={handleMessageSaving}
      >
        Save message
      </Button>
    </div>
  )
}

export default TextInsertion
