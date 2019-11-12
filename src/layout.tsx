import React from "react"
import { LayoutProps } from "./types"

/**
 * Using inline CSS so that no dependencies are coming
 *
 * ( want it to work no matter whether we use CSS Modules, or any CSS in JS )
 */

const Backdrop: React.FC = ({ children }) => (
  <div
    data-dialog-root
    style={{
      position: "fixed",
      backgroundColor: "rgba(24, 24, 36, 0.7)",
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

const Body: React.FC = ({ children }) => (
  <div
    style={{
      padding: 16
    }}
  >
    {children}
  </div>
)

const Footer: React.FC = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      padding: "8px 8px 8px 12px",
      borderTop: "1px solid #ddd"
    }}
  >
    {children}
  </div>
)

const Button: React.FC<{
  type: "primary" | "default"
  onClick: React.MouseEventHandler<HTMLButtonElement>
}> = ({ type, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      appearance: "none",
      cursor: "pointer",
      border: 0,
      borderRadius: 4,
      margin: "0 4px",
      fontSize: "0.875em",
      backgroundColor: type === "primary" ? "#4466ee" : "#c4c4c4",
      color: "#fff",
      display: "flex",
      justifyContent: "flex-end",
      padding: "8px 16px",
      borderTop: "1px solid #ddd"
    }}
  >
    {children}
  </button>
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
        <Body>{children}</Body>
        <Footer>
          <Button type="primary" onClick={onOk}>
            {labels.ok}
          </Button>
          <Button type="default" onClick={onCancel}>
            {labels.cancel}
          </Button>
        </Footer>
      </Container>
    </Backdrop>
  )
}
