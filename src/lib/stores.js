// src/lib/stores.js
import { writable } from 'svelte/store';

export const time = writable(0);        // Temps écoulé (en ms)
export const running = writable(false); // Vrai si le chrono tourne
