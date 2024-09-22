SELECT
    DISTINCT lower(t."search_string") as search
FROM public."Search" t WHERE lower(t."search_string") != ''
