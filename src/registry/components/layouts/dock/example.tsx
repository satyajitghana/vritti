"use client";

import { HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import { Dock, DockIcon } from "./component";

export default function DockExample() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Dock direction="middle">
        <DockIcon>
          <HomeIcon className="size-4" />
        </DockIcon>
        <DockIcon>
          <PencilIcon className="size-4" />
        </DockIcon>
        <DockIcon>
          <MailIcon className="size-4" />
        </DockIcon>
      </Dock>
    </div>
  );
}
