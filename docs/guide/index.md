# 使用指南

## 安装

使用 pnpm 安装：

```bash
pnpm add @cheese/model-viewer
```

使用 npm 安装：

```bash
npm install @cheese/model-viewer
```

使用 yarn 安装：

```bash
yarn add @cheese/model-viewer
```

## 快速开始

### 基本用法

```tsx
import { ModelViewer } from '@cheese/model-viewer'

function App() {
  return (
    <div style={{ height: '600px' }}>
      <ModelViewer modelSrc="/path/to/model.glb" />
    </div>
  )
}
```

### 自定义配置

```tsx
<ModelViewer
  modelSrc="/model/cheese.glb"
  autoRotate={true}
  cameraControls={true}
  minCameraOrbit="auto auto 0.5m"
  maxCameraOrbit="auto auto 10m"
  style={{ height: '500px' }}
/>
```

## 交互功能

### 鼠标操作

| 操作 | 效果 |
|------|------|
| **滚轮** | 放大/缩小模型 |
| **左键拖拽** | 旋转模型视角 |
| **右键拖拽** | 平移视图 |

### 自动旋转

模型默认会自动环绕旋转，当用户进行交互操作后，旋转会暂停，3秒无操作后自动恢复。

### 控制按钮

组件提供了以下控制按钮（在 Demo 中展示）：

- **视角控制**：正面、侧面、俯视、45°角
- **缩放控制**：放大、缩小、重置
- **渲染模式**：材质、线框、透明
- **视觉效果**：光影开关、阴影开关
- **背景切换**：白色、灰色、透明
- **旋转速度**：慢、中、快
- **其他功能**：锁定、截图、全屏

## 示例

### 示例1：基础用法

```tsx
import { ModelViewer } from '@cheese/model-viewer'

function BasicExample() {
  return (
    <ModelViewer
      modelSrc="/model/cheese.glb"
      style={{ height: '400px' }}
    />
  )
}
```

### 示例2：自定义配置

```tsx
import { ModelViewer } from '@cheese/model-viewer'

function CustomExample() {
  return (
    <ModelViewer
      modelSrc="/model/cheese.glb"
      autoRotate={false}
      cameraControls={true}
      exposure={1.2}
      shadowIntensity={0.8}
      style={{ height: '500px' }}
    />
  )
}
```

### 示例3：多个模型切换

```tsx
import { useState } from 'react'
import { ModelViewer } from '@cheese/model-viewer'

function MultiModelExample() {
  const [model, setModel] = useState('cheese')
  
  const models = {
    cheese: '/model/cheese.glb',
    icecream: '/model/icecream.glb'
  }

  return (
    <div>
      <select onChange={(e) => setModel(e.target.value)}>
        <option value="cheese">奶酪</option>
        <option value="icecream">冰淇淋</option>
      </select>
      <ModelViewer
        modelSrc={models[model as keyof typeof models]}
        style={{ height: '500px' }}
      />
    </div>
  )
}
```

### 示例4：使用 Ref 控制

```tsx
import { useRef } from 'react'
import { ModelViewer } from '@cheese/model-viewer'

function RefExample() {
  const modelViewerRef = useRef<HTMLModelViewerElement>(null)

  const handleReset = () => {
    modelViewerRef.current?.resetCamera()
  }

  const handleZoomIn = () => {
    modelViewerRef.current?.zoom(1.25)
  }

  const handleZoomOut = () => {
    modelViewerRef.current?.zoom(0.8)
  }

  return (
    <div>
      <div style={{ height: '500px' }}>
        <ModelViewer
          ref={modelViewerRef}
          modelSrc="/model/cheese.glb"
        />
      </div>
      <div>
        <button onClick={handleZoomIn}>放大</button>
        <button onClick={handleZoomOut}>缩小</button>
        <button onClick={handleReset}>重置</button>
      </div>
    </div>
  )
}
```

### 示例5：加载完成回调

```tsx
import { useState } from 'react'
import { ModelViewer } from '@cheese/model-viewer'

function LoadCallbackExample() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      {isLoading && <div>加载中...</div>}
      <ModelViewer
        modelSrc="/model/cheese.glb"
        onLoad={() => setIsLoading(false)}
        style={{ height: '500px' }}
      />
    </div>
  )
}
```

## 注意事项

1. **模型路径**：确保模型文件路径正确，建议将模型文件放在 public 目录下
2. **支持格式**：支持的模型格式：glb、gltf
3. **文件大小**：建议使用较小的模型文件以提高加载速度
4. **HTTPS 环境**：某些浏览器可能需要 HTTPS 环境才能正常加载模型
5. **移动端**：移动端需要用户手势交互才能播放动画
6. **容器高度**：需要为容器设置明确的高度，否则组件可能无法正常显示

## 常见问题

### Q: 模型无法显示？

A: 请检查以下几点：
- 模型文件路径是否正确
- 模型文件格式是否为 glb 或 gltf
- 浏览器控制台是否有错误信息
- 是否在 HTTPS 环境下运行（某些浏览器限制）

### Q: 自动旋转不生效？

A: 请确保 `autoRotate` 属性设置为 `true`（默认值），并且没有被用户交互暂停。

### Q: 如何自定义样式？

A: 可以通过 `className` 属性添加自定义 CSS 类，或通过 `style` 属性添加内联样式。

### Q: 如何获取模型加载状态？

A: 可以使用 `onLoad` 属性监听模型加载完成事件。

## 性能优化建议

1. **使用轻量化模型**：减小模型文件大小
2. **启用懒加载**：使用 `loading="lazy"` 属性
3. **设置海报图**：使用 `poster` 属性提供加载时的占位图
4. **限制相机范围**：通过 `minCameraOrbit` 和 `maxCameraOrbit` 限制相机移动范围
