from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.metrics import AUC
import numpy as np
import os
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'upload'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Model configuration
dependencies = {
    'auc_roc': AUC
}

# Skin condition classes
SKIN_CONDITIONS = {
0: 'Actinic keratoses and intraepithelial carcinomae',
1: 'Basal cell carcinoma',
2: 'Benign keratosis-like lesions',
3: 'Dermatofibroma',
4: 'Melanocytic nevi',
5: 'Pyogenic granulomas and hemorrhage',
    6: 'Melanoma'
}

# Load the model
try:
    model = load_model('best_model.h5', custom_objects=dependencies)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def predict_label(img_path):
    try:
        # Load and preprocess the image
        test_image = image.load_img(img_path, target_size=(28, 28))
        test_image = image.img_to_array(test_image) / 255.0
        test_image = test_image.reshape(1, 28, 28, 3)

        # Make prediction
        predictions = model.predict(test_image)
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])

        return {
            'condition': SKIN_CONDITIONS[class_idx],
            'confidence': confidence,
            'all_probabilities': {
                SKIN_CONDITIONS[i]: float(pred) 
                for i, pred in enumerate(predictions[0])
            }
        }
    except Exception as e:
        print(f"Error in prediction: {e}")
        return None

@app.route("/api/analyze", methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Generate a unique filename
        filename = secure_filename(f"{uuid.uuid4()}.jpg")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Save the file
        file.save(filepath)
        
        # Make prediction
        result = predict_label(filepath)
        
        # Clean up - delete the file after analysis
        os.remove(filepath)
        
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to analyze image'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/api/health", methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)