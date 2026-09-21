import type { ApiQuery, Employee, EmployeeDraft, PaginatedResult } from '@/types'

const seedEmployees: Employee[] = [
  {
    id: 1,
    name: 'Maya Chen',
    email: 'maya@lab.dev',
    role: 'Engineer',
    active: true,
    department: 'Engineering',
    location: 'Singapore',
    joinedAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Noah Williams',
    email: 'noah@lab.dev',
    role: 'Designer',
    active: true,
    department: 'Design',
    location: 'London',
    joinedAt: '2023-09-04',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    email: 'aisha@lab.dev',
    role: 'Manager',
    active: true,
    department: 'Product',
    location: 'Bengaluru',
    joinedAt: '2022-06-20',
  },
  {
    id: 4,
    name: 'Lucas Silva',
    email: 'lucas@lab.dev',
    role: 'Engineer',
    active: false,
    department: 'Engineering',
    location: 'São Paulo',
    joinedAt: '2024-04-02',
  },
  {
    id: 5,
    name: 'Zoe Martin',
    email: 'zoe@lab.dev',
    role: 'Admin',
    active: true,
    department: 'Operations',
    location: 'Toronto',
    joinedAt: '2021-11-18',
  },
  {
    id: 6,
    name: 'Omar Hassan',
    email: 'omar@lab.dev',
    role: 'Engineer',
    active: true,
    department: 'Engineering',
    location: 'Dubai',
    joinedAt: '2023-03-12',
  },
  {
    id: 7,
    name: 'Sofia Rossi',
    email: 'sofia@lab.dev',
    role: 'Designer',
    active: true,
    department: 'Design',
    location: 'Milan',
    joinedAt: '2024-07-08',
  },
  {
    id: 8,
    name: 'Ethan Brooks',
    email: 'ethan@lab.dev',
    role: 'Manager',
    active: false,
    department: 'Operations',
    location: 'Austin',
    joinedAt: '2022-12-01',
  },
  {
    id: 9,
    name: 'Priya Nair',
    email: 'priya@lab.dev',
    role: 'Engineer',
    active: true,
    department: 'Engineering',
    location: 'Kochi',
    joinedAt: '2025-02-10',
  },
  {
    id: 10,
    name: 'Daniel Kim',
    email: 'daniel@lab.dev',
    role: 'Manager',
    active: true,
    department: 'Product',
    location: 'Seoul',
    joinedAt: '2023-05-23',
  },
  {
    id: 11,
    name: 'Amara Okafor',
    email: 'amara@lab.dev',
    role: 'Engineer',
    active: true,
    department: 'Engineering',
    location: 'Lagos',
    joinedAt: '2024-09-16',
  },
  {
    id: 12,
    name: 'Liam Murphy',
    email: 'liam@lab.dev',
    role: 'Admin',
    active: true,
    department: 'Operations',
    location: 'Dublin',
    joinedAt: '2022-02-14',
  },
]

let employees = structuredClone(seedEmployees)
let nextId = employees.length + 1

const delay = (signal?: AbortSignal, milliseconds = 350) =>
  new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, milliseconds)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('Request aborted', 'AbortError'))
    })
  })

export const employeeService = {
  async list(query: ApiQuery, signal?: AbortSignal): Promise<PaginatedResult<Employee>> {
    await delay(signal)
    const normalized = query.search?.trim().toLowerCase() ?? ''
    const filtered = employees
      .filter(
        (employee) =>
          !normalized || `${employee.name} ${employee.email}`.toLowerCase().includes(normalized),
      )
      .filter((employee) => !query.department || employee.department === query.department)
      .sort((left, right) => left[query.sort ?? 'name'].localeCompare(right[query.sort ?? 'name']))
    const start = (query.page - 1) * query.pageSize
    return {
      items: structuredClone(filtered.slice(start, start + query.pageSize)),
      total: filtered.length,
      page: query.page,
      pageSize: query.pageSize,
    }
  },

  async get(id: number, signal?: AbortSignal): Promise<Employee> {
    await delay(signal, 220)
    const employee = employees.find((candidate) => candidate.id === id)
    if (!employee) throw new Error('Employee not found.')
    return structuredClone(employee)
  },

  async create(draft: EmployeeDraft): Promise<Employee> {
    await delay(undefined, 220)
    const created: Employee = { ...draft, id: nextId++ }
    employees = [created, ...employees]
    return structuredClone(created)
  },

  async update(id: number, draft: EmployeeDraft): Promise<Employee> {
    await delay(undefined, 220)
    const index = employees.findIndex((employee) => employee.id === id)
    if (index < 0) throw new Error('Employee not found.')
    const updated: Employee = { ...draft, id }
    employees.splice(index, 1, updated)
    return structuredClone(updated)
  },

  async remove(id: number): Promise<void> {
    await delay(undefined, 180)
    employees = employees.filter((employee) => employee.id !== id)
  },
}
