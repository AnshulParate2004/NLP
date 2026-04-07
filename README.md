# Image Captioning App

This is a full-stack application for generating captions for images using deep learning.

## Project Structure

- `Backend/` - FastAPI backend for image captioning
- `Frontend/` - React frontend for uploading images and displaying captions
- `Reserch/` - Jupyter notebooks for model training and data preprocessing
- `data/` - Dataset and processed data files

## Setup

### Backend

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   python main.py
   ```

The backend will be available at http://localhost:8000

### Frontend

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000

## Usage

1. Start both backend and frontend servers
2. Open the React app in your browser
3. Upload an image
4. Click "Generate Caption" to get an AI-generated caption

## Model

The model uses:
- ResNet50 for image feature extraction
- LSTM for caption generation
- GloVe word embeddings
- Trained on Flickr8k dataset

## API

### POST /caption

Upload an image file to generate a caption.

**Request:**
- Content-Type: multipart/form-data
- Body: file (image file)

**Response:**
```json
{
  "caption": "a man riding a bicycle on a dirt road"
}
```