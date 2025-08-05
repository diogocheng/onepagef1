'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter, MapPin, Trophy, Users, Clock, Activity, ChevronDown, Globe, Zap, Target, Award } from 'lucide-react';

const PowerBIAnalytics = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('year');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [animateCharts, setAnimateCharts] = useState(false);
  const containerRef = useRef(null);

  // Location data with multiple clubs per city
  const locationData = {
    "Lisbon": {
      lat: 38.7223,
      lng: -9.1393,
      clubs: [
        {
          name: "Padel Club Lisboa",
          matches: 87,
          winRate: 62,
          avgDuration: 72,
          topPartners: ["João", "Maria"],
          bestTime: "Evening"
        },
        {
          name: "Lisbon Sports Center",
          matches: 45,
          winRate: 58,
          avgDuration: 68,
          topPartners: ["Carlos", "Ana"],
          bestTime: "Morning"
        }
      ]
    },
    "Porto": {
      lat: 41.1579,
      lng: -8.6291,
      clubs: [
        {
          name: "Porto Padel Center",
          matches: 34,
          winRate: 71,
          avgDuration: 75,
          topPartners: ["Pedro", "Rita"],
          bestTime: "Afternoon"
        }
      ]
    },
    "Faro": {
      lat: 37.0194,
      lng: -7.9322,
      clubs: [
        {
          name: "Algarve Sports Complex",
          matches: 23,
          winRate: 65,
          avgDuration: 80,
          topPartners: ["Miguel", "Sofia"],
          bestTime: "Morning"
        }
      ]
    },
    "Coimbra": {
      lat: 40.2033,
      lng: -8.4103,
      clubs: [
        {
          name: "Coimbra Padel Academy",
          matches: 45,
          winRate: 69,
          avgDuration: 70,
          topPartners: ["Tiago", "Beatriz"],
          bestTime: "Evening"
        }
      ]
    },
    "Cascais": {
      lat: 38.6968,
      lng: -9.4215,
      clubs: [
        {
          name: "Cascais Beach Padel",
          matches: 19,
          winRate: 63,
          avgDuration: 65,
          topPartners: ["André", "Catarina"],
          bestTime: "Sunset"
        }
      ]
    }
  };

  // Generate time series data - Fixed for SSR hydration
  const generateTimeSeriesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    // Use deterministic values instead of Math.random() to prevent hydration errors
    const baseValues = [18, 22, 19, 25, 21, 24, 20, 23, 26, 19, 22, 24];
    const winRates = [62, 58, 65, 71, 68, 74, 69, 72, 75, 67, 70, 73];
    const durations = [68, 72, 65, 78, 71, 75, 69, 73, 80, 67, 70, 76];
    
    months.forEach((month, index) => {
      data.push({
        month,
        matches: baseValues[index],
        winRate: winRates[index],
        avgDuration: durations[index],
        improvement: index > 0 ? Math.round((winRates[index] - 60) * 100) / 100 : 0
      });
    });
    
    return data;
  };

  const [monthlyData] = useState(generateTimeSeriesData());

  // Calculate aggregated stats
  const calculateStats = () => {
    if (selectedLocation && selectedClub) {
      const club = locationData[selectedLocation].clubs.find(c => c.name === selectedClub);
      return {
        totalMatches: club.matches,
        winRate: club.winRate,
        avgDuration: club.avgDuration,
        bestPartner: club.topPartners[0],
        preferredTime: club.bestTime
      };
    }
    
    // Overall stats
    let totalMatches = 0;
    let totalWins = 0;
    let totalDuration = 0;
    
    Object.values(locationData).forEach(city => {
      city.clubs.forEach(club => {
        totalMatches += club.matches;
        totalWins += Math.round(club.matches * club.winRate / 100);
        totalDuration += club.avgDuration * club.matches;
      });
    });
    
    return {
      totalMatches,
      winRate: Math.round(totalWins / totalMatches * 100),
      avgDuration: Math.round(totalDuration / totalMatches),
      bestPartner: "João",
      preferredTime: "Evening"
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    if (activeSection === 'dashboard') {
      setAnimateCharts(true);
    }
  }, [activeSection]);

  // Main container style
  const containerStyle = {
    minHeight: '100vh',
    background: '#F2F2F2',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden' // Contain the video within this section
  };

  const dashboardContainerStyle = {
    display: activeSection === 'dashboard' ? 'block' : 'none',
    padding: '32px',
    maxWidth: '1600px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2 // Ensure content is above video
  };

  const headerStyle = {
    background: '#2B2B2B',
    padding: '20px 40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const navStyle = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  };

  const navButtonStyle = (isActive) => ({
    padding: '10px 24px',
    background: isActive ? '#FF6B35' : 'transparent',
    color: isActive ? 'white' : '#CCCCCC',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  const filtersBarStyle = {
    background: 'rgba(255, 255, 255, 0.1)', // Glass style for filters bar too
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const timeButtonStyle = (isActive) => ({
    padding: '8px 16px',
    background: isActive ? '#FF6B35' : '#F5F5F5',
    color: isActive ? 'white' : '#666',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  };

  const statCardStyle = (color = '#FF6B35') => ({
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  });

  const chartGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px'
  };

  const chartCardStyle = {
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    height: '400px'
  };

  // Convert lat/lng to 3D sphere coordinates
  const latLngToVector3 = (lat: number, lng: number, radius = 250) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  // Create bar chart bars
  const BarChart = ({ data, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => d.matches));
    
    return (
      <div style={{ height, display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, #FF6B35 0%, #FF4A1C 100%)',
                borderRadius: '4px 4px 0 0',
                height: animateCharts ? `${(item.matches / maxValue) * 200}px` : '0px',
                transition: `height 0.8s ease ${index * 0.1}s`,
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>
                {item.matches}
              </div>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#666'
            }}>
              {item.month.slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Create line chart
  const LineChart = ({ data, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => d.winRate));
    const minValue = Math.min(...data.map(d => d.winRate));
    
    return (
      <div style={{ height, position: 'relative' }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(value => (
            <line
              key={value}
              x1="0"
              y1={height - (value / 100) * height}
              x2="100%"
              y2={height - (value / 100) * height}
              stroke="#E5E5E5"
              strokeDasharray="5,5"
            />
          ))}
          
          {/* Area */}
          <path
            d={`
              M 0 ${height}
              ${data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
                return `L ${x}% ${y}`;
              }).join(' ')}
              L 100% ${height}
              Z
            `}
            fill="url(#lineGradient)"
            opacity={animateCharts ? 1 : 0}
            style={{ transition: 'opacity 1s ease' }}
          />
          
          {/* Line */}
          <path
            d={`
              M 0 ${height - ((data[0].winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20}
              ${data.slice(1).map((item, index) => {
                const x = ((index + 1) / (data.length - 1)) * 100;
                const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
                return `L ${x}% ${y}`;
              }).join(' ')}
            `}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="3"
            strokeDasharray={animateCharts ? "0" : "1000"}
            strokeDashoffset={animateCharts ? "0" : "1000"}
            style={{ transition: 'stroke-dashoffset 2s ease' }}
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
            
            return (
              <g key={index}>
                <circle
                  cx={`${x}%`}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="#FF6B35"
                  strokeWidth="3"
                  opacity={animateCharts ? 1 : 0}
                  style={{ transition: `opacity 0.5s ease ${index * 0.1 + 1}s` }}
                />
                <text
                  x={`${x}%`}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#666"
                >
                  {item.winRate}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Section 1: Performance Dashboard */}
      <div style={dashboardContainerStyle}>
        {/* Filters Bar */}
        <div style={filtersBarStyle}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Calendar size={20} color="rgba(255, 255, 255, 0.8)" />
            <button
              style={timeButtonStyle(timeRange === 'week')}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              style={timeButtonStyle(timeRange === 'month')}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              style={timeButtonStyle(timeRange === 'year')}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={statsGridStyle}>
          <div style={statCardStyle()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>Total Matches</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{stats.totalMatches}</div>
              </div>
              <div style={{ padding: '8px', background: '#FF6B35', borderRadius: '8px' }}>
                <Trophy size={20} color="white" />
              </div>
            </div>
          </div>
          
          <div style={statCardStyle()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>Win Rate</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#22C55E' }}>{stats.winRate}%</div>
              </div>
              <div style={{ padding: '8px', background: '#22C55E', borderRadius: '8px' }}>
                <TrendingUp size={20} color="white" />
              </div>
            </div>
          </div>
          
          <div style={statCardStyle()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>Avg Duration</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{stats.avgDuration}min</div>
              </div>
              <div style={{ padding: '8px', background: '#3B82F6', borderRadius: '8px' }}>
                <Clock size={20} color="white" />
              </div>
            </div>
          </div>
          
          <div style={statCardStyle()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>Best Partners</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{stats.bestPartner}</div>
              </div>
              <div style={{ padding: '8px', background: '#8B5CF6', borderRadius: '8px' }}>
                <Users size={20} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={chartGridStyle}>
          {/* Win Rate Trend */}
          <div style={chartCardStyle}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white'
            }}>
              <TrendingUp size={20} />
              Win Rate Trend
            </h3>
            <LineChart data={monthlyData} />
          </div>
          
          {/* Monthly Matches */}
          <div style={chartCardStyle}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white'
            }}>
              <BarChart3 size={20} />
              Monthly Matches
            </h3>
            <BarChart data={monthlyData} />
          </div>
          
          {/* Performance Insights */}
          <div style={chartCardStyle}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white'
            }}>
              <Zap size={20} />
              Top Performing Clubs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '12px' }}>
              {(() => {
                // Get all clubs and sort by win rate
                const allClubs = Object.entries(locationData).flatMap(([city, data]) =>
                  data.clubs.map(club => ({ ...club, city }))
                ).sort((a, b) => b.winRate - a.winRate).slice(0, 4);
                
                return allClubs.map((club, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#FF6B35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: 'white' }}>
                      {club.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                      {club.city}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#FF6B35', marginBottom: '2px' }}>
                      {club.winRate}%
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {club.matches} matches
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIAnalytics; 