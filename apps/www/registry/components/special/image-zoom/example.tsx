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
          src="/placeholder.jpg"
        />
      </ImageZoom>
    </div>
  );
}
