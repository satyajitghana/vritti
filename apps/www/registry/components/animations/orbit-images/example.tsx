import OrbitImages from "./component";

export default function OrbitImagesExample() {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <OrbitImages
        images={[
          "https://picsum.photos/seed/orbit1/200/200",
          "https://picsum.photos/seed/orbit2/200/200",
          "https://picsum.photos/seed/orbit3/200/200",
          "https://picsum.photos/seed/orbit4/200/200",
        ]}
      />
    </div>
  );
}
