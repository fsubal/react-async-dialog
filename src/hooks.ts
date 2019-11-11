import { useContext } from "react"
import { Dialog } from "./context"

export function useDialog() {
  return useContext(Dialog)
}
