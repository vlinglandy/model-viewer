/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        'auto-rotate'?: boolean | string
        'camera-controls'?: boolean | string
        'disable-pan'?: boolean | string
        'min-camera-orbit'?: string
        'max-camera-orbit'?: string
        'camera-orbit'?: string
        'camera-target'?: string
        exposure?: number | string
        'shadow-intensity'?: number | string
        'shadow-softness'?: number | string
        'environment-image'?: string
        'interaction-prompt'?: string
        poster?: string
        loading?: string
        'render-style'?: string
        'rotation-per-second'?: string
        style?: React.CSSProperties | string
      }
    }
  }
}

export {}
