from flask import Flask, request, jsonify
from flask_cors import CORS
from simplifier import simplify_text 
from translator import translate_text 

app = Flask(__name__)
CORS(app)

@app.route('/simplify', methods=['POST'])
def simplify():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({'error': 'Missing "text" field'}), 400

    original_text = data['text']
    simplified = simplify_text(original_text)

    return jsonify({
        'original': original_text,
        'simplified': simplified
    })

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({'error': 'Missing "text" field'}), 400

    original_text = data['text']
    trans = translate_text(original_text)

    return jsonify({
        'original': original_text,
        'translated': trans
    })

if __name__ == '__main__':
    app.run(debug=True)
