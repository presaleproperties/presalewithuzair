create table if not exists public._blog_merge_map(loser text primary key, winner text not null);
truncate public._blog_merge_map;
insert into public._blog_merge_map(loser, winner) values
('fthb-gst-rebate-save-50000-bc-presales-2026','first-time-buyer-gst-rebate-bc-presale-2026'),
('gst-rebate-first-time-buyers-bc-presale-condos','first-time-buyer-gst-rebate-bc-presale-2026'),
('gst-rebate-presale-condos-bc-2026','first-time-buyer-gst-rebate-bc-presale-2026'),
('presale-assignment-condos-bc-how-to-buy-2026','assignment-sales-bc-2026-process-fees-taxes'),
('selling-before-completion-assignment-sales-presale-profits','assignment-sales-bc-2026-process-fees-taxes'),
('surrey-assignment-flip-sell-presale-contract-before-completion','assignment-sales-bc-2026-process-fees-taxes'),
('surrey-presale-assignment-flip-how-to-sell-contract','assignment-sales-bc-2026-process-fees-taxes'),
('selling-a-presale-condo-assignment-in-fraser-valley-what-you-need-to-know','assignment-sales-bc-2026-process-fees-taxes'),
('why-developer-blocking-presale-assignment-bc','assignment-sales-bc-2026-process-fees-taxes'),
('gst-on-presale-assignment-sales-bc-rules','assignment-sales-gst-cra-anti-flipping-2026'),
('presale-assignment-sales-exit-strategy-bc','how-to-price-presale-assignment-bc'),
('how-to-buy-presale-condo-bc','how-to-buy-a-presale-in-bc-2026'),
('how-buying-presale-condo-bc-works','how-to-buy-a-presale-in-bc-2026'),
('how-buying-presale-condo-bc-works-complete-guide','how-to-buy-a-presale-in-bc-2026'),
('complete-guide-buying-presale-condos-vancouver-2026','how-to-buy-a-presale-in-bc-2026'),
('buy-presale-fraser-valley','how-to-buy-a-presale-in-bc-2026'),
('presale-condo-deposit-structure-bc','understanding-presale-deposit-structure-bc-2026'),
('presale-deposit-protection-bc','understanding-presale-deposit-structure-bc-2026'),
('presale-condo-financials-deposits-mortgages-hidden-costs','how-much-cash-to-buy-presale-bc-2026'),
('presale-condo-bc-deposits-hidden-costs-gst','how-much-cash-to-buy-presale-bc-2026'),
('7-day-rescission-period-bc-presale','bc-presale-7-day-rescission-period-2026'),
('presale-completion-delayed-6-24-months-bc-rights','presale-delayed-bc-rights-outside-date-2026'),
('what-happens-if-your-presale-condo-is-worth-less-at-completion','presale-appraisal-gap-completion-bc-2026'),
('bc-s-new-20-flipping-tax-what-it-means-for-pre-sale-buyers-and-investors','bc-home-flipping-tax-presale-2026'),
('does-the-bc-home-flipping-tax-apply-to-presale-condos-what-buyers-need-to-know-in-2026','bc-home-flipping-tax-presale-2026'),
('the-bc-home-flipping-tax-and-your-presale-condo-what-surrey-buyers-and-investors-must-know-in-2026','bc-home-flipping-tax-presale-2026'),
('presale-risks-developer-bankruptcy-cancellations-bc','is-buying-presale-safe-developer-risks-deposit-protection'),
('5-presale-condo-risks-bc-buyers-must-know','is-buying-presale-safe-developer-risks-deposit-protection');

create temporary table _secs as
select m.winner,
       s.sec,
       lower(regexp_replace(coalesce(substring(s.sec from '<h2[^>]*>(.*?)</h2>'),''), '<[^>]*>|[^a-zA-Z0-9]', '', 'g')) as key
from public._blog_merge_map m
join public.blog_posts l on l.slug = m.loser
cross join lateral regexp_split_to_table(l.content, '(?=<h2)') as s(sec)
where s.sec ~ '<h2' and length(s.sec) > 300;

create temporary table _add as
select distinct on (winner, key) winner, key, sec
from _secs u
where key <> ''
  and not exists (
    select 1 from public.blog_posts w
    where w.slug = u.winner
      and position(u.key in lower(regexp_replace(w.content, '<[^>]*>|[^a-zA-Z0-9]', '', 'g'))) > 0
  )
order by winner, key, length(sec) desc;

update public.blog_posts w
set content = w.content || '<h2>More questions buyers ask</h2>' || agg.add,
    updated_at = now()
from (select winner, string_agg(sec, '' order by key) as add from _add group by winner) agg
where w.slug = agg.winner;

update public.blog_posts set published = false, updated_at = now()
where slug in (select loser from public._blog_merge_map);

drop table public._blog_merge_map;