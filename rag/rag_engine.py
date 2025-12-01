import os
from dotenv import load_dotenv
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms import HuggingFacePipeline
from transformers import pipeline

# === Load environment ===
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
print("🔐 Loaded HF Token:", hf_token[:10], "...")

# === Step 1: Create or Load Vector Store ===
def build_or_load_vectorstore():
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

    if os.path.exists("vectorStore"):
        print("✅ Loading existing vector store...")
        db = FAISS.load_local("vectorStore", embeddings, allow_dangerous_deserialization=True)
    else:
        print("🧠 Creating new vector store from sharebite_info.txt...")
        with open("sharebite_info.txt", "r", encoding="utf-8") as f:
            text = f.read()

        text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
        texts = text_splitter.split_text(text)
        db = FAISS.from_texts(texts, embeddings)
        db.save_local("vectorStore")
        print("✅ Vector store created and saved!")

    return db


# === Step 2: Load RAG Engine ===
def load_rag_engine():
    db = build_or_load_vectorstore()
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    return retriever


# === Step 3: Function to Get Answers ===
def get_answer(query):
    try:
        print("🔍 Inside get_answer()")
        print(f"Query: {query}")

        # ✅ Define embeddings before loading vectorstore
        embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

        # ✅ Load vector store (consistent folder name!)
        print("✅ Loading existing vector store...")
        vectorstore = FAISS.load_local("vectorStore", embeddings, allow_dangerous_deserialization=True)

        # ✅ Create retriever
        retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

        # ✅ Initialize Hugging Face model
        print("🧩 Initializing Hugging Face model...")
        pipe = pipeline(
            "text2text-generation",
            model="google/flan-t5-large",
            tokenizer="google/flan-t5-large",
            max_length=512,
            temperature=0.3
        )
        model = HuggingFacePipeline(pipeline=pipe)

        # ✅ Create RAG pipeline
        print("⚙️ Creating retrieval chain...")
        qa_chain = RetrievalQA.from_chain_type(
            llm=model,
            retriever=retriever,
            chain_type="stuff"
        )

        # ✅ Run query
        print("🚀 Running query through QA chain...")
        result = qa_chain.run(query)
        print("✅ Query executed successfully.")
        return result

    except Exception as e:
        print(f"❌ Error inside get_answer(): {e}")
        return "Error while generating answer."


# === Step 4: Manual Test ===
if __name__ == "__main__":
    while True:
        query = input("\nAsk me: ")
        if query.lower() in ["exit", "quit"]:
            break
        print(f"\n🤖 AI Assistant: {get_answer(query)}")
