from flask import Flask, render_template, request, jsonify
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/')
def index():
    return render_template('plan.html')

@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    data = request.json
    u = data.get('userData')

    prompt = f"""
    Create a highly detailed travel log for {u['people']} people traveling from {u['origin']} to Kanyakumari.
    Trip Duration: {u['days']} days. Dates: {u['dates']}. 
    Travel Mode: {u['transport']}. Selection: {u.get('flight', 'N/A')}.

    Format the response as a sequence of steps. 
    Each step MUST start with the delimiter '###STEP###'.
    For each step, provide:
    1. 🕒 Time & Phase (e.g., 08:00 AM - Arrival)
    2. 📝 Activity (Specifically: What to buy, what to prepare, what to see)
    3. 📍 Location (A working Google Maps search link)
    4. 💡 Pro-Tip (A local secret or hack)
    
    Include specific food stops based on local fame. 
    Use HTML: <h3> for titles, <p> for text, and <a class='map-link' target='_blank'> for locations.
    """

    try:
        completion = client.chat.completions.create(
            messages=[{"role": "system", "content": "You are a luxury AI Travel Concierge."},
                      {"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant",
        )
        return jsonify({'itinerary': completion.choices[0].message.content})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)