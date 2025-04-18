# SkinCancerCheck

A web application for skin cancer detection using machine learning, built with Next.js and FastAPI.

## Features

- Real-time skin lesion analysis using machine learning
- Camera integration for capturing images
- Secure and private image processing
- Modern, responsive UI with dark mode support
- Detailed analysis results with medical information
- Progressive Web App (PWA) support

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI Components
- Framer Motion for animations

### Backend
- FastAPI
- Python
- TensorFlow/PyTorch for ML model
- SQLite for data storage

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SkinCancerCheck.git
cd SkinCancerCheck
```

2. Install frontend dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up Python virtual environment and install backend dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
cd backend
pip install -r requirements.txt
```

4. Create necessary environment variables:
```bash
# Create .env.local in root directory
cp .env.example .env.local
```

### Development

1. Start the frontend development server:
```bash
npm run dev
# or
pnpm dev
```

2. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Backend
Deploy the FastAPI backend to your preferred hosting service (e.g., Heroku, DigitalOcean, AWS).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Medical datasets provided by [source]
- ML model architecture based on [paper/source]
- UI components from [shadcn/ui](https://ui.shadcn.com/)
