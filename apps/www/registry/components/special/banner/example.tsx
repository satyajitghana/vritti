"use client";

import { MegaphoneIcon } from "lucide-react";
import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "./component";

export default function BannerExample() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <Banner inset>
        <BannerIcon icon={MegaphoneIcon} />
        <BannerTitle>
          We just launched a new feature! Check it out.
        </BannerTitle>
        <BannerAction>Learn More</BannerAction>
        <BannerClose />
      </Banner>
    </div>
  );
}
