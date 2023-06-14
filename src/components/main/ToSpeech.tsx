import { ReactElement, useContext, useEffect, useState, memo } from "react";
import RoundBTN from "./SquareBTN";
import { LangContext, TransContext } from "./Main";
import { voiceLanguages } from "../../data/langs";
import AlertBox from "../common/AlertBox";

type PropTypes = {
  role: "src" | "dest";
};
function ToSpeech({ role }: PropTypes): ReactElement {
  const { translation } = useContext(TransContext);
  const { selectedLangs } = useContext(LangContext);
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [connection, setConnection] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const playHandler = () => {
    let voiceIndex =
      role === "src"
        ? (selectedLangs.src.code as keyof object)
        : (selectedLangs.dest.code as keyof object);
    if (!connection) return undefined;
    if (!voiceLanguages[voiceIndex]) {
      setMessage("No supported voice found");
      return undefined;
    }
    setPlaying((prev) => !prev);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setConnection(false);
    });
    window.addEventListener("online", () => {
      setConnection(true);
    });
  }, []);

  useEffect(() => {
    async function fetchVoice() {
      let voiceIndex =
        role === "src"
          ? (selectedLangs.src.code as keyof object)
          : (selectedLangs.dest.code as keyof object);
      let language = voiceLanguages[voiceIndex];
      let text = role === "src" ? translation.input : translation.output;
      let url: string = `https://api.voicerss.org/?key=c8ff2dc1156842cc8dab1156da674018&hl=${language}&c=MP3&src=${text}&f=48khz_16bit_mono`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAudio(new Audio(await response.url));
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (playing) {
      fetchVoice();
    } else {
      setAudio(null);
    }
  }, [playing]);
  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        setPlaying(false);
      });
      audio.autoplay = true;
      playing ? audio.play() : audio.pause();
    }
  }, [audio, playing]);

  return (
    <>
      <RoundBTN
        iconName={playing ? "Stop" : "Listen"}
        description={playing ? "Stop" : "Listen"}
        handler={() => {
          playHandler();
        }}
      />
      <AlertBox text={message} />
    </>
  );
}

export default memo(ToSpeech);
