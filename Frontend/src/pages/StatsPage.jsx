import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Info, Brain, Layers, Cpu, Zap } from 'lucide-react';

const StatsPage = () => {
  // Mock data representing the model's architecture metadata
  const layerData = [
    { name: 'CNN (VGG16)', value: 16, color: '#3b82f6' },
    { name: 'LSTM Decoder', value: 4, color: '#8b5cf6' },
    { name: 'Dense Layers', value: 2, color: '#a78bfa' },
    { name: 'Embedding', value: 1, color: '#06b6d4' },
  ];

  const vocabData = [
    { length: '1-3', count: 450 },
    { length: '4-6', count: 1200 },
    { length: '7-9', count: 800 },
    { length: '10+', count: 300 },
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Vision <span className="gradient-text">Statistics</span></h1>
        <p className="subtitle">Deep dive into the neural architecture</p>
      </header>

      <section className="stats-grid">
        {/* Model Overview Cards */}
        <div className="stats-card highlight">
          <Brain size={24} className="card-icon" />
          <h3>Neural Pipeline</h3>
          <div className="pipeline-viz">
            <div className="step">Encoder <small>VGG16</small></div>
            <div className="arrow">→</div>
            <div className="step">Features <small>4096-dim</small></div>
            <div className="arrow">→</div>
            <div className="step">Decoder <small>LSTM</small></div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="stats-card">
          <h4>Layer Composition</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={layerData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {layerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {layerData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="dot" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h4>Vocabulary Distribution</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vocabData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="length" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-desc">Word length vs frequency in model vocabulary</p>
        </div>

        {/* How it Works Section */}
        <div className="full-width stats-card info-section">
          <div className="section-header">
            <Info size={24} />
            <h3>How it Works</h3>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <span className="step-num">01</span>
              <h5>Feature Projection</h5>
              <p>The image is squeezed through VGG16 until only a 4,096-dimensional "meaning vector" remains.</p>
            </div>
            <div className="process-step">
              <span className="step-num">02</span>
              <h5>Decoding Loop</h5>
              <p>The LSTM uses this vector and its own hidden state to guess words one-by-one.</p>
            </div>
            <div className="process-step">
              <span className="step-num">03</span>
              <h5>Language Synthesis</h5>
              <p>Wait-states and embeddings ensure the output is grammatically correct and semantically accurate.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
