import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Info, Brain, Layers, Cpu, Zap } from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const StatsPage = () => {
  // Mock data representing the model's architecture metadata
  const layerData = [
    { name: 'CNN (ResNet50)', value: 50, color: 'hsl(205 85% 55%)' },
    { name: 'LSTM + Dense', value: 3, color: 'hsl(25 90% 58%)' },
    { name: 'Dropout + Add', value: 3, color: 'hsl(270 60% 55%)' },
    { name: 'Embedding', value: 1, color: 'hsl(190 90% 45%)' },
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

      {/* Advanced Neural Architecture View */}
      <ArchitectureDiagram />
    </div>
  );
};

export default StatsPage;
