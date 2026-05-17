import { forwardRef, ForwardedRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import '@google/model-viewer'

export interface ModelViewerProps {
  modelSrc: string
  autoRotate?: boolean
  cameraControls?: boolean
  disablePan?: boolean
  minCameraOrbit?: string
  maxCameraOrbit?: string
  cameraTarget?: string
  cameraOrbit?: string
  exposure?: number
  shadowIntensity?: number
  shadowSoftness?: number
  environmentImage?: string
  interactionPrompt?: 'none' | 'auto' | 'manual'
  poster?: string
  loading?: 'eager' | 'lazy'
  renderMode?: 'solid' | 'wireframe' | 'transparent'
  rotationPerSecond?: number
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  
  azimuth?: number
  elevation?: number
  distance?: number | string
}

export interface ModelViewerHandle {
  resetCamera: () => void
  toBlob: () => Promise<Blob | null>
  cameraOrbit: string
}

const ModelViewer = forwardRef<ModelViewerHandle, ModelViewerProps>(function ModelViewer(
  {
    modelSrc,
    autoRotate = true,
    cameraControls = true,
    disablePan = false,
    minCameraOrbit = 'auto auto 0m',
    maxCameraOrbit = 'auto auto 10m',
    cameraTarget = 'auto',
    cameraOrbit = 'auto auto auto',
    exposure = 1,
    shadowIntensity = 1,
    shadowSoftness = 1,
    environmentImage = 'neutral',
    interactionPrompt = 'none',
    poster,
    loading = 'eager',
    renderMode = 'solid',
    rotationPerSecond = 2,
    className = '',
    style = {},
    onLoad,
    
    azimuth,
    elevation,
    distance
  }: ModelViewerProps,
  ref: ForwardedRef<ModelViewerHandle>
) {
  const modelViewerRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, (): ModelViewerHandle => {
    const element = modelViewerRef.current as (HTMLElement & {
      resetCamera(): void
      toBlob(): Promise<Blob | null>
      cameraOrbit: string
    }) | null
    if (!element) {
      return {
        resetCamera: () => {},
        toBlob: async () => null,
        cameraOrbit: 'auto auto auto'
      }
    }
    
    return {
      resetCamera: () => element.resetCamera(),
      toBlob: () => element.toBlob(),
      cameraOrbit: element.cameraOrbit
    }
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      if (onLoad) {
        onLoad()
      }
    }
    
    if (modelViewerRef.current) {
      modelViewerRef.current.addEventListener('load', handleLoad)
      return () => {
        modelViewerRef.current?.removeEventListener('load', handleLoad)
      }
    }
  }, [onLoad])

  const computedCameraOrbit = useMemo(() => {
    if (azimuth !== undefined || elevation !== undefined || distance !== undefined) {
      const az = azimuth !== undefined ? `${azimuth}deg` : 'auto'
      const el = elevation !== undefined ? `${elevation}deg` : 'auto'
      const dist = typeof distance === 'number' ? `${distance}m` : distance || 'auto'
      return `${az} ${el} ${dist}`
    }
    return cameraOrbit
  }, [azimuth, elevation, distance, cameraOrbit])

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '400px',
    ...style
  }

  const viewerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%'
  }

  return (
    <div className={`model-viewer-container ${className}`} style={containerStyle}>
      <model-viewer
        ref={modelViewerRef}
        src={modelSrc}
        auto-rotate={autoRotate}
        rotation-per-second={`${rotationPerSecond}deg`}
        camera-controls={cameraControls}
        disable-pan={disablePan}
        min-camera-orbit={minCameraOrbit}
        max-camera-orbit={maxCameraOrbit}
        camera-orbit={computedCameraOrbit}
        camera-target={cameraTarget}
        exposure={exposure}
        shadow-intensity={shadowIntensity}
        shadow-softness={shadowSoftness}
        environment-image={environmentImage}
        interaction-prompt={interactionPrompt}
        poster={poster}
        loading={loading}
        render-style={renderMode}
        style={viewerStyle}
      />
      <style>{`
        .model-viewer-container {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
})

export default ModelViewer
