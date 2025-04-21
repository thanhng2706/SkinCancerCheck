# SkinCancerCheck

A machine learning-based web application for skin cancer prediction using deep learning techniques.

## Project Overview

This project develops a machine learning model to predict skin cancer from skin lesion images. The system provides an accessible web interface for users to upload images and receive predictions, along with additional features like finding nearby dermatologists and UV index information.

## Features

- 🏥 Skin Cancer Prediction using AI
- 📸 Image Upload and Analysis
- 📊 Detailed Results Visualization
- 👨‍⚕️ Find Nearby Dermatologists
- ☀️ UV Index Information
- 📱 Mobile-Friendly Interface
- 🎯 Interactive ABCDE Guide

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Flask
- TensorFlow
- NumPy
- Pandas

## Dataset

The model is trained on the HAM10000 dataset, which includes:
- 10,000 skin lesion images
- Metadata about each image
- RGB image data in CSV format

## Model Performance

The model achieves high accuracy in skin cancer prediction through deep learning techniques.

## Getting Started

### Prerequisites

```bash
# Frontend dependencies
npm install

# Backend dependencies
pip install -r backend/requirements.txt
```

### Environment Setup

1. Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

2. Set up the Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend
The backend needs to be deployed separately on a platform that supports Python applications (e.g., Heroku, PythonAnywhere).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- HAM10000 dataset
- Google Places API for dermatologist search
- OpenWeather API for UV index data

## Author

- **Viet Thanh Nguyen**
  - GitHub: [@thanhng2706](https://github.com/thanhng2706)
