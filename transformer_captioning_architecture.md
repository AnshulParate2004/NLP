# Transformer-Based Image Captioning Architecture

Comparison of your current ResNet50+LSTM model vs the Transformer upgrade.

---

## ✅ Your Current Model (ResNet50 + LSTM)

```mermaid
graph TD
    classDef input fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef cnn fill:#d4ebf2,stroke:#0b82a3,stroke-width:2px;
    classDef rnn fill:#f5e6d3,stroke:#c47a21,stroke-width:2px;
    classDef merge fill:#e6d3f5,stroke:#6c21c4,stroke-width:2px;
    classDef output fill:#d5f5d3,stroke:#2ca61c,stroke-width:2px;

    I["Input Image"]:::input -->|"224x224 RGB"| ResNet["ResNet50\n(Feature Extractor)"]:::cnn
    ResNet -->|"2048-dim"| DenseImg["Dense (256, ReLU)"]:::cnn

    T["Partial Caption"]:::input --> Emb["Embedding\n(GloVe)"]:::rnn
    Emb --> Drop["Dropout (0.3)"]:::rnn
    Drop --> LSTM["LSTM (256 units)"]:::rnn

    DenseImg -->|"Image Meaning"| Add["Add Layer"]:::merge
    LSTM -->|"Text Meaning"| Add
    Add --> Dense2["Dense (256, ReLU)"]:::merge
    Dense2 --> Softmax["Softmax → Next Word"]:::output
    Softmax -.->|"Loop"| T
```

---

## 🚀 Transformer Version (Upgraded)

```mermaid
graph TD
    classDef input fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef encoder fill:#d4ebf2,stroke:#0b82a3,stroke-width:2px;
    classDef posenc fill:#fff3cd,stroke:#c47a21,stroke-width:2px;
    classDef attn fill:#e6d3f5,stroke:#6c21c4,stroke-width:2px;
    classDef ffn fill:#f5e6d3,stroke:#c47a21,stroke-width:2px;
    classDef output fill:#d5f5d3,stroke:#2ca61c,stroke-width:2px;
    classDef norm fill:#fde2e2,stroke:#c0392b,stroke-width:2px;

    %% ── IMAGE ENCODER ──
    I["Input Image\n(224x224 RGB)"]:::input -->|"raw pixels"| ResNet["ResNet50\n(Feature Extractor)"]:::encoder
    ResNet -->|"2048-dim spatial\nfeature map"| Proj["Linear Projection\n(2048 → 256)"]:::encoder
    Proj -->|"N image patch\ntokens (256-dim each)"| ImgTok["Image Token Sequence\n[v1, v2, ... vN]"]:::encoder

    %% ── TEXT DECODER INPUT ──
    T["Partial Caption\n(word indices)"]:::input --> Emb["Token Embedding\n(Learned Weights)"]:::posenc
    Emb --> PosEnc["+ Positional Encoding\n(inject word order)"]:::posenc
    PosEnc --> WordTok["Word Token Sequence\n[w1, w2, ... wt]"]:::posenc

    %% ── TRANSFORMER DECODER BLOCK (repeated N times) ──
    subgraph "Transformer Decoder Block (×N layers)"
        WordTok --> SA["Multi-Head\nSelf-Attention\n(words attend to each other)"]:::attn
        SA --> Norm1["Add & Layer Norm"]:::norm
        Norm1 --> CA["Multi-Head\nCross-Attention\n(words attend to IMAGE tokens)"]:::attn
        ImgTok -->|"Keys & Values\n(image information)"| CA
        CA --> Norm2["Add & Layer Norm"]:::norm
        Norm2 --> FFN["Feed-Forward Network\n(FFN, 2 layers, ReLU)"]:::ffn
        FFN --> Norm3["Add & Layer Norm"]:::norm
    end

    %% ── OUTPUT ──
    Norm3 --> OutDense["Linear Projection\n(256 → vocab size)"]:::output
    OutDense --> Softmax["Softmax\n(Probability over vocabulary)"]:::output
    Softmax -->|"Predicted Next Word"| NextWord["Next Word Token"]:::output
    NextWord -.->|"Append & Loop"| T

    subgraph "Image Encoder"
        ResNet
        Proj
        ImgTok
    end

    subgraph "Text Decoder Input"
        Emb
        PosEnc
        WordTok
    end

    subgraph "Output Head"
        OutDense
        Softmax
        NextWord
    end
```

---

## 🔍 Key New Components Explained

| New Component | Replaces | What It Does |
| :--- | :--- | :--- |
| **Linear Projection (Image)** | Dense (Image) | Projects ResNet features into token format usable by the Transformer |
| **Positional Encoding** | *(nothing — LSTM handled order implicitly)* | Injects word position info since Transformer has no built-in memory |
| **Multi-Head Self-Attention** | LSTM | Each word looks at ALL other words at the same time to understand context |
| **Multi-Head Cross-Attention** | Add Layer | Each word dynamically decides which image regions to focus on |
| **Feed-Forward Network (FFN)** | Dense (256, ReLU) | Refines the combined image+text representation per token |
| **Add & Layer Norm** | *(nothing in LSTM model)* | Stabilizes training, prevents vanishing gradients |

---

## 🧠 Why Cross-Attention is the Game-Changer

```
Your Add Layer (current):
   Image vector (one fixed 256-dim) + LSTM state = combined
   ↳ Image contributes EQUALLY to every word prediction

Cross-Attention (Transformer):
   Generating "dog"    → attends to animal/fur regions of image  🐕
   Generating "park"   → attends to grass/tree regions of image  🌳
   Generating "runs"   → attends to motion/legs regions of image 🏃
   ↳ Each word DYNAMICALLY picks what to look at in the image
```

---

## ⚖️ Side-by-Side Summary

| Aspect | ResNet50 + LSTM (Yours) | Transformer |
|---|---|---|
| **Image encoding** | ResNet → Dense → single vector | ResNet → Projection → sequence of tokens |
| **Text encoding** | LSTM (sequential) | Self-Attention (parallel) |
| **Image-text fusion** | Simple Add | Cross-Attention (dynamic, per-word) |
| **Word order handling** | LSTM memory (implicit) | Positional Encoding (explicit) |
| **Training** | Sequential, slower | Parallel, faster |
| **Caption quality** | Good | Better for long/complex captions |
| **Hardware** | T4 Colab ✅ | T4 Colab ⚠️ (use small N layers) |
