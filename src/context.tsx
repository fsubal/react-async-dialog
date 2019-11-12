import React, { createContext, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { DefaultLayout } from "./layout"
import { AnyEvent, LayoutProps } from "./types"

export type DialogFunction = (
  children: React.ReactNode,
  labels?: { ok: string; cancel: string }
) => Promise<boolean>

export interface DialogValue {
  alert: DialogFunction
  confirm: DialogFunction
  portal: DialogFunction
}

export const Dialog = createContext<DialogValue>({
  alert(_children: React.ReactNode, _labels?: { ok: string; cancel: string }) {
    throw new Error(
      "[react-async-dialog] Please render <DialogProvider> above in your tree, to use alert()"
    )
  },
  confirm(
    _children: React.ReactNode,
    _labels?: { ok: string; cancel: string }
  ) {
    throw new Error(
      "[react-async-dialog] Please render <DialogProvider> above in your tree, to use confirm()"
    )
  },
  portal(_children: React.ReactNode, _labels?: { ok: string; cancel: string }) {
    throw new Error(
      "[react-async-dialog] Please render <DialogProvider> above in your tree, to use portal()"
    )
  }
})

const defaultLabels = { ok: "OK", cancel: "Cancel" }

export default function DialogProvider({
  layout = DefaultLayout,
  container = document.body,
  children
}: {
  layout?: React.ComponentType<LayoutProps>
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
            labels={{
              ok: labels?.ok ?? defaultLabels.ok,
              cancel: labels?.cancel ?? defaultLabels.cancel
            }}
          />,
          container
        )

        setPortal(portal)
      }),
    [children, container]
  )

  return (
    <Dialog.Provider
      value={{
        alert: createOpener(layout),
        confirm: createOpener(layout),
        portal: createOpener(React.Fragment)
      }}
    >
      {children}
      {portal}
    </Dialog.Provider>
  )
}
