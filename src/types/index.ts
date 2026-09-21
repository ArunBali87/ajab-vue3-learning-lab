export type LearningPhase = 1 | 2 | 3 | 4

export interface Lesson {
  number: number
  slug: string
  title: string
  phase: LearningPhase
  duration: string
  summary: string
  reactEquivalent: string
  concepts: string[]
  why: string
  when: string
  productionUsage: string
  commonMistake: string
  code: string
  challenge: string
  challengeRequirements: string[]
  solution: string
  interview: Array<{ question: string; answer: string }>
}

export interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Engineer' | 'Designer' | 'Manager'
  active: boolean
}

export interface Employee extends User {
  department: 'Engineering' | 'Design' | 'Product' | 'Operations'
  location: string
  joinedAt: string
}

export type EmployeeDraft = Omit<Employee, 'id'>

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiQuery {
  page: number
  pageSize: number
  search?: string
  department?: string
  sort?: 'name' | 'joinedAt'
}
