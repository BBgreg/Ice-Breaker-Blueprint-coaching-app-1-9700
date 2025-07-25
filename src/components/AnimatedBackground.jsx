import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing nodes
    container.innerHTML = '';

    // Create nodes
    for (let i = 0; i < 30; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 6 + 's';
      container.appendChild(node);
    }

    // Create connecting lines
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.left = Math.random() * 80 + '%';
      line.style.top = Math.random() * 80 + '%';
      line.style.width = Math.random() * 200 + 100 + 'px';
      line.style.transform = `rotate(${Math.random() * 360}deg)`;
      line.style.animationDelay = Math.random() * 4 + 's';
      container.appendChild(line);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="connection-nodes" />;
};

export default AnimatedBackground;