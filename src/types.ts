export interface AnyEvent {
  preventDefault(): void
}

export interface LayoutProps {
  labels: { ok: string; cancel?: string }
  children: React.ReactNode
  onOk(e: AnyEvent): void
  onCancel?: (e: AnyEvent) => void
}
