declare module 'vue-country-flag-next' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{
    country: string
    size?: string
  }>
  export default component
} 