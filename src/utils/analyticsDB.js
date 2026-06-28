import posthog from 'posthog-js'

const phKey = import.meta.env.VITE_POSTHOG_KEY
if (phKey) {
  posthog.init(phKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    capture_pageview: true,
    person_profiles: 'never',
  })
}

export const SESSION_ID = Math.random().toString(36).slice(2)

export function track(event, props = {}) {
  if (phKey) posthog.capture(event, props)
}
