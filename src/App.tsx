import * as React from 'react'
import TextInsertion from './TextInsertion'
import { makeStyles } from '@fluentui/react-components'

interface AppProps {
  title: string
}

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
})

const App = (props: AppProps) => {
  const styles = useStyles()
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  return (
    <div className={styles.root}>
      <TextInsertion />
    </div>
  )
}

export default App
