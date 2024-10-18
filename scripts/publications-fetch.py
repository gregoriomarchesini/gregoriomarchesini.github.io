from scholarly import scholarly
import yaml

# Search for a specific author by their Google Scholar profile
author = scholarly.search_author('Gregorio Marchesini')

# Fill the author's information
author = next(author)
scholarly.fill(author)

# Extract publications
publications = author['publications']

# Prepare publication data for your site
publication_data = []
for pub in publications:
    scholarly.fill(pub)
    publication_data.append({
        "name": pub['bib']['author'],
        "title": pub['bib']['title'],
        "urlpdf": pub.get('pub_url', ''),  # URL if available
        "urlbib": f"google_scholar_bibtex_link_{pub['bib']['title']}",  # Needs manual export or additional scraping
    })

# Save or export the publication data as yaml
with open('publications.yaml', 'w') as f:
    yaml.dump(publication_data, f)