"use client";

import { PerspectiveBook } from "./component";

export default function PerspectiveBookExample() {
  return (
    <div className="flex items-center justify-center p-16">
      <PerspectiveBook>
        <div className="w-48 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          My Book
        </div>
      </PerspectiveBook>
    </div>
  );
}
