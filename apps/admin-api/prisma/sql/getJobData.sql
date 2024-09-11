SELECT
    t."id" as job_id,
    t."jobbank_link_id" as jobbank_link_id,
    t."is_lmia" as is_lmia,
    t."title" as title,
    t."posted_on" as jobPostedOn,
    t."jobbank_id" as jobBankId,
    t."number_of_vacancies" as vacancies,
    t."employment_type" as employmentType,
    t."work_type_situation" as jobSituation,
    t."street_address" as streetAddress,
    t."address_locality" as addressLocality,
    t."address_region" as addressRegion,
    t."postal_code" as postalCode,
    t."how_to_apply_email" as email,
    t."address_locality" as lastDateToApply,
    t5."min_value" as minValue,
    t5."max_value" as maxValue,
    t6."name" as unitText,
    t5."work_hours" as workHours,
    STRING_AGG(DISTINCT t8."name", '===') as requiredItems,
    STRING_AGG(DISTINCT t9."question", '===') as additionalQuestions,
    t2."name" as companyName,
    t3."name" as industryName,
    STRING_AGG(DISTINCT t4."name" || ' ' || t4."description", ', ') as companyType,
    t2."number_of_operating_locations" as numberOfLocations,
    t2."website" as companyWebsite,
    t3."name" as industryName
FROM public."Job" t
INNER JOIN public."Company" t2 ON t2.id = t.company_id
LEFT JOIN public."Industry" t3 ON t3.id = t2.industry_id
LEFT JOIN public."CompanySize" t4 ON t4.id = t2.company_size_id
INNER JOIN public."JobWage" t5 ON t5.job_id = t.id
INNER JOIN public."WageUnit" t6 ON t6.id = t5.wage_id
LEFT JOIN public."JobRequiredItem" t7 ON t7.job_id = t.id
LEFT JOIN public."RequiredItem" t8 ON t8.id = t7.required_item_id
LEFT JOIN public."JobAdditionalQuestions" t9 ON t9.job_id = t.id
where t.id = $1
GROUP BY t.id, t5.id, t2.id, t3.id, t6.id, t4.id
LIMIT 1
