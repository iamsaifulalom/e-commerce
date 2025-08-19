import { useState } from "react"

export default function ImageGallary({ images }) {
  const [largeImage, setLargeImage] = useState(images[0])

  return (
    <div>
      <img src={largeImage?.url} className="w-full object-contain aspect-square border rounded" />
      <div className="flex w-full flex-wrap gap-3 mt-5" >
        {images?.map(img => (
          <img src={img?.url}
            key={img?.url}
            onClick={() => setLargeImage(img)}
            className={`w-20 aspect-square  object-cover cursor-pointer rounded 
              ${largeImage === img ? "brightness-20" : "border"}`} />
        ))}
      </div>
    </div>
  )
}
