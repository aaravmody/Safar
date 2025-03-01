import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

model = joblib.load("flight_price_model.pkl")
encoder = joblib.load("onehot_encoder.pkl")  

columns = joblib.load("model_features.pkl") 

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_df = pd.DataFrame([data])

        categorical_features = ['airline', 'source_city', 'departure_time', 'stops', 'arrival_time', 'destination_city', 'class']
        encoded_input = pd.DataFrame(encoder.transform(input_df[categorical_features]))

        input_df = input_df.drop(categorical_features, axis=1)
        input_df = pd.concat([input_df, encoded_input], axis=1)

        input_df = input_df.reindex(columns=columns, fill_value=0)

        # Predict Price
        prediction = model.predict(input_df)

        return jsonify({'predicted_price': float(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
