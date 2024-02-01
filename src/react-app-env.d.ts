/// <reference types="react-scripts" />

interface ImportMetaEnv {
  readonly REACT_API_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
