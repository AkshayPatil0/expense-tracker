export interface TagStore {
  tags: Array<string>;
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}
