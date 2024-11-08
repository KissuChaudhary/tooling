import { Fragment } from 'react';

const WebApplicationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
        "additionalType": [
          "https://schema.org/CreativeWork",
          "https://schema.org/SoftwareApplication"
        ],
        "softwareVersion": "1.0",  // Optional: add a version if relevant
        "featureList": [
          "40+ AI Tools",
          "Boost Productivity",
          "Enhance Content Quality"
        ]
      },
      {
        "@type": "WebPage",
        "name": "Saze AI: Free AI Writing, Image Generation, and Creative Tools Hub",
        "description": "Saze AI is an AI-powered content generating tool to help you quickly create high-quality content that requires minimal effort, time, and cost.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Saze AI",
          "url": "https://sazeai.com/"
        },
        "url": "https://sazeai.com/",
        "about": {
          "@type": "Thing",
          "name": "AI Writing and Creative Tools"
        }
      }
    ]
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Fragment>
  );
};

export default WebApplicationSchema;
