import { AnimatePresence, motion } from "framer-motion";
import videoBg from "../assets/trailer.mp4";
import sketch01 from "../assets/sketch01.png";
import sketch02 from "../assets/sketch02.png";
import sketch03 from "../assets/sketch03.png";
import sketch04 from "../assets/sketch04.png";
import sketch05 from "../assets/sketch05.png";
import sketch06 from "../assets/sketch06.png";
import model01 from "../assets/model01.png";
import model02 from "../assets/model02.png";
import model03 from "../assets/model03.png";
import model04 from "../assets/model04.png";
import model05 from "../assets/model05.png";
import model06 from "../assets/model06.png";
import team01 from "../assets/team01.jpg";
import team02 from "../assets/team02.jpg";
import team03 from "../assets/team03.jpg";
import team04 from "../assets/team04.jpg";
import team05 from "../assets/team05.jpg";
import team06 from "../assets/team06.jpg";
import five from "../assets/five.jpg";
import fiveJail from "../assets/jail_five.jpg";
import Typewriter from "typewriter-effect";
import { useTabs } from "../useTab.jsx";

const tabs = [
  {
    id: "protagonist",
    title: "Protagonist:in",
    content: (
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="w-110 h-110 overflow-hidden rounded-full justify-self-center">
          <img
            src={five}
            alt="image of the protagonist five"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="h-full font-shadows text-6xl md:text-9xl font-extrabold leading-snug text-offwhite">
            Five
          </h1>

          <p className="text-offwhite font-ibm">
            Hier könnte ein Steckbrief oder ein paar Informationen über Five
            stehen. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "prison",
    title: "Gefängnis",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={fiveJail}
          alt="prison"
          className="w-[600px] h-auto object-cover rounded-lg"
        />
        <div>
          <h1 className="font-shadows text-6xl font-extrabold leading-snug text-offwhite">
            Rikers Island
          </h1>
          <p className="text-lg text-offwhite">
            Infos über das Gefängnis: Ort, Architektur, Geschichte, Bedeutung
            usw. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "cell",
    title: "Zelle",
    content: (
      <div className="flex flex-col w-full gap-8 justify-center items-end">
        <p className="w-1/2 text-center pr-8 text-offwhite font-extralight italic text-3xl">
          "Hier könnte ein Zitat von Five stehen oder auch irgendetwas anderes"
          <img
            src={sketch01}
            alt="sketch of the cell"
            className="w-80% h-auto object-cover rounded-lg justify-self-center mt-16"
          />
        </p>
      </div>
    ),
  },
];

const Section = (props) => {
  const {
    children,
    moveUp = true,
    makeOpacity = true,
    backgroundColor,
    justify = "center",
  } = props;

  return (
    <motion.section
      style={{ backgroundColor: backgroundColor || "transparent" }}
      className={`
  h-screen w-screen p-8 mx-auto
  flex flex-col items-start justify-${justify} relative
  `}
      initial={{
        opacity: makeOpacity ? 0 : 1,
        y: moveUp ? 50 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <VideoSection setSection={setSection} />
      <AboutSection />
      <ProtagonistSection />
      <TeamSection />
    </div>
  );
};

const VideoSection = (props) => {
  const { setSection } = props;

  return (
    <Section moveUp={false} makeOpacity={false}>
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <h1 className="font-shadows text-offwhite text-[clamp(2rem,14vw,14rem)] leading-tight">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("Architectures <br/> of Memory").start();
          }}
        />
      </h1>
    </Section>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Linke Spalte */}
        <div className="grid grid-cols-[auto_1fr] items-center md:w-1/2 gap-4 text-darkblue">
          <h1 className="font-shadows text-9xl font-extrabold -rotate-90 leading-snug">
            About
          </h1>
          <p className="font-ibm">
            Hier steht ein kleiner Text über die Dokumentation und wie das
            Konzept der Dokumentation ist. Also dass die Räume selbst von den
            Protagonisten gebaut wurden. Vielleicht noch erwähnen, dass es mit
            einer Zeichnung begonnen hat und dann zusammen die Räume gebaut
            wurden. Dabei haben die Protagonisten über ihre Erfahrungen
            gesprochen. Weiter unten kommt zu einer WebXR, wo man sich die Räume
            und Nachrichten noch genauer anschauen kann.
          </p>
        </div>

        {/* Rechte Spalte: Kachel-Bilder */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-1/2">
          {[
            { normal: sketch01, hover: model01 },
            { normal: sketch02, hover: model02 },
            { normal: sketch03, hover: model03 },
            { normal: sketch04, hover: model04 },
            { normal: sketch05, hover: model05 },
            { normal: sketch06, hover: model06 },
          ].map(({ normal, hover }, i) => (
            <div className="group relative w-full h-auto" key={i}>
              {i % 2 === 0 ? (
                <>
                  <img
                    src={normal}
                    className="w-full h-auto object-cover rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <img
                    src={hover}
                    className="absolute inset-0 w-auto h-full object-cover rounded-lg transition-opacity duration-500 group-hover:opacity-0"
                  />
                </>
              ) : (
                <>
                  <img
                    src={normal}
                    className="w-full h-auto object-cover rounded-lg transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={hover}
                    className="absolute inset-0 w-auto h-full object-cover rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ProtagonistSection = () => {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <Section>
      <div className="flex justify-center w-full border-b-1 border-offwhite font-shadows text-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 w-1/3  ${
              activeTab === tab.id
                ? "bg-transparent text-offwhite border-b-2 border-offwhite"
                : "text-offwhite"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content mit Animation */}
      <div className="relative w-full overflow-hidden h-full">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full flex"
                >
                  {tab.content}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};

const TeamSection = () => {
  return (
    <Section justify="start">
      <div className="grid grid-cols-3 gap-x-8 gap-y-24 w-full">
        <h1 className="ml-16 font-shadows text-9xl col-span-3 font-darkblue">
          Team
        </h1>
        {[
          { src: team01, name: "Lena Gill" },
          { src: team02, name: "Lina Zacher" },
          { src: team03, name: "Anastasiia Gavrilova" },
          { src: team04, name: "Silas Degen" },
          { src: team05, name: "Ivan Blazetic" },
          { src: team06, name: "Daria Susak" },
        ].map(({ src, name }, i) => (
          <>
            {/* Ein Team-Mitglied */}
            <div
              key={i}
              className={`relative w-40 h-40 overflow-hidden rounded-full justify-self-center group ${
                i >= 3 ? "translate-x-15" : ""
              }`}
            >
              {/* Bild */}
              <img
                src={src}
                alt="team1"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-darkblue/80 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                <span className="text-white text-lg font-semibold text-center px-2">
                  {name}
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </Section>
  );
};
