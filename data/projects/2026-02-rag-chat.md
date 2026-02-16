---
title: "RAG Chat: Instant Document Intelligence with Gemini"
slug: "rag-chat-gemini-chromadb"
date: "2026-02-16"
category: "AI & Machine Learning"
project_type: "Personal Project"
thumbnail: "/images/projects/rag-chat-thumb.png"
excerpt: "Ask anything, cite everything— an instant RAG chatbot for chat and document reasoning."
featured: true
contributors:
  - "muhammad-iqbal-rasyid"
techStack:
  - "Next.js"
  - "TypeScript"
  - "Gemini API"
  - "ChromaDB"
  - "LangChain"
  - "TailwindCSS"
links:
  liveApp: "https://chatbot-rag-otachiking.vercel.app/"
  github: "https://github.com/Otachiking/Chatbot-RAG"
  video: "https://youtu.be/OecxfRxfQTs"
tags:
  - "RAG"
  - "LLM"
  - "Gemini"
  - "VectorDatabase"
  - "DocumentQA"
sections:
  - type: "overview"
    content: |
      RAG Chat is a full-stack AI chatbot application that combines the power of Google's Gemini 3 Pro large language model with ChromaDB vector search to deliver both general-purpose AI conversation and document-grounded question answering in a single, unified interface. Whether you need a quick AI chat or want to interrogate a 50-page PDF, RAG Chat handles it seamlessly — no configuration needed.

      The application follows a hybrid architecture: when no document is uploaded, it functions as a standard AI assistant powered by Gemini 3 Pro. The moment a user uploads a PDF or image, the system automatically ingests, chunks, and indexes the content into a vector database. From that point on, every answer is retrieved from the document's own content and cited with page references — giving users full transparency into where each answer originates.

  - type: "demo"
    title: "Demo App"
    url: "https://chatbot-rag-otachiking.vercel.app/"

  - type: "video"
    title: "Video"
    url: "https://youtu.be/OecxfRxfQTs"

  - type: "detail"
    title: "Detail"
    content: |
      **Architecture & Inference Strategy**
      RAG Chat uses a hybrid runtime pipeline with two answer modes: direct Gemini completion for general chat, and retrieval-augmented generation for document-specific questions. Importantly, this app directly calls the Gemini FREE API and does **not** perform model training, fine-tuning, or continual learning. In your terms, your understanding is correct: the RAG process here works by retrieving relevant chunks from ChromaDB and forwarding them as grounded prompt context for Gemini to reason over.

      **Document Processing Pipeline**
      Once a user uploads a document, the backend performs extraction, chunking, embedding, and vector indexing, then binds those vectors to the current conversation context. During response generation, the retriever selects top-matching chunks, injects them into the prompt, and returns an answer with source attributions and page cues. This design keeps inference transparent, reduces hallucination risk, and gives users confidence through traceable evidence.

      **Feature Highlights (12)**
      1) Multi-thread conversations, 2) hybrid chat/RAG mode switching, 3) drag-and-drop upload, 4) document parsing for PDFs and images, 5) source citations with page references, 6) dedicated sources panel, 7) preview modal for source inspection, 8) responsive mobile-first UI, 9) graceful error handling and retries, 10) loading and status feedback states, 11) clean conversation history UX, and 12) one-click deployment flow to Vercel for fast shipping.

---
