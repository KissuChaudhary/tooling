import { Fragment } from 'react'

const WebSiteSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Saze AI",
    "url": "https://sazeai.com",
    "description": "Saze AI is a free AI platform designed to make your work and learning easier with unlimited access to our free AI tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sazeai.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Fragment>
  )
}

export default WebSiteSchema