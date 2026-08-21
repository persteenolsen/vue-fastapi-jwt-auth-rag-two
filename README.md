# 🤖 vue-fastapi-jwt-auth-rag

Last updated 21-08-2026

A Vue 3 frontend using Pinia for state management and JWT authentication, designed to interact with a FastAPI Retrieval-Augmented Generation (RAG) API. This project demonstrates a full frontend setup:

SPA architecture → authentication → API integration → RAG question answering → local development → production build

# FastAPI Backend

- [`RAG API`](https://github.com/persteenolsen/fastapi-jwt-auth-rag-two) - The backend API using FastAPI, document retrieval, LLM integration, and JWT authentication.

# 🔐 Features

- Vue 3 SPA architecture
- Pinia for global state management
- JWT authentication with secure token handling
- API integration with authenticated REST endpoints
- RAG question answering interface
- AI-generated answer display
- Retrieved source document display
- Development server with Vite
- Production-ready build and preview
- Easy deployment to static hosting

# 🧱 Tech Stack

- Node.js 18.19.1
- Vue 3
- Pinia
- Vite
- ESLint
- VS Code

# 📁 Project Structure

    .
    ├── index.html             # SPA entry point
    ├── package.json           # Node dependencies + scripts
    ├── vite.config.js         # Vite config
    ├── src
    │   ├── main.js            # Vue app entry point
    │   ├── App.vue            # Root component
    │   ├── components         # Vue components
    │   ├── views              # Pages
    │   ├── stores             # Pinia stores (JWT auth + RAG state)
    │   ├── helpers            # API fetch wrappers
    │   └── router             # Vue router configuration
    ├── public                 # Static assets
    └── .env                   # Environment variables (API URL)

# ⚙️ Installation

git clone https://github.com/persteenolsen/vue-fastapi-jwt-auth-rag-two.git

cd vue-fastapi-jwt-auth-rag

npm install

Verify setup:

npm run dev

Open the app in the browser:

http://localhost:3000

# 🚀 Development Server

- Start with `npm run dev`
- Accessible at `http://localhost:3000`

# 📦 Production Build

- Run `npm run build` to create a production build

# 👀 Preview Production Build

- Run `npm run preview`
- Preview the production build locally at `http://localhost:5050`

# 🔐 Environment Variables (.env)

VITE_API_URL=http://127.0.0.1:8000

# 🧪 Usage

1. Start the FastAPI backend
2. Start the Vue frontend (`npm run dev`)
3. Register/login through the SPA
4. Enter a question in the RAG assistant interface
5. Submit the question
6. Receive an AI-generated answer and retrieved document sources

# 📡 API Integration

- POST `/login` → returns JWT token
- POST `/ask` → sends a prompt to the RAG system
- JWT token included in authenticated API requests
- Token stored in Pinia store for session persistence

Example request:

POST `/ask`

{
  "prompt": "Is Lisbon great for vacation?"
}

Example response:

{
  "answer": "Lisbon is a great place for vacation...",
  "sources": [
    "https://example.com/document.txt"
  ]
}

# 🧠 Key Design Features

- Global Pinia store for JWT authentication
- Dedicated RAG Pinia store for question and answer state
- Secure API calls with JWT bearer authentication
- Environment-based API URL configuration
- Separation between frontend UI and RAG backend logic
- Source transparency by displaying retrieved documents
- SPA routing for authenticated and public pages

# 💡 Use Cases

This Vue frontend can be used as a general-purpose interface for FastAPI-based RAG systems. By combining document retrieval with an LLM, users can ask questions and receive answers grounded in available knowledge sources.

## 💬 Chat Assistants

- Build AI-powered chat assistants for internal or customer-facing applications
- Answer user questions based on company documents, manuals, or knowledge bases
- Provide conversational access to large collections of information
- Reduce the need for users to search through documentation manually

Examples:

- Customer support assistants
- Employee knowledge assistants
- Product support chatbots
- FAQ assistants

## 📚 Document Question Answering

- Ask questions directly against uploaded documents
- Retrieve relevant information from large document collections
- Provide answers with source references for transparency

Examples:

- Technical documentation assistants
- Policy and procedure assistants
- Research document assistants
- Legal document search assistants

## 🏢 Enterprise Knowledge Systems

- Create secure internal AI assistants using authenticated access
- Connect employees with company knowledge stored across many documents
- Improve information discovery across departments

Examples:

- HR assistants
- IT support assistants
- Internal company portals
- Training and onboarding assistants

## 🎓 Education and Learning Assistants

- Create AI tutors based on educational material
- Help students explore course content through natural language questions
- Provide explanations based on trusted learning resources

Examples:

- Course assistants
- Study helpers
- Training platforms
- Learning management systems

## 🛠️ Developer and Technical Assistants

- Provide answers from technical documentation and code repositories
- Help developers understand APIs, frameworks, and system architecture
- Reduce time spent searching technical resources

Examples:

- API documentation assistants
- Programming support bots
- DevOps knowledge assistants
- Software architecture assistants

## 🔎 Search and Knowledge Discovery

- Replace traditional keyword search with semantic question answering
- Find relevant information based on meaning rather than exact words
- Combine search results with AI-generated explanations

Examples:

- Enterprise search systems
- Knowledge management platforms
- Research assistants
- Digital libraries

## 🔐 Secure AI Applications

With JWT authentication and protected FastAPI endpoints, this frontend can support applications where access to knowledge must be controlled.

Examples:

- Private company assistants
- Customer portals
- Member-only knowledge systems
- Role-based AI applications

# 👨‍💻 Author

Built as a frontend SPA demonstrating secure JWT authentication, state management with Pinia, and integration with a production-style FastAPI RAG backend.
