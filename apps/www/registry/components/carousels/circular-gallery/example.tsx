import CircularGallery from "./component";

export default function CircularGalleryExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <CircularGallery
        items={[
          { image: "/placeholder.jpg", text: "Coastline" },
          { image: "/placeholder.jpg", text: "Palm Trees" },
          { image: "/placeholder.jpg", text: "Bridge" },
          { image: "/placeholder.jpg", text: "Desk Setup" },
          { image: "/placeholder.jpg", text: "Waterfall" },
          { image: "/placeholder.jpg", text: "Mountains" },
        ]}
      />
    </div>
  );
}
