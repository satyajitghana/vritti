"use client";

import AvatarPicker from "./component";

export default function AvatarPickerExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AvatarPicker onComplete={(data) => console.log(data)} />
    </div>
  );
}
