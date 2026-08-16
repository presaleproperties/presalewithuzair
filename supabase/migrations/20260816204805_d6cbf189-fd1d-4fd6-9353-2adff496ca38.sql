update public.blog_posts set content = replace(content, 'At The Presale Properties Group, we have helped over 400 families', 'Uzair Muhammad has helped over 450 families') where content like '%At The Presale Properties Group, we have helped over 400 families%';

update public.blog_posts
set content = regexp_replace(regexp_replace(content, '(The )?Presale Properties Group', 'Uzair Muhammad', 'g'), '400\+ (families|keys|buyers|completed)', '450+ \1', 'g'),
    excerpt = regexp_replace(regexp_replace(coalesce(excerpt,''), '(The )?Presale Properties Group', 'Uzair Muhammad', 'g'), '400\+ (families|keys|buyers|completed)', '450+ \1', 'g'),
    updated_at = now()
where content ~ '(Presale Properties Group|400\+ (families|keys|buyers|completed))'
   or coalesce(excerpt,'') ~ '(Presale Properties Group|400\+ (families|keys|buyers|completed))';

update public.blog_posts set content = replace(content, '5.0 Google rating', '4.9 Google rating'), updated_at = now() where content like '%5.0 Google rating%';