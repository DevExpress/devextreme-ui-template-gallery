declare module 'file-saver-es' {
  export function saveAs(data: Blob | File, filename?: string, options?: { autoBom?: boolean }): void;
}
