SELECT DISTINCT   LOWER(t."search_string") as search
FROM public."Search" t WHERE t."search_string" != ''
