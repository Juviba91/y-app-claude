-- Museum analytics: capture every user interaction for reporting
-- Note: table named art_analytics to avoid conflict with existing events table
create table if not exists art_analytics (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  event       text        not null,
  session_id  text,
  language    text,
  artwork     text,
  topic       text,
  source      text,
  properties  jsonb
);

-- Index for common museum queries
create index on art_analytics (event);
create index on art_analytics (created_at);
create index on art_analytics (artwork) where artwork is not null;
create index on art_analytics (topic)   where topic   is not null;

-- Row-level security: anonymous visitors can only insert, never read
alter table art_analytics enable row level security;

create policy "anon_insert"
  on art_analytics for insert
  to anon
  with check (true);

-- Authenticated museum staff can read all events
create policy "auth_select"
  on art_analytics for select
  to authenticated
  using (true);
