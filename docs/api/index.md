# API 参考

## ModelViewer 组件

`ModelViewer` 是一个基于 `@google/model-viewer` 的 React 组件，用于在网页中展示 3D 模型。

### 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelSrc | `string` | - | 模型文件路径，**必填** |
| autoRotate | `boolean` | `true` | 是否自动旋转 |
| cameraControls | `boolean` | `true` | 是否启用相机控制 |
| disablePan | `boolean` | `false` | 是否禁用平移 |
| minCameraOrbit | `string` | `'auto auto 0m'` | 最小相机轨道 |
| maxCameraOrbit | `string` | `'auto auto 10m'` | 最大相机轨道 |
| cameraTarget | `string` | `'auto'` | 相机目标点 |
| cameraOrbit | `string` | `'auto auto auto'` | 相机轨道 |
| exposure | `number` | `1` | 曝光度 |
| shadowIntensity | `number` | `1` | 阴影强度 |
| shadowSoftness | `number` | `1` | 阴影柔和度 |
| environmentImage | `string` | `'neutral'` | 环境贴图 |
| interactionPrompt | `'none' \| 'auto' \| 'manual'` | `'none'` | 交互提示 |
| poster | `string` | - | 加载时显示的海报图 |
| loading | `'eager' \| 'lazy'` | `'eager'` | 加载策略 |
| renderMode | `'solid' \| 'wireframe' \| 'transparent'` | `'solid'` | 渲染模式 |
| rotationPerSecond | `number` | `2` | 自动旋转速度（度/秒） |
| className | `string` | `''` | CSS 类名 |
| style | `React.CSSProperties` | `{}` | 内联样式 |
| onLoad | `() => void` | - | 模型加载完成回调 |
| azimuth | `number` | - | 方位角（度），控制水平方向角度 |
| elevation | `number` | - | 仰角（度），控制垂直方向角度 |
| distance | `number \| string` | - | 相机距离（米），可以是数字或字符串（如 "2m"） |

### 属性详解

#### modelSrc

模型文件的路径，支持 `.glb` 和 `.gltf` 格式。

```tsx
<ModelViewer modelSrc="/model/cheese.glb" />
```

#### autoRotate

控制模型是否自动旋转。

```tsx
<ModelViewer modelSrc="/model.glb" autoRotate={false} />
```

#### cameraControls

控制是否允许用户通过鼠标/触摸操作相机。

```tsx
<ModelViewer modelSrc="/model.glb" cameraControls={false} />
```

#### cameraOrbit

设置相机轨道，格式为 `"azimuth elevation radius"`。

```tsx
<ModelViewer
  modelSrc="/model.glb"
  cameraOrbit="45deg 60deg 2m"
/>
```

#### minCameraOrbit / maxCameraOrbit

限制相机轨道的范围。

```tsx
<ModelViewer
  modelSrc="/model.glb"
  minCameraOrbit="0deg 45deg 0.5m"
  maxCameraOrbit="360deg 90deg 10m"
/>
```

#### azimuth

方位角，控制相机在水平方向的角度。

```tsx
<ModelViewer modelSrc="/model.glb" azimuth={45} />
```

#### elevation

仰角，控制相机在垂直方向的角度：
- `0deg` - 水平视角（平视）
- `90deg` - 俯视视角
- `-90deg` - 仰视视角

```tsx
<ModelViewer modelSrc="/model.glb" elevation={30} />
```

#### distance

相机到模型的距离，单位为米。

```tsx
// 数字形式
<ModelViewer modelSrc="/model.glb" distance={5} />

// 字符串形式
<ModelViewer modelSrc="/model.glb" distance="3m" />
```

#### 角度参数组合使用

`azimuth`、`elevation`、`distance` 可以单独使用或组合使用，比 `cameraOrbit` 更直观。

```tsx
// 组合使用
<ModelViewer
  modelSrc="/model.glb"
  azimuth={45}
  elevation={30}
  distance={5}
/>

// 等同于
<ModelViewer modelSrc="/model.glb" cameraOrbit="45deg 30deg 5m" />
```

#### exposure

调整场景的曝光度，范围通常在 0 到 2 之间。

```tsx
<ModelViewer modelSrc="/model.glb" exposure={1.5} />
```

#### shadowIntensity

调整阴影的强度，范围在 0 到 1 之间。

```tsx
<ModelViewer modelSrc="/model.glb" shadowIntensity={0.8} />
```

#### environmentImage

设置环境贴图，可选值：
- `'neutral'` - 中性环境贴图（默认）
- `'legacy'` - 旧版环境贴图
- 自定义 URL

```tsx
<ModelViewer modelSrc="/model.glb" environmentImage="neutral" />
```

#### renderMode

设置渲染模式：
- `'solid'` - 材质模式（默认）
- `'wireframe'` - 线框模式
- `'transparent'` - 透明模式

```tsx
<ModelViewer modelSrc="/model.glb" renderMode="wireframe" />
```

#### rotationPerSecond

设置自动旋转速度，单位为度/秒。

```tsx
<ModelViewer modelSrc="/model.glb" rotationPerSecond={4} />
```

#### onLoad

模型加载完成时的回调函数。

```tsx
<ModelViewer 
  modelSrc="/model.glb" 
  onLoad={() => console.log('模型加载完成')} 
/>
```

### Ref 用法

组件支持 ref 转发，可以通过 ref 访问底层的 `model-viewer` 元素，调用其原生方法。

```tsx
import { useRef, useEffect } from 'react'
import { ModelViewer } from '@cheese/model-viewer'

function MyComponent() {
  const modelViewerRef = useRef<HTMLModelViewerElement>(null)

  useEffect(() => {
    // 调用原生方法
    modelViewerRef.current?.resetCamera()
  }, [])

  const handleZoom = () => {
    modelViewerRef.current?.zoom(1.25)
  }

  return (
    <div>
      <ModelViewer ref={modelViewerRef} modelSrc="/model.glb" />
      <button onClick={handleZoom}>放大</button>
    </div>
  )
}
```

### 原生方法

通过 ref 可以调用以下原生方法：

| 方法 | 说明 |
|------|------|
| `resetCamera()` | 重置相机到初始状态 |
| `zoom(factor: number)` | 缩放视图，factor > 1 放大，0 < factor < 1 缩小 |
| `toBlob()` | 返回当前画面的 Blob 对象（用于截图） |
| `getCameraOrbit()` | 获取当前相机轨道 |
| `setCameraOrbit(orbit: string)` | 设置相机轨道 |

### CSS 类名

组件使用以下 CSS 类名：

| 类名 | 说明 |
|------|------|
| `.model-viewer-container` | 容器元素 |

### 事件监听

组件内部监听以下事件：

- **load**：模型加载完成时触发，用于调用 `onLoad` 回调

### 注意事项

1. 确保模型文件路径正确，建议将模型文件放在 public 目录下
2. 支持的模型格式：glb、gltf
3. 某些浏览器可能需要 HTTPS 环境才能正常加载模型
4. 移动端需要用户手势交互才能播放动画
