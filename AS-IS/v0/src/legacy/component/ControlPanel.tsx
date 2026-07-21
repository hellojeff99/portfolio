import { BiWorld } from "react-icons/bi";

interface ControlPanelProps {
    lang: "ko" | "en";
    setLang: React.Dispatch<React.SetStateAction<"ko" | "en">>;
  }

const ControlPanel: React.FC<ControlPanelProps> = ({lang, setLang}) => {
      return (
      <div className="flex">
        <button 
          onClick={() => setLang((prev) => (prev === "ko" ? "en" : "ko"))}
          className="btn btn-xs btn-primary flex items-center gap-1 text-sm"
        >
          <BiWorld className="w-4 h-4" /> {lang === "ko" ? "EN" : "KR"}
        </button>
      </div>
    )
}

export default ControlPanel;