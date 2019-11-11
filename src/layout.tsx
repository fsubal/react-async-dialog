import React from "react"
import { LayoutProps } from "./types"

/**
 * Using inline CSS so that no dependencies are coming
 *
 * ( want it to work no matter whether we use CSS Modules, or any CSS in JS )
 */

const Backdrop: React.FC = ({ children }) => (
  <div
    style={{
      position: "fixed",
      backgroundColor: "rgba(0, 0, 64, 0.5)",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {children}
  </div>
)

const Container: React.FC = ({ children }) => (
  <div
    style={{
      width: 600,
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 8
    }}
  >
    {children}
  </div>
)

export const DefaultLayout: React.FC<LayoutProps> = ({
  labels,
  children,
  onOk,
  onCancel
}) => {
  return (
    <Backdrop>
      <Container>
        <div>{children}</div>
        <div>
          <button onClick={onOk}>{labels.ok}</button>
          <button onClick={onCancel}>{labels.cancel}</button>
        </div>
      </Container>
    </Backdrop>
  )
}
