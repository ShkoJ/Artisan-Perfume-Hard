import requests
import json
from flask import Flask, request

app = Flask(__name__)

# Replace with your actual Bot Token and Chat ID
TELEGRAM_BOT_TOKEN = '8383054095:AAGXmwpa1Cp0GrjorQR-Mdm4AXUsjTOEH_M'
TELEGRAM_CHAT_ID = '@artisanperfume'
TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'

@app.route('/send_order', methods=['POST'])
def send_order():
    """
    Receives order data from the frontend and forwards it to Telegram.
    This is a simplified example.
    """
    try:
        data = request.json
        name = data.get('customerName')
        phone = data.get('customerPhone')
        item_name = data.get('itemName')
        quantity = data.get('quantity')
        total_price = data.get('totalPrice')

        if not name or not phone or not item_name:
            return {'status': 'error', 'message': 'Missing data'}, 400

        message = f"🆕 **New Order Alert!**\n\n"
        message += f"👤 **Customer Name:** {name}\n"
        message += f"📞 **Phone Number:** {phone}\n"
        message += f"📦 **Item:** {item_name}\n"
        message += f"🔢 **Quantity:** {quantity}\n"
        message += f"💰 **Total:** {total_price:,.0f} IQD\n"
        message += f"\n_Luxury Made Affordable_"

        payload = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'Markdown'
        }

        response = requests.post(TELEGRAM_API_URL, json=payload)
        response.raise_for_status()

        return {'status': 'success', 'message': 'Order notification sent!'}

    except requests.exceptions.RequestException as e:
        print(f"Error sending message to Telegram: {e}")
        return {'status': 'error', 'message': 'Failed to send Telegram notification'}, 500

if __name__ == '__main__':
    # To run this, you'd need to use a tool like ngrok to expose your
    # localhost to a public URL so your frontend can send requests to it.
    app.run(host='0.0.0.0', port=5000)