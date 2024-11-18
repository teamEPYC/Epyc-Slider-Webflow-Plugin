import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { sliderTempelateList } from "./constants/SliderTemplateList";
import Sidebar from "./components/Sidebar";
import { Settings, Compass, Minimize2, Clock } from "lucide-react";
import { defaultSliderConfig, SliderConfig } from "./types/slider-config";
import PreviewScreen from "./components/PreviewScreen";
import { insertCustomConfigSliderComponent } from "./lib/slider-utils";

export const getOrCreateStyle = async (styleName: string) => {
  let style = await webflow.getStyleByName(styleName);
  if (!style) {
    style = await webflow.createStyle(styleName);
  }
  return style;
};
const App: React.FC = () => {
  const [isCustomizeModeOn, setIsCustomizeModeOn] = useState<boolean>(false);
  const [config, setConfig] = useState<SliderConfig>(defaultSliderConfig);

  const updateConfig = (
    type: "parameters" | "modules",
    key: string,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  if (isCustomizeModeOn) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <Sidebar
          setIsCustomizeModeOn={setIsCustomizeModeOn}
          config={config}
          updateConfig={updateConfig}
        />

        <div className="flex justify-center items-center bg-[#1a1a1a] p-8">
          <PreviewScreen config={config} />
        </div>
      </div>
    );
  }
  const handleCustomize = (item: SliderConfig) => {
    setConfig(item);
    setIsCustomizeModeOn(true);
  };
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-8">
          <div className="bg-[#232323] rounded-xl border border-neutral-800 p-6 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Customize Your Swiper
                </h2>
                <p className="text-neutral-400 text-sm">
                  Start from scratch and design your unique swiper.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCustomizeModeOn(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Start Customizing</span>
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 text-white">
            Choose a Preset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sliderTempelateList.map((preset, index) => (
              <div key={index} className="group">
                <div className="bg-[#232323] rounded-2xl border border-neutral-800 p-6 hover:border-neutral-700 transition-all duration-200">
                  <div className="relative mb-6">
                    <PreviewScreen config={preset} />
                  </div>
                  <div className="flex flex-col items-start gap-2 justify-start">
                    <h3 className="text-lg font-semibold text-white">
                      {preset.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleCustomize(preset)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          insertCustomConfigSliderComponent({ config: preset })
                        }
                        className="border border-neutral-700 text-neutral-300 px-4 py-2 rounded-lg hover:border-neutral-600 hover:text-white transition-colors duration-200"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    // <div className="w-full bg-zinc-900 antialiased">
    //   <div className="w-full p-4">
    //     <h1 className="text-zinc-200 font-bold text-lg">Epyc Slider Builder</h1>
    //     <div className="flex flex-col items-center justify-center w-full mt-6">
    //       <h2 className="text-4xl text-zinc-300 font-semibold">
    //         Create amazing slider with no code
    //       </h2>
    //       <h3 className="text-base text-zinc-300 mt-2">
    //         Customize your slider or choose from our presets to get started
    //         quickly
    //       </h3>
    //     </div>
    //     <div className="flex w-full items-center justify-center mt-4">
    //       <button
    //         onClick={() => setIsCustomizeModeOn(true)}
    //         className="bg-white text-black px-2 py-1 text-xs font-bold flex items-center rounded cursor-pointer"
    //       >
    //         <span>Customize</span>
    //         <span>
    //           <ChevronRightIcon className="text-black size-4" />
    //         </span>
    //       </button>
    //     </div>

    //     <form className="w-full flex flex-col space-y-4 text-white mt-4">
    //       {sliderTempelateList.map((item, index) => (
    //         <div key={index}>
    //           <div className="flex w-full justify-between items-center pt-2">
    //             <p className="text-lg font-semibold text-zinc-400">
    //               {item.name}
    //             </p>
    //             <div className="flex space-x-2">
    //               <button
    //                 type="button"
    //                 onClick={() => {
    //                   handleCustomize(item);
    //                 }}
    //                 className="text-xs bg-zinc-300 border border-zinc-900 text-zinc-900 w-20 hover:bg-zinc-900 hover:text-zinc-300 hover:border hover:border-zinc-300 px-2 duration-100 py-2 rounded font-semibold"
    //               >
    //                 Customize
    //               </button>
    //               <button
    //                 type="button"
    //                 onClick={() => {}}
    //                 className="text-xs bg-zinc-300 border border-zinc-900 text-zinc-900 w-20 hover:bg-zinc-900 hover:text-zinc-300 hover:border hover:border-zinc-300 px-2 duration-100 py-2 rounded font-semibold"
    //               >
    //                 Insert
    //               </button>
    //             </div>
    //           </div>
    //           <div className="w-full h-56 bg-black pt-4 rounded-xl mt-4 flex">
    //             <PreviewScreen config={item} />
    //           </div>
    //         </div>
    //       ))}
    //     </form>
    //   </div>
    // </div>
  );
};

const initializeExtension = async (): Promise<void> => {
  try {
    await webflow.setExtensionSize("large");
  } catch (error) {
    console.error("Failed to initialize extension:", error);
  }
};

await initializeExtension();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
