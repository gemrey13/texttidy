from g4f.client import Client

client = Client()


user_input = input("enter translation > ")

prompt = f'Translate this into tagalog, give me answer only > {user_input}'

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