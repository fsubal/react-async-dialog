import React from "react"
import { action } from "@storybook/addon-actions"
import { withKnobs, text } from "@storybook/addon-knobs"
import { DefaultLayout } from "../layout"

export const defaultLayout = () => {
  return (
    <DefaultLayout
      onOk={action("onOk")}
      onCancel={action("onCancel")}
      labels={{ ok: text("OK", "OK"), cancel: text("Cancel", "Cancel") }}
    >
      Hello <strong>World!</strong>
    </DefaultLayout>
  )
}

export default {
  title: "Layout",
  decorators: [withKnobs]
}
