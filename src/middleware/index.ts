import { sequence } from 'astro:middleware'
import { protectedApis } from './protectedApis'
import { protectedPages } from './protectedPages'

export const onRequest = sequence(protectedPages, protectedApis)