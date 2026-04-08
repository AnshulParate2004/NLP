import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Brain, ArrowRight, Github } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="page-header"
        style={{ textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '4rem' }}>
          Visual <span className="gradient-text">Intelligence</span>
        </h1>
        <p className="subtitle" style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '1rem auto 3rem' }}>
          Bridging computer vision and natural language processing to describe the world through neural lenses.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <button className="action-btn" onClick={() => navigate('/caption')}>
            Start Generating <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
          <button 
            className="action-btn" 
            style={{ 
              background: 'transparent', 
              border: '1px solid hsl(var(--border))', 
              boxShadow: 'none' 
            }}
            onClick={() => navigate('/stats')}
          >
            Explore Model
          </button>
        </div>
      </motion.div>

      <div className="stats-grid" style={{ marginTop: '6rem' }}>
        <div className="stats-card">
          <Camera size={32} className="card-icon" style={{ color: 'hsl(var(--primary))' }} />
          <h3 style={{ marginTop: '1rem' }}>Scene Perception</h3>
          <p className="subtitle">Utilizes ResNet50 high-level feature maps to understand spatial relationships and object context.</p>
        </div>
        <div className="stats-card">
          <Brain size={32} className="card-icon" style={{ color: 'hsl(var(--accent))' }} />
          <h3 style={{ marginTop: '1rem' }}>Narrative Generation</h3>
          <p className="subtitle">Embedded LSTM sequences transform visual features into coherent, human-like descriptive text.</p>
        </div>
      </div>

      <footer style={{ marginTop: '8rem', padding: '2rem', opacity: 0.5, borderTop: '1px solid hsl(var(--border))' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <Github size={20} />
          <span>Developed with ❤️ for NLP Research</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
