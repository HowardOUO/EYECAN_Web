# EYECAN 眼肿瘤科普网站

这是一个单页的眼肿瘤科普网站，展示眼肿瘤相关知识，包含6个模块：首页介绍、专题文章、科普文章、科普视频、实践动态和文献阅读。

## 功能特性

1. **Apple风格导航栏**：固定顶部导航，毛玻璃效果，响应式设计
2. **卡片式模块设计**：5个内容模块采用统一卡片布局
3. **响应式设计**：适配移动端、平板和桌面设备
4. **动态数据加载**：从文本文件加载链接数据
5. **平滑滚动导航**：锚点链接平滑滚动到对应模块
6. **移动端友好**：汉堡菜单，触摸优化
7. **高级可访问性**：跳过导航链接，ARIA标签，键盘导航支持
8. **性能优化**：懒加载图片，CSS变量主题系统

## 文件结构

```
EYECAN Web/
├── index.html                    # 主HTML文件
├── style.css                     # 主样式文件
├── script.js                     # 主JavaScript文件
├── README.md                     # 本文件
├── assets/
│   ├── EYECAN Logo.jpg           # 网站Logo
│   ├── landing/                  # 首页内容
│   │   ├── hero-content.txt      # 首页介绍内容
│   │   ├── statistics.txt        # 统计数据
│   │   └── call-to-action.txt    # 行动号召
│   └── Link/                     # 链接数据
│       ├── Feature Articles/     # 专题文章
│       ├── Pop Sci Articles/     # 科普文章
│       ├── Pop Sci Videos/       # 科普视频
│       ├── Pratical Dynamics/    # 实践动态
│       └── Recent Research/      # 文献阅读
```

## 技术栈

- **HTML5**：语义化标记，可访问性优化
- **CSS3**：CSS变量，Grid布局，Flexbox，媒体查询
- **JavaScript (ES6+)**：原生JavaScript，模块化设计
- **Font Awesome 6**：图标库
- **Google Fonts**：Inter和Noto Sans SC字体

## 部署方式

### 简单部署
将整个文件夹上传到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- 传统Web服务器

### 本地运行
1. 使用Python启动本地服务器：
   ```bash
   python -m http.server 8000
   ```
2. 在浏览器中打开：`http://localhost:8000`

### 自定义配置

1. **更新链接数据**：
   - 在 `assets/Link/` 目录下的对应类别文件夹中添加.txt文件
   - 文件格式：
     ```
     标题：[文章标题]
     网址：[完整URL]
     发布时间：[YYYY年MM月DD日]
     主题：[类别名称]
     ```

2. **修改样式**：
   - 编辑 `style.css` 中的CSS变量来更改主题颜色
   - 主要变量在 `:root` 选择器中定义

3. **更新内容**：
   - 编辑 `index.html` 修改静态内容
   - 更新 `assets/landing/` 中的文本文件修改首页内容

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- 移动端 Safari 和 Chrome

## 可访问性特性

- ✅ 跳过导航链接
- ✅ 适当的ARIA标签
- ✅ 键盘导航支持
- ✅ 高对比度模式支持
- ✅ 减少动画偏好支持
- ✅ 语义化HTML结构
- ✅ 图片alt文本

## 性能优化

- 图片懒加载
- CSS和JavaScript文件压缩
- 字体预连接
- 响应式图片
- 减少重绘和重排
- 代码分割（按需加载）

## 开发说明

### 添加新内容类别
1. 在 `assets/Link/` 中创建新文件夹
2. 在 `script.js` 的 `CONFIG.categories` 中添加映射
3. 在 `CONFIG.icons` 中添加图标类
4. 在HTML中添加对应的模块部分

### 样式自定义
网站使用CSS自定义属性进行主题化。主要变量包括：
- `--primary-color`：主品牌色（Apple蓝）
- `--background-color`：背景色
- `--text-primary`：主要文字颜色
- `--border-radius-*`：圆角大小
- `--shadow-*`：阴影效果

### JavaScript扩展
JavaScript采用模块化设计，主要功能包括：
- `loadAllData()`：加载所有类别数据
- `createCardElement()`：创建卡片DOM元素
- `scrollToSection()`：平滑滚动到指定区域
- 移动端菜单切换
- 活动导航链接高亮

## 许可证

本项目仅供教育和演示用途。EYECAN Logo和内容归相关所有者所有。

## 联系方式

如有问题或建议，请联系：contact@eyecan.org

---

**保护视力，从了解开始！**