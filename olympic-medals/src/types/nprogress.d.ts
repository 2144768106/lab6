declare module 'nprogress' {
  interface NProgressStatic {
    start(): void;
    done(): void;
    configure(options: any): void;
  }

  const nprogress: NProgressStatic;
  export default nprogress;
} 