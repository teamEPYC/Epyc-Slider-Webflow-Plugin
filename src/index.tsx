import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { sliderTempelateList } from "./constants/SliderTemplateList";
import { Settings } from "lucide-react";
import { defaultSliderConfig, SliderConfig } from "./types/slider-config";
import PreviewScreen from "./components/PreviewScreen";
import { insertCustomConfigSliderComponent } from "./lib/slider-utils";
import {
  EffectsConfig,
  initialSliderConfig,
  ModuleConfig,
  ParametersConfig,
  SliderTypesConfig,
} from "./types/sliderTypes";
import CustomizationSidebar from "./components/CustomizationSidebar";

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

  function resetconfig() {
    setIsCustomizeModeOn(false);
    setConfig(defaultSliderConfig);
  }
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
  // new code starts
  const [sliderConfig, setSliderConfig] =
    useState<SliderTypesConfig>(initialSliderConfig);

  const updateModuleValue = <K extends keyof Omit<ModuleConfig, "autoplay">>(
    key: K,
    value: ModuleConfig[K]["value"]
  ) => {
    setSliderConfig((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [key]: { ...prev.modules[key], value },
      },
    }));
  };

  const updateParameterValue = <K extends keyof ParametersConfig>(
    key: K,
    value: ParametersConfig[K]["value"]
  ) => {
    console.log(value, "key");
    setSliderConfig((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: { ...prev.parameters[key], value },
      },
    }));
  };

  const updateEffectValue = <K extends keyof EffectsConfig>(
    key: K,
    value: EffectsConfig[K]["value"]
  ) => {
    setSliderConfig((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [key]: { ...prev.effects[key], value },
      },
    }));
  };

  console.log({ TestingConfig: sliderConfig });
  // new code ends

  if (isCustomizeModeOn) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <CustomizationSidebar
          parametersConfig={sliderConfig.parameters}
          effectsConfig={sliderConfig.effects}
          moduleConfig={sliderConfig.modules}
          updateParameterValue={updateParameterValue}
          updateEffectValue={updateEffectValue}
          onModuleUpdate={updateModuleValue}
          config={sliderConfig}
          updateConfig={updateConfig}
          resetconfig={resetconfig}
        />
        {/* <Sidebar
          config={config}
          updateConfig={updateConfig}
          resetconfig={resetconfig}
        /> */}

        <div className="flex justify-center items-center p-8">
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
          <div className="flex flex-col gap-6">
            {sliderTempelateList.map((preset, index) => (
              <div key={index} className="group">
                <div className="bg-[#232323] rounded-2xl border border-neutral-800 p-6 hover:border-neutral-700 transition-all duration-200">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {preset.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleCustomize(preset)}
                        className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        // onClick={() =>
                        //   insertCustomConfigSliderComponent({ config: preset })
                        // }
                        className="border border-neutral-700 text-neutral-300 px-2 py-1 rounded-md hover:border-neutral-600 hover:text-white transition-colors duration-200"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <PreviewScreen config={preset} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
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
