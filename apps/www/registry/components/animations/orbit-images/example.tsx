import OrbitImages from "./component";

export default function OrbitImagesExample() {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <OrbitImages
        images={[
          "/placeholder.jpg",
          "/placeholder.jpg",
          "/placeholder.jpg",
          "/placeholder.jpg",
        ]}
      />
    </div>
  );
}
