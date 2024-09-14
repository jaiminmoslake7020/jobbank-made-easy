SELECT COUNT(jobs.job_id) FROM (SELECT t."id"                                                          as job_id
FROM public."Job" t
         INNER JOIN public."Company" t2 ON t2.id = t.company_id
         LEFT JOIN public."Industry" t3 ON t3.id = t2.industry_id
         LEFT JOIN public."CompanySize" t4 ON t4.id = t2.company_size_id
         INNER JOIN public."JobWage" t5 ON t5.job_id = t.id
         INNER JOIN public."WageUnit" t6 ON t6.id = t5.wage_id
         LEFT JOIN public."JobRequiredItem" t7 ON t7.job_id = t.id
         LEFT JOIN public."RequiredItem" t8 ON t8.id = t7.required_item_id
         LEFT JOIN public."JobAdditionalQuestions" t9 ON t9.job_id = t.id
where lower(t.title) = $1
  AND CASE
          WHEN $2 != ''
              THEN (lower(t.address_region) = $2)
          ELSE TRUE END
  AND CASE
          WHEN $3 != ''
              THEN (lower(t.address_locality) = $3)
          ELSE TRUE END
  AND t.is_lmia = $4
GROUP BY t.id, t5.id, t2.id, t3.id, t6.id, t4.id) AS jobs
