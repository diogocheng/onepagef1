'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface LocationData {
  lat: number;
  lng: number;
  clubs: Array<{
    name: string;
    matches: number;
    winRate: number;
    avgDuration: number;
    topPartners: string[];
    bestTime: string;
  }>;
}

interface InteractiveGlobeProps {
  locationData: Record<string, LocationData>;
  selectedLocation: string | null;
  onLocationSelect: (location: string, clubName: string) => void;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  locationData,
  selectedLocation,
  onLocationSelect
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);

  // Convert lat/lng to 2D coordinates
  const latLngTo2D = useCallback((lat: number, lng: number, width: number, height: number, rotationOffset: number = 0) => {
    const adjustedLng = lng + rotationOffset;
    const x = ((adjustedLng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  }, []);

  // Draw the globe
  const drawGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw globe background (simple circle)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Globe background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#1E40AF';
    ctx.fill();

    // Globe border
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw grid lines (longitude)
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    for (let lng = -180; lng <= 180; lng += 30) {
      const adjustedLng = lng + rotation;
      if (Math.abs(adjustedLng % 360) <= 90 || Math.abs(adjustedLng % 360) >= 270) {
        const x = centerX + (adjustedLng / 90) * (radius * 0.8);
        if (x >= centerX - radius && x <= centerX + radius) {
          ctx.beginPath();
          ctx.moveTo(x, centerY - radius * 0.8);
          ctx.lineTo(x, centerY + radius * 0.8);
          ctx.stroke();
        }
      }
    }

    // Draw grid lines (latitude)
    for (let lat = -60; lat <= 60; lat += 30) {
      const y = centerY + (lat / 90) * (radius * 0.8);
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.abs(centerY - y), 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // Draw city markers
    Object.entries(locationData).forEach(([city, data]) => {
      const adjustedLng = data.lng + rotation;
      
      // Only show cities on the visible hemisphere
      const normalizedLng = ((adjustedLng % 360) + 360) % 360;
      if (normalizedLng > 90 && normalizedLng < 270) return;

      const x = centerX + (Math.sin((adjustedLng * Math.PI) / 180) * Math.cos((data.lat * Math.PI) / 180)) * radius * 0.9;
      const y = centerY - (Math.sin((data.lat * Math.PI) / 180)) * radius * 0.9;

      // Check if point is within globe circle
      const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      if (distFromCenter > radius) return;

      const isSelected = selectedLocation === city;

      // Draw marker
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 8 : 6, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? '#EF4444' : '#10B981';
      ctx.fill();
      
      // Draw marker border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw city label
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(city, x, y - 15);
      
      // Draw club count
      ctx.font = '10px Arial';
      ctx.fillStyle = '#FF6B35';
      ctx.fillText(`${data.clubs.length} clubs`, x, y + 20);
    });
  }, [locationData, selectedLocation, rotation, latLngTo2D]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouseX;
    setRotation(prev => prev + deltaX * 0.5);
    setLastMouseX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 20;

    // Check which city was clicked
    Object.entries(locationData).forEach(([city, data]) => {
      const adjustedLng = data.lng + rotation;
      const normalizedLng = ((adjustedLng % 360) + 360) % 360;
      if (normalizedLng > 90 && normalizedLng < 270) return;

      const x = centerX + (Math.sin((adjustedLng * Math.PI) / 180) * Math.cos((data.lat * Math.PI) / 180)) * radius * 0.9;
      const y = centerY - (Math.sin((data.lat * Math.PI) / 180)) * radius * 0.9;

      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
      if (distance <= 12) {
        onLocationSelect(city, data.clubs[0].name);
      }
    });
  };

  // Animation loop
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (!isDragging) {
        setRotation(prev => prev + 0.2);
      }
      drawGlobe();
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [drawGlobe, isDragging]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawGlobe();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawGlobe]);

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '16px',
      padding: '24px',
      height: '500px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        zIndex: 10
      }}>
        🌍 Drag to rotate • Click cities to explore
      </div>
      
      {selectedLocation && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          color: 'white',
          fontSize: '14px',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '8px 12px',
          borderRadius: '8px',
          zIndex: 10
        }}>
          Selected: {selectedLocation}
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      />
    </div>
  );
};

export default InteractiveGlobe;
