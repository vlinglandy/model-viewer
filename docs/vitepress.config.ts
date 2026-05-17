import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@cheese/model-viewer',
  description: '一个基于 @google/model-viewer 的 React 3D模型查看器组件',
  outDir: './.vitepress/dist',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/' },
      { text: 'API 参考', link: '/api/' },
      { text: 'Demo', link: '/demo/' }
    ],
    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '简介', link: '/' },
          { text: '快速开始', link: '/guide/' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'ModelViewer 组件', link: '/api/' }
        ]
      },
      {
        text: '演示',
        items: [
          { text: '在线演示', link: '/demo/' }
        ]
      }
    ]
  }
})