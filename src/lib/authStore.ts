import type Clerk from '@clerk/clerk-js'
import { atom } from 'nanostores'

export const auth = atom<Clerk | null>(null)