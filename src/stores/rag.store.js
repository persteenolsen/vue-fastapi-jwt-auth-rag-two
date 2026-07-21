// rag.store.js
import { defineStore } from 'pinia';
import { fetchWrapperRag } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/ask`;

console.log("RAG STORE LOADED");


export const useRagStore = defineStore({
    id: 'rag',

    state: () => ({
        answer: null,
        sources: [],
        loading: false,
        error: null
    }),

    actions: {
        async ask(prompt) {
            this.loading = true;

            // Clear previous response
            this.answer = null;
            this.sources = [];
            this.error = null;

            try {
                const response = await fetchWrapperRag.post(baseUrl, {
                    prompt
                });

                this.answer = response.answer;
                this.sources = response.sources || [];

            } catch (error) {
                this.error = error?.message || error;
            } finally {
                this.loading = false;
            }
        },

        clear() {
            this.answer = null;
            this.sources = [];
            this.error = null;
        }
    }
});
