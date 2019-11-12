import React, { useContext } from "react"
import { Simulate, act } from "react-dom/test-utils"
import { render, unmountComponentAtNode } from "react-dom"
import DialogProvider, { useDialog } from ".."

let root: HTMLElement | undefined = undefined
beforeEach(() => {
  root = document.createElement("div")
  document.body.appendChild(root)
})

afterEach(() => {
  unmountComponentAtNode(root!)
  root?.remove()
  root = undefined
})

const TestContext = React.createContext("It should not be shown!!")

const TestComponent: React.FC<{ callApi: VoidFunction }> = ({ callApi }) => {
  const dialog = useDialog()
  const someContext = useContext(TestContext)

  const onClick = async () => {
    const ok = await dialog.confirm(
      <>
        Are you <strong>REALLY</strong> sure?
      </>,
      { ok: "YES", cancel: "NO" }
    )
    if (!ok) {
      return
    }

    callApi()
  }

  return (
    <>
      <button id="push-me" onClick={onClick}>
        push me
      </button>
      <div>{someContext}</div>
    </>
  )
}

describe("react-async-dialog/DialogProvider", () => {
  describe("just has children", () => {
    let container: HTMLElement | undefined = undefined
    beforeEach(() => {
      container = document.createElement("div")
      document.body.appendChild(container)
    })

    afterEach(() => {
      container?.remove()
      container = undefined
    })

    it("renders", () => {
      act(() => {
        render(
          <DialogProvider container={container}>
            <div>Hello World</div>
          </DialogProvider>,
          root!
        )
      })

      expect(root?.innerHTML).toMatchSnapshot()
    })

    it("opens modal", async () => {
      const callApi = jest.fn()

      act(() => {
        render(
          <DialogProvider>
            <TestContext.Provider value="This message should be shown below the button">
              <TestComponent callApi={callApi} />
            </TestContext.Provider>
          </DialogProvider>,
          root!
        )
      })

      const button = document.querySelector("#push-me")!
      act(() => {
        Simulate.click(button)
      })

      expect(document.body.innerHTML).toMatchSnapshot()

      // REVIEW: Portal's container has only OK or Cancel button
      // the first one should be OK button
      const okButton = document.querySelector("[data-dialog-root] button")!
      await act(async () => {
        Simulate.click(okButton)
      })

      expect(callApi).toHaveBeenCalled()
    })
  })
})
