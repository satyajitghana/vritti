"use client";

import { useState } from "react";
import { QRCode, QRCodeImage } from "./component";

export default function QRCodeExample() {
  const [url, setUrl] = useState("https://example.com");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <input
        className="h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to encode..."
      />
      <QRCode value={url} size={200}>
        <QRCodeImage />
      </QRCode>
      <p className="text-sm text-muted-foreground">
        Scan the QR code or enter a different URL above
      </p>
    </div>
  );
}
