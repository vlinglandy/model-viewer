# @cheese/model-viewer

一个基于 `@google/model-viewer` 的 React 3D模型查看器组件，提供丰富的交互功能和视觉效果调节。

## ✨ 特性

- 🎯 **自动环绕旋转** - 页面加载后模型自动匀速旋转
- 🔍 **滚轮缩放** - 支持放大缩小，有限制阈值
- 🖱️ **拖拽旋转** - 左键拖动自由调整视角
- 👆 **右键平移** - 整体平移模型位置
- 🔄 **视角重置** - 一键恢复初始状态
- 📐 **预设视角** - 正面、侧面、俯视、45°角
- 💡 **光影控制** - 环境打光开关
- 🌑 **阴影开关** - 投影阴影控制
- 🎨 **渲染模式** - 材质/线框/透明切换
- 🖼️ **背景切换** - 白色/灰色/透明
- ⚡ **速度调节** - 慢/中/快三档
- 📸 **截图保存** - 高清截图功能
- 🔒 **视角锁定** - 防止误触
- ⛶ **全屏预览** - 沉浸式体验
- 📱 **移动端适配** - 双指缩放、单指拖拽

## 🚀 快速开始

### 安装

```bash
pnpm add @cheese/model-viewer
```

### 使用

```tsx
import { ModelViewer } from '@cheese/model-viewer'

function App() {
  return (
    <ModelViewer
      modelSrc="/model/cheese.glb"
      style={{ height: '500px' }}
    />
  )
}
```

## 📖 文档

- [快速开始](guide/) - 安装和基础使用
- [API 参考](api/) - 完整的属性和方法文档

## 🌐 浏览器支持

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | 90+ | ✅ 推荐 |
| Firefox | 88+ | ✅ 支持 |
| Safari | 14+ | ✅ 支持 |
| Edge | 90+ | ✅ 支持 |

## 🛠️ 技术栈

- React 18+
- TypeScript
- @google/model-viewer

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues: [提交问题](https://github.com/cheese/model-viewer/issues)
