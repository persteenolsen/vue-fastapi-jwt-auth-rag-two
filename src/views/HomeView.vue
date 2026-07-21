<template>
  <!-- Welcome -->
  <div class="welcome" v-if="username">
    Welcome, {{ username }}!
  </div>

  <div class="home">
    <h2>RAG Assistant</h2>

    <form @submit.prevent="handleAsk">

      <div class="form-group">
        <label for="prompt">Ask a question</label>

        <textarea
          id="prompt"
          v-model="prompt"
          rows="5"
          placeholder="Type your question here..."
          @keydown.enter.exact.prevent="handleAsk"
        ></textarea>

        <small class="hint">
          Press <b>Enter</b> to ask • <b>Shift + Enter</b> for a new line
        </small>
      </div>

      <button
        type="submit"
        :disabled="ragStore.loading || !prompt.trim()"
      >
        {{ ragStore.loading ? "Thinking..." : "Ask" }}
      </button>

    </form>


    <!-- Answer -->
    <div v-if="ragStore.answer" class="result">

      <h3>Answer</h3>

      <textarea
        readonly
        :value="ragStore.answer"
        rows="12"
        class="readonly-box"
      ></textarea>

    </div>


    <!-- Sources -->
    <div v-if="ragStore.sources.length" class="result">

      <h3>Sources</h3>

      <textarea
        readonly
        :value="ragStore.sources.join('\n')"
        rows="5"
        class="readonly-box"
      ></textarea>

    </div>


    <!-- Error -->
    <div v-if="ragStore.error" class="error">
      {{ ragStore.error }}
    </div>

  </div>
</template>


<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { useRagStore } from "@/stores/rag.store";

export default {

  name: "Home",

  setup() {

    const authStore = useAuthStore();
    const ragStore = useRagStore();

    const username = authStore.user?.username || "Guest";

    const prompt = ref("");


    const handleAsk = async () => {

      const question = prompt.value.trim();

      if (!question || ragStore.loading) {
        return;
      }

      await ragStore.ask(question);

    };


    return {
      username,
      prompt,
      ragStore,
      handleAsk
    };

  }

};
</script>


<style scoped>

.home {
  max-width: 850px;
  margin: 2rem auto;
  font-family: Arial, Helvetica, sans-serif;
}


.form-group {
  margin-bottom: 1rem;
}


textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  resize: vertical;
}


.readonly-box {
  background: #f8f8f8;
  border: 1px solid #ccc;
  color: #222;
}


button {
  margin-top: 0.5rem;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
}


button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}


.result {
  margin-top: 2rem;
}


.error {
  margin-top: 1rem;
  color: red;
  font-weight: bold;
}


.welcome {
  text-align: center;
  color: orange;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}


.hint {
  color: #666;
}

</style>
