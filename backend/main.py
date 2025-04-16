from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import skin_cancer_detection as SCD
from typing import Dict, List
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Risk level mapping based on class
RISK_LEVELS = {
    0: "high",    # actinic keratoses (Cancer)
    1: "high",    # basal cell carcinoma (Cancer)
    2: "low",     # benign keratosis (Non-Cancerous)
    3: "low",     # dermatofibroma (Non-Cancerous)
    4: "low",     # melanocytic nevi (Non-Cancerous)
    5: "medium",  # pyogenic granulomas (Can lead to cancer)
    6: "high",    # melanoma (Cancer)
}

# Confidence thresholds for risk levels
CONFIDENCE_THRESHOLDS = {
    "low": 0.7,    # Need higher confidence for low risk
    "medium": 0.6,  # Medium confidence for medium risk
    "high": 0.5,    # Lower threshold for high risk (more conservative)
}

# Cancer class indices
CANCER_CLASSES = [0, 1, 6]  # Indices of cancer classes

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Read and validate the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Resize image to match model input size
        image = image.resize((28, 28))
        
        # Convert to numpy array and reshape
        img_array = np.array(image).reshape(-1, 28, 28, 3)
        
        # Make prediction
        result = SCD.model.predict(img_array)
        result = result.tolist()
        
        # Get the predicted class and confidence
        max_prob = max(result[0])
        class_ind = result[0].index(max_prob)
        
        # Get the class name and initial risk level
        class_name = SCD.classes[class_ind]
        initial_risk_level = RISK_LEVELS[class_ind]
        
        # Apply more conservative risk assessment
        risk_level = initial_risk_level
        warning = None
        
        # Check if confidence is below threshold for the risk level
        if max_prob < CONFIDENCE_THRESHOLDS[initial_risk_level]:
            # If confidence is low, be more conservative
            if initial_risk_level == "low":
                risk_level = "medium"  # Upgrade low risk to medium if confidence is low
                warning = "Low confidence in benign classification. Consult a healthcare provider."
            elif initial_risk_level == "medium":
                risk_level = "high"  # Upgrade medium risk to high if confidence is low
                warning = "Low confidence in medium risk classification. Consult a healthcare provider immediately."
        
        # Additional safety check: if any cancer class has significant probability
        cancer_prob_sum = sum(result[0][i] for i in CANCER_CLASSES)
        if cancer_prob_sum > 0.3 and risk_level != "high":  # If there's a 30% chance of any cancer
            risk_level = "high"
            warning = "Multiple cancer types detected with significant probability. Consult a healthcare provider immediately."
        
        # Return the response in the format expected by the frontend
        return {
            "risk_level": risk_level,
            "confidence": float(max_prob),
            "prediction": class_name,
            "warning": warning
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 