yarn run build
echo "${{ github.ref_name }}-${{ github.sha }}" > ./out/version.txt
netlify deploy --prod
