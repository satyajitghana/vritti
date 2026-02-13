import CountUp from "./component";

export default function CountUpExample() {
  return (
    <div className="flex items-center justify-center p-8 text-4xl font-bold">
      <CountUp to={1000} />
    </div>
  );
}
