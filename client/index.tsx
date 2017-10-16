import * as React from "react"
import * as ReactDOM from "react-dom"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

@observer
class Ping extends React.Component<{ store: Store }> {
  render() {
    return (
      <div>
        <button onClick={this.props.store.ping}>ping</button>
        <h1>{this.props.store.message}</h1>
      </div>
    )
  }
}

type PingResponse = {
  message: string
}

class Store {
  @observable message: string = 'no data'

  @action.bound async ping() {
    const res = await fetch('/api/ping')
    const data = await res.json() as PingResponse
    this.message = data.message
  }
}

ReactDOM.render(
  <Ping store={new Store()} />,
  document.querySelector('#app')
)
