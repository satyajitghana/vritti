"use client";

import { ImageZoom } from "./component";
import "react-medium-image-zoom/dist/styles.css";

export default function ImageZoomExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ImageZoom>
        <img
          alt="Zoomable landscape"
          className="max-w-sm rounded-lg"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        />
      </ImageZoom>
    </div>
  );
}
