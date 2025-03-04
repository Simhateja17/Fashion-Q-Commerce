import React, { useState } from "react";

export default function VirtualTryOn() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Virtual Try-On</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {image && <img src={image} alt="User Upload" className="w-40 h-40 object-cover rounded-md" />}
      <p className="mt-2 text-gray-600">Upload a photo to see how clothes look on you!</p>
    </div>
  );
}
