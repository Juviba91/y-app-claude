import { track as vercelTrack } from '@vercel/analytics/react'
import { supabase } from './supabaseClient'

const SESSION_ID = Math.random().toString(36).slice(2)

export function track(event, props = {}) {
  vercelTrack(event, props)

  if (!supabase) return
  supabase.from('events').insert({
    event,
    session_id: SESSION_ID,
    language: props.language ?? null,
    artwork: props.artwork ?? null,
    topic: props.topic ?? null,
    source: props.source ?? null,
    properties: props,
  }).then(({ error }) => {
    if (error) console.warn('[analytics]', error.message)
  })
}
