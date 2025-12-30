import React from 'react';
import LiquidGlass from 'liquid-glass-react';
import './App.css';

function App() {
  // 水滴点击效果
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="app">
      {/* 固定定位的液态玻璃元素 */}
      <div className="fixed-container">
        {/* 液态玻璃按钮 */}
        <LiquidGlass
          className="liquid-glass-btn-wrapper"
          displacementScale={64}
          blurAmount={0.1}
          saturation={130}
          aberrationIntensity={2}
          elasticity={0.35}
          cornerRadius={100}
          padding="20px 50px"
        >
          <button className="liquid-glass-btn" onClick={handleRipple}>
            点击体验水滴效果
          </button>
        </LiquidGlass>

        {/* 毛玻璃矩形卡片 */}
        <LiquidGlass
          className="frost-glass-box"
          displacementScale={32}
          blurAmount={0.15}
          saturation={110}
          elasticity={0.2}
          cornerRadius={16}
          padding="30px"
        >
          <h2>液态玻璃矩形</h2>
          <p>这个卡片使用了真正的液态玻璃效果，光线会根据鼠标位置动态折射，边缘有微妙的弯曲变形，比纯 CSS 效果更有质感！</p>
        </LiquidGlass>
      </div>

      {/* 可滚动的背景内容 */}
      <div className="scroll-content">
        <article>
          <h2>第一章：探索液态玻璃</h2>
          <p>向下滚动，观察上方的元素如何保持固定位置。液态玻璃效果会根据您的鼠标移动产生动态折射，就像真实的水滴或玻璃一样。</p>
          
          <p>这是真正的 WebGL 实现的液态效果，不是简单的 backdrop-filter 模糊。您会看到光线折射、边缘弯曲、色差偏移等高级视觉效果。</p>
          
          <p>继续滚动... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          
          <h2>第二章：技术原理</h2>
          <p>liquid-glass-react 使用 WebGL 着色器模拟光线穿过不规则玻璃表面的物理现象，包括菲涅尔效应、色差、动态折射等。</p>
          
          <p>这种方法比纯 CSS 性能更好，效果更真实，但需要在 React 环境中使用。</p>
          
          <h2>第三章：交互体验</h2>
          <p>点击上方的按钮，会触发"水滴"扩散动画（"dua" 一下的感觉）。这是通过 JavaScript 动态创建的涟漪效果，模拟水滴落入液面的瞬间。</p>
          
          <p>感谢您的体验！现在您看到了真正的液态玻璃效果。</p>
        </article>
      </div>
    </div>
  );
}

export default App;
