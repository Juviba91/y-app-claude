-- Museum pages: official pages for galleries and museums
create table if not exists museums (
  id          bigserial primary key,
  slug        text unique not null,
  name        text not null,
  city        text,
  country     text,
  description text,
  website_url text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists museum_artworks (
  id           bigserial primary key,
  museum_id    bigint not null references museums(id) on delete cascade,
  artwork_name text not null,
  created_at   timestamptz not null default now()
);

create index on museum_artworks (museum_id);
create index on museum_artworks using gin (to_tsvector('spanish', artwork_name));

-- Public read access (no login required)
alter table museums enable row level security;
alter table museum_artworks enable row level security;

create policy "public_select" on museums for select using (active = true);
create policy "public_select" on museum_artworks for select using (true);

-- ─── SEED: EJPLO Museum ──────────────────────────────────────────────────────
insert into museums (slug, name, city, country, description, website_url) values (
  'ejplo-museum',
  'EJPLO Museum',
  'Madrid',
  'España',
  'EJPLO Museum reúne las obras más icónicas del arte español, desde Velázquez y Goya hasta Picasso y Dalí. Una colección pensada para explorar la riqueza del arte ibérico a través de los siglos.',
  'https://ejplo.museum'
);

-- Artworks linked to EJPLO Museum
insert into museum_artworks (museum_id, artwork_name)
select id, obra from museums, unnest(array[
  'Las Meninas',
  'El Guernica',
  'Guernica',
  'La maja desnuda',
  'La maja vestida',
  'El jardín de las delicias',
  'Saturno devorando a su hijo',
  'El tres de mayo de 1808',
  'El tres de mayo',
  'El dos de mayo de 1808',
  'El dos de mayo',
  'La rendición de Breda',
  'El entierro del conde de Orgaz',
  'El caballero de la mano en el pecho',
  'La familia de Carlos IV',
  'Las hilanderas',
  'La persistencia de la memoria',
  'La Trinidad',
  'El coloso',
  'La fragua de Vulcano',
  'Cristo crucificado',
  'La Inmaculada Concepción',
  'El expolio',
  'Vista de Toledo'
]) as t(obra)
where slug = 'ejplo-museum';
