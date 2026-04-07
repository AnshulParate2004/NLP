# Neural Image Captioning Architecture

This diagram illustrates the typical encoder-decoder architecture used in your image captioning model, which processes both the image (using a CNN) and the text sequences (using an RNN/LSTM).

```mermaid
graph TD
    %% Styling
    classDef input fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef cnn fill:#d4ebf2,stroke:#0b82a3,stroke-width:2px;
    classDef rnn fill:#f5e6d3,stroke:#c47a21,stroke-width:2px;
    classDef merge fill:#e6d3f5,stroke:#6c21c4,stroke-width:2px;
    classDef output fill:#d5f5d3,stroke:#2ca61c,stroke-width:2px;

    %% Image Pipeline (Encoder)
    I["Input Image"]:::input -->|"224x224 RGB"| ResNet["<b>ResNet50</b><br/>(Feature Extractor)"]:::cnn
    ResNet -->|"2048-dim raw features"| Feat["Image Feature Vector"]:::cnn
    Feat -->|"Prevent Overfitting"| DropImg["<b>Dropout</b><br/>(0.3)"]:::cnn
    DropImg -->|"Dimensionality Reduction"| DenseImg["<b>Dense</b><br/>(256 neurons, ReLU)"]:::cnn

    %% Text Pipeline (Decoder)
    T["Partial Caption Sequence"]:::input -->|"Word Indices"| Emb["<b>Embedding Layer</b><br/>(GloVe Weights)"]:::rnn
    Emb -->|"Dense Word Vectors"| DropCap["<b>Dropout</b><br/>(0.3)"]:::rnn
    DropCap -->|"Temporal Feature Extraction"| LSTM["<b>LSTM</b><br/>(256 units)"]:::rnn

    %% Merge & Classification
    DenseImg -->|"Image Meaning"| Add["<b>Add Layer</b><br/>(Sum Features)"]:::merge
    LSTM -->|"Text Meaning"| Add
    
    Add -->|"Combined Representation"| Dense2["<b>Dense Layer</b><br/>(256 neurons, ReLU)"]:::merge
    Dense2 -->|"Raw Scores"| Out["<b>Output Dense Layer</b><br/>(2647 units)"]:::output
    Out -->|"Probability Distribution"| Word["<b>Predicted Next Word</b><br/>(Softmax)"]:::output

    %% Looping (Recursive Step)
    Word -.->|"Append to Sequence"| T

    %% Subgraphs for visual grouping
    subgraph "Encoder (Vision)"
        ResNet
        Feat
        DropImg
        DenseImg
    end

    subgraph "Decoder (Language)"
        Emb
        DropCap
        LSTM
    end

    subgraph "Decision Center"
        Add
        Dense2
        Out
    end
```

### Detailed Layer Explanations

| Layer | Function | Why we use it? |
| :--- | :--- | :--- |
| **ResNet50** | Feature Extractor | Uses pre-trained knowledge to "see" objects, shapes, and textures in the image. |
| **Dropout** | Randomly deactivates neurons | Prevents the model from memorizing the training data (Overfitting). |
| **Dense (Image)** | Compresses 2048 to 256 | Simplifies the huge ResNet output into a manageable size that matches the LSTM. |
| **Embedding** | Maps words to 50D vectors | Converts abstract word IDs into "coordinate points" where similar words (e.g., 'dog' and 'cat') are close together. |
| **LSTM** | Long Short-Term Memory | Remembers the order of words and understands the context of the sentence so far. |
| **Add Layer** | Merges Vision + Text | This is where the model finally "looks" at the image while "thinking" about the current sentence. |
| **Dense (256)** | Feature Refiner | Learns how to interpret the merged image and text features together. |
| **Softmax (Output)** | Probability Calculator | Converts math scores into percentages (e.g., "There is a 90% chance the next word is 'running'"). |
| **The Loop** | Iterative Generation | Because the model only predicts **one word at a time**, it must feed its own output back into the input until the sentence is finished. |
