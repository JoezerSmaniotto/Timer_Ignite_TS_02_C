import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'

import { Button } from './Components/Button'
import { dafaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={dafaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="danger" />
      <GlobalStyle />
    </ThemeProvider>
  )
}
