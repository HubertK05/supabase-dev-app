CREATE TABLE todos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

create policy "Enable insert for users based on user_id"
on todos
as PERMISSIVE
for INSERT
to public
with check (
    (select auth.uid()) = user_id
);

create policy "Enable delete for users based on user_id"
on todos
as PERMISSIVE
for DELETE
to public
using (
    (select auth.uid()) = user_id
);

create policy "Enable select for users based on user_id"
on todos
as PERMISSIVE
for SELECT
to public
using (
    (select auth.uid()) = user_id
);
