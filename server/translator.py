from g4f.client import Client

client = Client()

def translate_text(text):
    prompt = f"Translate this text into tagalog, so it will be understood easily. Give me answer only > {text}"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    
    print(response.choices[0].message.content)
    return response.choices[0].message.content