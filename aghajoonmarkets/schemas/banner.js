export default {
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Banner Title",
      type: "string",
      description: "Main title text for the banner (e.g. Fresh Fruits & Vegetables)"
    },
    {
      name: "subtitle",
      title: "Banner Subtitle",
      type: "string",
      description: "Supporting text (e.g. Farm to your table)"
    },
    {
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image for the banner"
    },
    {
      name: "promotions",
      title: "Promotions",
      type: "array",
      description: "Rotating promotional slides for the banner",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Promo Title",
              type: "string"
            },
            {
              name: "subtitle",
              title: "Promo Subtitle",
              type: "string"
            },
            {
              name: "image",
              title: "Promo Image",
              type: "image",
              options: { hotspot: true }
            }
          ]
        }
      ]
    }
  ]
}
