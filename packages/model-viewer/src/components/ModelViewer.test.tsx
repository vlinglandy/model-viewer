import { render } from '@testing-library/react'
import ModelViewer from './ModelViewer'

vi.mock('@google/model-viewer', () => ({
  default: {}
}))

describe('ModelViewer', () => {
  const mockModelSrc = '/model/test.glb'

  test('renders the component', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} />)
    const modelViewerContainer = container.querySelector('.model-viewer-container')
    expect(modelViewerContainer).toBeInTheDocument()
  })

  test('renders with custom className', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} className="custom-class" />)
    const modelViewerContainer = container.querySelector('.model-viewer-container')
    expect(modelViewerContainer).toHaveClass('custom-class')
  })

  test('applies autoRotate prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} autoRotate={true} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('auto-rotate', 'true')
  })

  test('applies cameraControls prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} cameraControls={true} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-controls', 'true')
  })

  test('applies renderMode prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} renderMode="wireframe" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('render-style', 'wireframe')
  })

  test('applies rotationPerSecond prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} rotationPerSecond={5} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('rotation-per-second', '5deg')
  })

  test('applies cameraOrbit prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} cameraOrbit="0deg 90deg 2m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', '0deg 90deg 2m')
  })

  test('applies exposure prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} exposure={1.5} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('exposure', '1.5')
  })

  test('applies shadowIntensity prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} shadowIntensity={0.5} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('shadow-intensity', '0.5')
  })

  test('applies environmentImage prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} environmentImage="legacy" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('environment-image', 'legacy')
  })

  test('applies interactionPrompt prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} interactionPrompt="auto" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('interaction-prompt', 'auto')
  })

  test('applies loading prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} loading="lazy" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('loading', 'lazy')
  })

  test('applies poster prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} poster="/poster.jpg" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('poster', '/poster.jpg')
  })

  test('applies disablePan prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} disablePan={true} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('disable-pan', 'true')
  })

  test('applies minCameraOrbit prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} minCameraOrbit="0deg 45deg 1m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('min-camera-orbit', '0deg 45deg 1m')
  })

  test('applies maxCameraOrbit prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} maxCameraOrbit="360deg 90deg 10m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('max-camera-orbit', '360deg 90deg 10m')
  })

  test('applies cameraTarget prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} cameraTarget="0m 1m 0m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-target', '0m 1m 0m')
  })

  test('applies shadowSoftness prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} shadowSoftness={0.8} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('shadow-softness', '0.8')
  })

  test('applies azimuth prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} azimuth={45} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', '45deg auto auto')
  })

  test('applies elevation prop correctly', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} elevation={30} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', 'auto 30deg auto')
  })

  test('applies distance prop correctly as number', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} distance={5} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', 'auto auto 5m')
  })

  test('applies distance prop correctly as string', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} distance="3m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', 'auto auto 3m')
  })

  test('applies all angle props together', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} azimuth={45} elevation={30} distance={5} />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', '45deg 30deg 5m')
  })

  test('cameraOrbit takes precedence when no angle props provided', () => {
    const { container } = render(<ModelViewer modelSrc={mockModelSrc} cameraOrbit="0deg 90deg 2m" />)
    const modelViewer = container.querySelector('model-viewer')
    expect(modelViewer).toHaveAttribute('camera-orbit', '0deg 90deg 2m')
  })
})
