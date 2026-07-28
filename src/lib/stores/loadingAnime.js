import { writable } from 'svelte/store';

export const isVisible = writable(false);

//判定用フラグ
export const hasInitialized = writable(false);