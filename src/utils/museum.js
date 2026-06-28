import { supabase } from './supabaseClient'

// Returns basic museum info if this artwork name matches one in the DB
export async function getMuseumByArtwork(artworkName) {
  if (!supabase || !artworkName) return null
  const { data } = await supabase
    .from('museum_artworks')
    .select('museums(id, slug, name, city, country)')
    .ilike('artwork_name', `%${artworkName}%`)
    .limit(1)
    .maybeSingle()
  return data?.museums ?? null
}

// Returns full museum data + its artwork list
export async function getMuseumFull(museumId) {
  if (!supabase) return null
  const [{ data: museum }, { data: artworks }] = await Promise.all([
    supabase.from('museums').select('*').eq('id', museumId).single(),
    supabase
      .from('museum_artworks')
      .select('artwork_name')
      .eq('museum_id', museumId)
      .order('artwork_name'),
  ])
  if (!museum) return null
  // Deduplicate display names (e.g. "Guernica" and "El Guernica" → only longest kept)
  const names = [...new Set(artworks?.map(r => r.artwork_name) ?? [])]
  return { ...museum, artworks: names }
}
