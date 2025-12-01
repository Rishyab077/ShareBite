from rag_engine import get_answer

while True:
    query = input("Ask ShareBite AI: ")
    if query.lower() in ["exit", "quit"]:
        break
    answer = get_answer(query)
    print("🤖", answer)
