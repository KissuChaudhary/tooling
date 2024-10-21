import { Fragment } from 'react'

const WebApplicationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saze AI",
    "applicationCategory": "UtilitiesApplication",
    "description": "Saze AI is a free AI platform designed to make your work and learning easier with unlimited access to our free AI tools.",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "40+ AI Tools",
      "Boost Productivity",
      "Enhance Content Quality"
    ]
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

export default WebApplicationSchema
