# 🤖 vue-fastapi-jwt-auth-rag

Last updated: 17-09-2026

A Vue 3 frontend using Pinia for state management and JWT authentication, designed to interact with a FastAPI Retrieval-Augmented Generation (RAG) API.

This project demonstrates a full frontend setup:

SPA architecture → authentication → API integration → RAG question answering → optional source display → local development → production build

The frontend is designed to consume answers from the FastAPI backend while displaying source documents when relevant RAG information has been retrieved.

# FastAPI Backend

- [`RAG API`](https://github.com/persteenolsen/fastapi-jwt-auth-rag-two) - The backend API using FastAPI, PostgreSQL + pgvector, document retrieval, LLM integration, and JWT authentication.

# 🔐 Features

- Vue 3 SPA architecture
- Pinia for global state management
- JWT authentication with secure token handling
- API integration with authenticated REST endpoints
- RAG question answering interface
- AI-generated answer display
- Optional retrieved source document display
- Sources displayed only when relevant RAG data is found
- Normal LLM answers when no relevant RAG data is found
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

    cd vue-fastapi-jwt-auth-rag-two

    npm install

Verify setup:

    npm run dev

Open the app in the browser:

    http://localhost:3000

# 🚀 Development Server

- Start with `npm run dev`
- Accessible at `http://localhost:3000`

# 📦 Production Build

Run:

    npm run build

This creates the production build.

# 👀 Preview Production Build

Run:

    npm run preview

The production build can then be previewed locally at:

    http://localhost:5050

# 🔐 Environment Variables (.env)

    VITE_API_URL=http://127.0.0.1:8000

The frontend uses `VITE_API_URL` as the base URL for communication with the FastAPI backend.

# 🧪 Usage

1. Start the FastAPI backend
2. Start the Vue frontend with `npm run dev`
3. Log in through the SPA
4. Enter a question in the RAG assistant interface
5. Submit the question
6. Receive an AI-generated answer
7. Display a source when relevant RAG information was retrieved
8. Display no source when the answer does not use relevant database content

# 📡 API Integration

The Vue frontend communicates with the protected FastAPI API.

## SPA Login

The Vue client uses:

    POST /login-spa

The endpoint returns a JWT access token which is then used for authenticated requests.

## RAG Questions

The Vue client uses:

    POST /ask

Example request:

    {
      "prompt": "Is Lisbon great for vacation?"
    }

The backend performs semantic retrieval against PostgreSQL + pgvector before generating the answer.

# 📚 RAG Source Behavior

Sources are now **optional**.

The backend uses a retrieval relevance threshold to determine whether database content is sufficiently relevant to the question.

The current retrieval configuration is:

- Maximum retrieved chunks: 3
- Relevance threshold: 1.10
- Vector similarity search: PostgreSQL + pgvector

Only retrieved documents with a distance of `<= 1.10` are considered relevant.

This prevents unrelated documents from being returned merely because they happen to be the closest available vector matches.

## ✅ Example: Source Returned

Question:

    What is Vercel?

If the PostgreSQL database contains relevant Vercel information and the retrieved distance is within the configured threshold, the backend returns the answer together with the source.

Example response:

    {
      "answer": "Vercel provides serverless hosting with DevOps...",
      "sources": [
        "https://vanillajs.persteenolsen.com/rag-data-three.txt"
      ]
    }

The Vue frontend can therefore display the source document to the user.

## ℹ️ Example: No Source Returned

Question:

    What is the capital of France?

If no sufficiently relevant document is found in PostgreSQL, the backend does not use RAG context for the answer.

The LLM can answer normally.

Example response:

    {
      "answer": "The capital of France is Paris.",
      "sources": []
    }

The Vue frontend should therefore display the answer without displaying a source.

Another example is:

    Tell me a joke

If no relevant RAG document exists:

    {
      "answer": "Why did the...",
      "sources": []
    }

The exact LLM-generated answer will vary.

# 🧠 RAG Request Flow

The complete flow is:

    Vue SPA
       ↓
    POST /ask
       ↓
    FastAPI
       ↓
    Create query embedding
       ↓
    PostgreSQL + pgvector
       ↓
    Relevance filtering
       ↓
    Relevant RAG context?
       ↓
    ┌───────────────┴───────────────┐
    │                               │
    Yes                             No
    │                               │
    ↓                               ↓
    LLM + RAG context               LLM without RAG context
    │                               │
    ↓                               ↓
    Answer + sources                Answer + sources: []

This means the frontend does not need to determine whether a source is relevant.

The backend is responsible for retrieval and relevance filtering.

The Vue application simply displays the source information when the `sources` array contains one or more entries.

# 🧩 Source Display

The frontend should treat `sources` as an optional array.

When sources are available:

    sources.length > 0

the UI can display the retrieved source document or documents.

When:

    sources.length === 0

the UI should display only the generated answer.

This allows the same frontend to support both:

- RAG-grounded answers with source references
- Normal LLM answers without source references

# 🔐 Authentication Flow

The Vue SPA uses the following authentication flow:

    Vue Login
        ↓
    POST /login-spa
        ↓
    FastAPI validates credentials
        ↓
    JWT token returned
        ↓
    Pinia stores authentication state
        ↓
    JWT Bearer token included in protected requests
        ↓
    POST /ask

The `/ask` endpoint requires authentication.

# 🧠 Key Design Features

- Global Pinia store for JWT authentication
- Dedicated RAG Pinia store for question and answer state
- Secure API calls with JWT bearer authentication
- Environment-based API URL configuration
- Separation between frontend UI and RAG backend logic
- Optional source transparency
- Sources displayed only when relevant RAG content is retrieved
- Normal LLM answers supported without RAG sources
- SPA routing for authenticated and public pages

# 📡 Backend Endpoints Used by the Frontend

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/login-spa` | Authenticate Vue SPA and receive JWT |
| POST | `/ask` | Submit RAG questions and receive answers |
| GET | `/` | Basic backend health/status endpoint |

The frontend does not need to call `/debug/retrieve` during normal operation.

The `/debug/retrieve` endpoint is intended for backend development and retrieval testing.

# 💡 Use Cases

This Vue frontend can be used as a general-purpose interface for FastAPI-based RAG systems.

By combining document retrieval with an LLM, users can ask questions and receive answers grounded in available knowledge sources when relevant information exists.

When no relevant knowledge-base information exists, the backend can provide a normal LLM response without presenting an unrelated source.

## 💬 Chat Assistants

- Build AI-powered chat assistants for internal or customer-facing applications
- Answer user questions based on company documents, manuals, or knowledge bases
- Provide conversational access to large collections of information
- Display source references when relevant knowledge is retrieved
- Allow general LLM answers when no relevant source exists

Examples:

- Customer support assistants
- Employee knowledge assistants
- Product support chatbots
- FAQ assistants

## 📚 Document Question Answering

- Ask questions directly against document collections
- Retrieve relevant information from documents
- Provide answers with source references when available
- Avoid displaying unrelated documents as supporting sources

Examples:

- Technical documentation assistants
- Policy and procedure assistants
- Research document assistants
- Document analysis systems

## 🏢 Enterprise Knowledge Systems

- Create secure internal AI assistants using authenticated access
- Connect employees with company knowledge stored across many documents
- Improve information discovery across departments
- Provide source transparency when internal documents are used

Examples:

- HR assistants
- IT support assistants
- Internal company portals
- Training and onboarding assistants

## 🎓 Education and Learning Assistants

- Create AI tutors based on educational material
- Help students explore course content through natural language questions
- Provide explanations based on trusted learning resources
- Display relevant source material when available

Examples:

- Course assistants
- Study helpers
- Training platforms
- Learning management systems

## 🛠️ Developer and Technical Assistants

- Provide answers from technical documentation and code repositories
- Help developers understand APIs, frameworks, and system architecture
- Reduce time spent searching technical resources
- Display relevant technical sources when available

Examples:

- API documentation assistants
- Programming support bots
- DevOps knowledge assistants
- Software architecture assistants

## 🔎 Search and Knowledge Discovery

- Replace traditional keyword search with semantic question answering
- Find relevant information based on meaning rather than exact words
- Combine search results with AI-generated explanations
- Display sources only when the retrieval system finds sufficiently relevant content

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

The frontend supports both RAG-grounded answers with source references and normal LLM answers where no sufficiently relevant RAG information is available.
