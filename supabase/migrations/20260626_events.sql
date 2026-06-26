-- Museum analytics: capture every user interaction for reporting
create table if not exists events (
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
create index on events (event);
create index on events (created_at);
create index on events (artwork) where artwork is not null;
create index on events (topic)   where topic   is not null;

-- Row-level security: anonymous visitors can only insert, never read
alter table events enable row level security;

create policy "anon_insert"
  on events for insert
  to anon
  with check (true);

-- Authenticated museum staff can read all events
create policy "auth_select"
  on events for select
  to authenticated
  using (true);
