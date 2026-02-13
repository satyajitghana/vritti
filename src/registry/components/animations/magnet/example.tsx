import Magnet from "./component";

export default function MagnetExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Magnet>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
          Hover me
        </button>
      </Magnet>
    </div>
  );
}
