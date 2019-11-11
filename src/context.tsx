import React, { createContext, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { DefaultLayout } from "./layout"
import { AnyEvent, LayoutProps } from "./types"

export const Dialog = createContext({
  async alert(children: React.ReactNode, _labels?: { ok: string; cancel: string }) {
    if (typeof children === 'string') {
      alert(children)
    }
    return true
  },
  async confirm(children: React.ReactNode, _labels?: { ok: string; cancel: string }) {
    if (typeof children === 'string') {
      return confirm(children)
    }
    return true
  },
  async portal(_children: React.ReactNode, _labels?: { ok: string; cancel: string }) {
    return true
  }
})

const defaultLabels = { ok: 'OK', cancel: 'Cancel' }

export default function DialogProvider({
  layout = DefaultLayout,
  container = document.body,
  children
}: {
  layout: React.ComponentType<LayoutProps>
  container?: HTMLElement
  children: React.ReactNode
}) {
  const [portal, setPortal] = useState<React.ReactPortal | null>(null)

  const createOpener = useCallback(
    (Component: React.ComponentType<LayoutProps>) => (
      children: React.ReactNode,
      labels?: { ok?: string; cancel?: string }
    ) =>
      new Promise<boolean>(resolve => {
        const onResolve = (answer: boolean) => (e: AnyEvent) => {
          e.preventDefault()
          setPortal(null)
          resolve(answer)
        }

        const portal = createPortal(
          <Component
            onOk={onResolve(true)}
            onCancel={onResolve(false)}
            children={children}
            labels={{ ...defaultLabels, ...labels }}
          />,
          container
        )

        setPortal(portal)
      }),
    [layout, children, container]
  )

  return (
    <Dialog.Provider
      value={{
        alert: createOpener(layout),
        confirm: createOpener(layout),
        portal: createOpener(React.Fragment)
      }}>
      {children}
      {portal}
    </Dialog.Provider>
  )
}
