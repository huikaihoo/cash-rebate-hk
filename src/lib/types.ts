import { SVGProps } from 'react'

export interface SvgProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export interface Item {
  value: string
  label: string
  groups?: string[]
}

export interface Service<T> {
  getData(): Promise<T>
  getDefaultData(): T
}
