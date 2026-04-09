import React from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';

const FlowBox = ({ label, sublabel, variant }) => {
  return (
    <div className={`flow-box ${variant}`}>
      <div className="flow-label">{label}</div>
      {sublabel && <div className={`flow-badge ${variant}`}>{sublabel}</div>}
    </div>
  );
};

const Arrow = () => (
  <div className="arrow-wrapper">
    <ArrowDown size={16} />
  </div>
);

const ArchitectureDiagram = () => {
  return (
    <div className="architecture-container">
      <div className="arch-header">
        <h2 className="gradient-text">Neural Image Captioning Architecture</h2>
        <p className="subtitle">ResNet50 backbone with LSTM-based Merge Architecture</p>
      </div>

      <div className="arch-grid">
        {/* Left Column: Flowchart */}
        <div className="arch-card flowchart-card">
          <h3 className="card-title">Model Flowchart</h3>
          
          <div className="flowchart-columns">
            {/* Encoder Branch */}
            <div className="flow-column">
              <div className="section-label-wrapper">
                <div className="label-dot encoder"></div>
                <span className="section-label-text">ENCODER</span>
              </div>
              
              <FlowBox label="Input Image" sublabel="224 × 224 × 3" variant="encoder" />
              <Arrow />
              <FlowBox label="ResNet50 Backbone" sublabel="Pre-trained CNN" variant="encoder" />
              <Arrow />
              <FlowBox label="Dropout (0.3)" sublabel="Regularisation" variant="encoder" />
              <Arrow />
              <FlowBox label="Dense Layer" sublabel="256 Features" variant="encoder" />
            </div>

            {/* Decoder Branch */}
            <div className="flow-column">
              <div className="section-label-wrapper">
                <div className="label-dot decoder"></div>
                <span className="section-label-text">DECODER</span>
              </div>
              
              <FlowBox label="Text Input" sublabel="Tokenised Sequence" variant="decoder" />
              <Arrow />
              <FlowBox label="Embedding Layer" sublabel="Vocab: 2647 → 50" variant="decoder" />
              <Arrow />
              <FlowBox label="Dropout (0.3)" sublabel="Regularisation" variant="decoder" />
              <Arrow />
              <FlowBox label="LSTM (256 units)" sublabel="Sequence Modeling" variant="decoder" />
            </div>
          </div>

          {/* Merge Point */}
          <div className="merge-svg-wrapper">
             <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
               <path d="M50 0V20C50 31.0457 58.9543 40 70 40H130C141.046 40 150 31.0457 150 20V0" stroke="currentColor" strokeWidth="1.5" />
               <circle cx="100" cy="40" r="4" fill="currentColor" />
             </svg>
          </div>

          {/* Decision Center */}
          <div className="decision-section">
            <div className="section-label-wrapper" style={{ justifyContent: 'center' }}>
              <div className="label-dot decision"></div>
              <span className="section-label-text">MERGE & DECISION</span>
            </div>
            <FlowBox label="Additive Fusion" sublabel="Add (Enc + Dec)" variant="decision" />
            <Arrow />
            <FlowBox label="Dense (ReLU)" sublabel="256 Features" variant="decision" />
            <Arrow />
            <FlowBox label="Dense (Softmax)" sublabel="Vocab Probability" variant="decision" />
          </div>

          {/* Feedback Loop */}
          <div className="feedback-loop-wrapper">
            <div className="feedback-text"><RefreshCw size={10} style={{marginRight: 4}} /> Recursive Word Generation</div>
          </div>
        </div>

        {/* Right Column: Layer Table */}
        <div className="arch-card">
          <h3 className="card-title">Layer Reference</h3>
          <div className="table-wrapper">
            <table className="arch-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Function</th>
                  <th>Why we use it?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="layer-name">ResNet50</td>
                  <td className="layer-fn">Feature Extractor</td>
                  <td className="layer-why">Extracts 2048 high-level features from visual input.</td>
                </tr>
                <tr>
                  <td className="layer-name">Embedding</td>
                  <td className="layer-fn">Vectorization</td>
                  <td className="layer-why">Maps text IDs to 50d space using GloVe weights.</td>
                </tr>
                <tr>
                  <td className="layer-name">Dropout (0.3)</td>
                  <td className="layer-fn">Regularisation</td>
                  <td className="layer-why">Prevents overfitting by random deactivation.</td>
                </tr>
                <tr>
                  <td className="layer-name">LSTM</td>
                  <td className="layer-fn">Seq Learner</td>
                  <td className="layer-why">Handles long-term dependencies in sentences.</td>
                </tr>
                <tr>
                  <td className="layer-name">Add Layer</td>
                  <td className="layer-fn">Feature Fusion</td>
                  <td className="layer-why">Merges image context with current sentence state.</td>
                </tr>
                <tr>
                  <td className="layer-name">Softmax</td>
                  <td className="layer-fn">Classification</td>
                  <td className="layer-why">Outputs probability for next word in vocab.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="legend">
            <div className="legend-item">
              <span className="label-dot encoder"></span> Encoder Part
            </div>
            <div className="legend-item">
              <span className="label-dot decoder"></span> Decoder Part
            </div>
            <div className="legend-item">
              <span className="label-dot decision"></span> Decision Part
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
