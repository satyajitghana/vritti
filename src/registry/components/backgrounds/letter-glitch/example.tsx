import LetterGlitch from "./component";

export default function LetterGlitchExample() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <LetterGlitch glitchColors={["#ff0000","#00ff00","#0000ff"]} glitchSpeed={50} centerVignette={true} outerVignette={true} smooth={true} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
    </div>
  );
}
