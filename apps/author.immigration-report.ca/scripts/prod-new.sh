yarn run build
echo "$1" > ./out/version.txt
netlify deploy --prod --dir=apps/author.immigration-report.ca/out
