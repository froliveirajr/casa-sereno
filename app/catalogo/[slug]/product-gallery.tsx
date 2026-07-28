"use client";

import { useState } from "react";

export function ProductGallery({ images, productName, status, statusTone }: { images: string[]; productName: string; status: string; statusTone: string }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="product-detail-visual">
        <img src={selectedImage} alt={`${productName} — foto selecionada`} />
        <span className={`status status-${statusTone}`}>{status}</span>
      </div>
      {images.length > 1 && (
        <div className="product-thumbnails" aria-label={`Fotos de ${productName}`}>
          {images.map((image, index) => (
            <button type="button" key={image} className={selectedImage === image ? "is-active" : ""} aria-label={`Ver foto ${index + 1} de ${productName}`} aria-pressed={selectedImage === image} onClick={() => setSelectedImage(image)}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
