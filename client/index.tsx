import * as React from "react"
import * as ReactDOM from "react-dom"
import { observable, action } from "mobx"

class Ping extends React.PureComponent<{ store: Store }> {
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

  @action async ping() {
    const res = await fetch('/api/ping')
    this.message = (await res.json() as PingResponse).message
  }
}

ReactDOM.render(
  <Ping store={new Store()} />,
  document.body
)
