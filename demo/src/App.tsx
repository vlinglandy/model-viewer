import { useState, useRef, useCallback, useEffect } from 'react'
import { ModelViewer, ModelViewerHandle } from '@cheese/model-viewer'

interface ModelItem {
  id: string
  name: string
  src: string
}

const models: ModelItem[] = [
  { id: 'cheese', name: 'tripo-奶酪', src: './model/奶酪.glb' },
   { id: 'unknown', name: '腾讯混元-奶酪', src: './model/6acabff98b0a4fee8941ac53b478d4f3.glb' },
  { id: 'icecream', name: '巧克力冰淇淋', src: './model/chocolate ice cream bar 3d model.glb' },
  { id: 'hamburger', name: '汉堡', src: './model/hamburger 3d model.glb' },
 ]

type RenderMode = 'solid' | 'wireframe' | 'transparent'
type BackgroundMode = 'white' | 'gray' | 'transparent'
type RotationSpeed = 'slow' | 'medium' | 'fast'

const rotationSpeedMap: Record<RotationSpeed, number> = {
  slow: 1,
  medium: 2,
  fast: 4
}

const presetViews = {
  front: { orbit: '0deg 90deg', target: '0m 0m 0m' },
  side: { orbit: '-90deg 90deg', target: '0m 0m 0m' },
  top: { orbit: '0deg 180deg', target: '0m 0m 0m' },
  golden: { orbit: '-45deg 60deg', target: '0m 0m 0m' }
}

export default function App() {
  const [selectedModel, setSelectedModel] = useState<ModelItem>(models[0])
  
  const modelViewerRef = useRef<ModelViewerHandle>(null)
  
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [renderMode, setRenderMode] = useState<RenderMode>('solid')
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('white')
  const [rotationSpeed, setRotationSpeed] = useState<RotationSpeed>('medium')
  const [isLocked, setIsLocked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isShadowsEnabled, setIsShadowsEnabled] = useState(true)
  const [isLightingEnabled, setIsLightingEnabled] = useState(true)
  const [cameraOrbit, setCameraOrbit] = useState('auto auto auto')
  const idleTimerRef = useRef<number | null>(null)

  const handleInteraction = useCallback(() => {
    if (isLocked) return
    setIsAutoRotating(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = window.setTimeout(() => {
      setIsAutoRotating(true)
    }, 3000)
  }, [isLocked])

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [])

  const resetView = useCallback(() => {
    modelViewerRef.current?.resetCamera()
    setIsAutoRotating(true)
    setCameraOrbit('auto auto auto')
  }, [])

  const setPresetView = useCallback((view: keyof typeof presetViews) => {
    const preset = presetViews[view]
    setCameraOrbit(preset.orbit)
    handleInteraction()
  }, [handleInteraction])

  const handleZoomIn = useCallback(() => {
    if (modelViewerRef.current) {
      const currentCameraOrbit = modelViewerRef.current.cameraOrbit
      const parts = currentCameraOrbit.split(' ')
      if (parts.length === 3) {
        const az = parts[0]
        const el = parts[1]
        const radius = parseFloat(parts[2])
        
        if (!isNaN(radius)) {
          const newRadius = Math.max(0.5, radius * 0.8)
          setCameraOrbit(`${az} ${el} ${newRadius}m`)
        } else {
          setCameraOrbit(`${az} ${el} 1.5m`)
        }
      }
    }
    handleInteraction()
  }, [handleInteraction])

  const handleZoomOut = useCallback(() => {
    if (modelViewerRef.current) {
      const currentCameraOrbit = modelViewerRef.current.cameraOrbit
      const parts = currentCameraOrbit.split(' ')
      if (parts.length === 3) {
        const az = parts[0]
        const el = parts[1]
        const radius = parseFloat(parts[2])
        
        if (!isNaN(radius)) {
          const newRadius = Math.min(10, radius * 1.25)
          setCameraOrbit(`${az} ${el} ${newRadius}m`)
        } else {
          setCameraOrbit(`${az} ${el} 3m`)
        }
      }
    }
    handleInteraction()
  }, [handleInteraction])

  const takeScreenshot = useCallback(() => {
    modelViewerRef.current?.toBlob().then(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'model-screenshot.png'
        link.click()
        URL.revokeObjectURL(url)
      }
    })
  }, [])

  const toggleFullscreen = useCallback(() => {
    const container = document.getElementById('viewer-container')
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement)
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  const getBackgroundStyle = () => {
    switch (backgroundMode) {
      case 'white':
        return 'rgba(255, 255, 255, 1)'
      case 'gray':
        return 'rgba(245, 245, 245, 1)'
      case 'transparent':
        return 'rgba(0, 0, 0, 0)'
      default:
        return 'rgba(255, 255, 255, 1)'
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>3D模型查看器 Demo</h1>
      </header>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>模型选择</h3>
          <select
            value={selectedModel.id}
            onChange={(e) => {
              const model = models.find(m => m.id === e.target.value)
              if (model) setSelectedModel(model)
            }}
            style={styles.select}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <div style={styles.featureList}>
            <h4 style={styles.featureTitle}>核心功能</h4>
            <ul style={styles.features}>
              <li>🎯 自动环绕旋转</li>
              <li>🔍 滚轮缩放功能</li>
              <li>🖱️ 左键拖拽旋转</li>
              <li>👆 右键平移视图</li>
              <li>🔄 一键视角重置</li>
              <li>📐 预设视角切换</li>
              <li>💡 光影效果开关</li>
              <li>🌑 投影阴影开关</li>
              <li>🎨 渲染模式切换</li>
              <li>🖼️ 背景切换</li>
              <li>⚡ 旋转速度调节</li>
              <li>📸 高清截图保存</li>
              <li>🔒 视角锁定功能</li>
              <li>⛶ 全屏沉浸式预览</li>
              <li>📱 移动端适配</li>
            </ul>
          </div>
        </div>

        <div id="viewer-container" style={{ ...styles.viewerContainer, backgroundColor: getBackgroundStyle() }}>
          <ModelViewer
            ref={modelViewerRef}
            modelSrc={selectedModel.src}
            autoRotate={isAutoRotating && !isLocked}
            cameraControls={!isLocked}
            disablePan={isLocked}
            cameraOrbit={cameraOrbit}
            exposure={isLightingEnabled ? 1 : 0.5}
            shadowIntensity={isShadowsEnabled ? 1 : 0}
            shadowSoftness={1}
            environmentImage={isLightingEnabled ? 'neutral' : 'none'}
            renderMode={renderMode}
            rotationPerSecond={rotationSpeedMap[rotationSpeed]}
            style={{ height: '100%' }}
          />

          {showControls && (
            <div style={styles.controlsPanel}>
              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>视角控制</div>
                <div style={styles.controlRow}>
                  <button onClick={() => setPresetView('front')} style={styles.controlBtn}>正面</button>
                  <button onClick={() => setPresetView('side')} style={styles.controlBtn}>侧面</button>
                  <button onClick={() => setPresetView('top')} style={styles.controlBtn}>俯视</button>
                  <button onClick={() => setPresetView('golden')} style={styles.controlBtn}>45°角</button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>缩放</div>
                <div style={styles.controlRow}>
                  <button onClick={handleZoomIn} style={styles.controlBtn}>+</button>
                  <button onClick={handleZoomOut} style={styles.controlBtn}>-</button>
                  <button onClick={resetView} style={styles.controlBtn}>重置</button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>渲染模式</div>
                <div style={styles.controlRow}>
                  <button
                    onClick={() => setRenderMode('solid')}
                    style={{ ...styles.controlBtn, ...(renderMode === 'solid' ? styles.controlBtnActive : {}) }}
                  >
                    材质
                  </button>
                  <button
                    onClick={() => setRenderMode('wireframe')}
                    style={{ ...styles.controlBtn, ...(renderMode === 'wireframe' ? styles.controlBtnActive : {}) }}
                  >
                    线框
                  </button>
                  <button
                    onClick={() => setRenderMode('transparent')}
                    style={{ ...styles.controlBtn, ...(renderMode === 'transparent' ? styles.controlBtnActive : {}) }}
                  >
                    透明
                  </button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>视觉效果</div>
                <div style={styles.controlRow}>
                  <button
                    onClick={() => setIsLightingEnabled(!isLightingEnabled)}
                    style={{ ...styles.controlBtn, ...(isLightingEnabled ? styles.controlBtnActive : {}) }}
                  >
                    光影
                  </button>
                  <button
                    onClick={() => setIsShadowsEnabled(!isShadowsEnabled)}
                    style={{ ...styles.controlBtn, ...(isShadowsEnabled ? styles.controlBtnActive : {}) }}
                  >
                    阴影
                  </button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>背景</div>
                <div style={styles.controlRow}>
                  <button
                    onClick={() => setBackgroundMode('white')}
                    style={{ ...styles.controlBtn, ...(backgroundMode === 'white' ? styles.controlBtnActive : {}) }}
                  >
                    白色
                  </button>
                  <button
                    onClick={() => setBackgroundMode('gray')}
                    style={{ ...styles.controlBtn, ...(backgroundMode === 'gray' ? styles.controlBtnActive : {}) }}
                  >
                    灰色
                  </button>
                  <button
                    onClick={() => setBackgroundMode('transparent')}
                    style={{ ...styles.controlBtn, ...(backgroundMode === 'transparent' ? styles.controlBtnActive : {}) }}
                  >
                    透明
                  </button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.sectionTitle}>旋转速度</div>
                <div style={styles.controlRow}>
                  <button
                    onClick={() => setRotationSpeed('slow')}
                    style={{ ...styles.controlBtn, ...(rotationSpeed === 'slow' ? styles.controlBtnActive : {}) }}
                  >
                    慢
                  </button>
                  <button
                    onClick={() => setRotationSpeed('medium')}
                    style={{ ...styles.controlBtn, ...(rotationSpeed === 'medium' ? styles.controlBtnActive : {}) }}
                  >
                    中
                  </button>
                  <button
                    onClick={() => setRotationSpeed('fast')}
                    style={{ ...styles.controlBtn, ...(rotationSpeed === 'fast' ? styles.controlBtnActive : {}) }}
                  >
                    快
                  </button>
                </div>
              </div>

              <div style={styles.controlSection}>
                <div style={styles.controlRow}>
                  <button
                    onClick={() => setIsLocked(!isLocked)}
                    style={{ ...styles.controlBtn, ...(isLocked ? { ...styles.controlBtnActive, backgroundColor: '#dc2626', borderColor: '#dc2626' } : {}) }}
                  >
                    {isLocked ? '解锁' : '锁定'}
                  </button>
                  <button onClick={takeScreenshot} style={styles.controlBtn}>截图</button>
                  <button onClick={toggleFullscreen} style={styles.controlBtn}>全屏</button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowControls(!showControls)}
            style={styles.toggleControlsBtn}
          >
            {showControls ? '隐藏' : '显示'}
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>使用 @cheese/model-viewer 组件构建</p>
      </footer>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  header: {
    padding: '24px',
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '8px',
    fontWeight: '600'
  },
  subtitle: {
    fontSize: '1rem',
    opacity: 0.9
  },
  content: {
    flex: 1,
    display: 'flex',
    padding: '24px',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  },
  sidebar: {
    width: '280px',
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#333'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  featureList: {
    marginTop: '16px'
  },
  featureTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#555'
  },
  features: {
    listStyle: 'none',
    padding: 0
  },
  viewerContainer: {
    flex: 1,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative'
  },
  footer: {
    padding: '16px',
    textAlign: 'center',
    color: 'white',
    opacity: 0.8,
    fontSize: '0.9rem'
  },
  controlsPanel: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
    minWidth: '180px',
    transition: 'all 0.3s ease'
  },
  controlSection: {
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '8px',
    paddingLeft: '4px'
  },
  controlRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  controlBtn: {
    flex: 1,
    minWidth: '50px',
    padding: '6px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: 'white',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  controlBtnActive: {
    background: '#4f46e5',
    borderColor: '#4f46e5',
    color: 'white'
  },
  toggleControlsBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    zIndex: 20,
    transition: 'all 0.2s ease'
  }
}
