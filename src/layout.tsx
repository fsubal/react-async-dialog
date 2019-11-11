import React from "react"
import { LayoutProps } from "./types"

export const DefaultLayout: React.FC<LayoutProps> = ({ labels, children, onOk, onCancel }) => {
  return (
    <div>
      <div>
        <div>{children}</div>
        <div>
          <button onClick={onOk}>{labels.ok}</button>
          <button onClick={onCancel}>{labels.cancel}</button>
        </div>
      </div>
    </div>
  )
}
  