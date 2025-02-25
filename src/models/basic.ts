export interface Item {
  value: string
  label: string
}

export interface Service<T> {
  getData(): Promise<T>
  getDefaultData(): T
}
