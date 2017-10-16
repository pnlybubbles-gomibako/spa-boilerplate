import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import styled, { $ } from './src/styled-components'

type TextProps = {
  emphasis: boolean
}

const Text = $<TextProps>(styled.h1)`
  color: ${p => p.emphasis ? 'red' : 'black'};
`

@observer
class Ping extends React.Component<{ store: Store }> {
  render () {
    const s = this.props.store

    return (
      <div>
        <button onClick={_ => s.ping()}>ping</button>
        <Text emphasis={s.loading}>{s.message}</Text>
      </div>
    )
  }
}

type PingResponse = {
  message: string
}

class Store {
  @observable message = 'no data'
  @observable loading = false

  @action async ping () {
    this.loading = true
    const res = await fetch('/api/ping')
    const data = await res.json() as PingResponse
    this.message = data.message
    this.loading = false
  }
}

ReactDOM.render(
  <Ping store={new Store()} />,
  document.querySelector('#app')
)
