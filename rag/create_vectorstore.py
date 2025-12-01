from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS

# ✅ Load the text data
with open("sharebite_info.txt", "r", encoding="utf-8") as f:
    text = f.read()

# ✅ Create embeddings and FAISS vector store
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
db = FAISS.from_texts([text], embeddings)

# ✅ Save the vector store locally
db.save_local("vectorStore")

print("✅ VectorStore created successfully!")
