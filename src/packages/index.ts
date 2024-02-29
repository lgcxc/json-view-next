import JsonViewNext from './json-view-next/index.vue';

export default JsonViewNext;

declare module 'vue' {
  export interface GlobalComponents {
    JsonViewNext: typeof JsonViewNext;
  }
}
