import * as React from "react"
import * as ReactDOM from "react-dom"

const Hello: React.SFC = () => {
  return <h1>Hello World!</h1>
}

ReactDOM.render(
  <Hello />,
  document.body
)
