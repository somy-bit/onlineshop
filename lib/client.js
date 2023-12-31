import sanityClient from "@sanity/client"
import  ImageUrlBuilder from "@sanity/image-url"

export const client =sanityClient({
    projectId:"4cx9v5bu",
    useCdn:true,
    apiVersion:"2022-03-10",
    dataset:"production",
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source)=>builder.image(source);



