import { Fragment } from 'react'

const WebSiteSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Saze AI: Free AI Writing, Image Generation, and Creative Tools Hub",
    "url": "https://sazeai.com",
    "description": "Saze AI is an AI-powered content generating tool to help you quickly create high-quality content that requires minimal effort, time, and cost.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sazeai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "siteNavigationElement": [
      {
        "@type": "SiteNavigationElement",
        "name": "Writing Tools",
        "url": "https://sazeai.com/writing-tools"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Social Media Tools",
        "url": "https://sazeai.com/social-media-tools"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Marketing Tools",
        "url": "https://sazeai.com/marketing-tools"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "AI Image Tools",
        "url": "https://sazeai.com/ai-image-tools"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Contact Us",
        "url": "https://sazeai.com/page/contact-us"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Blog",
        "url": "https://sazeai.com/blog"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "About Us",
        "url": "https://sazeai.com/page/about-us"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Privacy Policy",
        "url": "https://sazeai.com/page/privacy-policy"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Terms",
        "url": "https://sazeai.com/page/terms"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "All Tools",
        "url": "https://sazeai.com/tools"
      }
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

export default WebSiteSchema
