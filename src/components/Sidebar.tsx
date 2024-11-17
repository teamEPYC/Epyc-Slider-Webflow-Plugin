import {
  ArrowLeft,
  ArrowLeftRight,
  Box,
  ChevronLeftIcon,
  Layers,
} from "lucide-react";
import React from "react";
import { Slider } from "./ui/Slider";
import { Switch } from "./ui/Switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { SliderConfig } from "src/types/slider-config";
import {
  applyStyles,
  createBulletPagination,
  createButtonNavigation,
  createFractionPagination,
  createProgressPagination,
  createSliderStructure,
  setCustomAttribute,
} from "../lib/slider-utils";

type Props = {
  config: SliderConfig;
  updateConfig: (
    type: "parameters" | "modules",
    key: string,
    value: any
  ) => void;
  setIsCustomizeModeOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sidebar({ setIsCustomizeModeOn, config, updateConfig }: Props) {
  const insertCustomConfigSliderComponent = async () => {
    try {
      const el = await webflow.getSelectedElement();
      if (!el?.children) {
        console.error("No element selected");
        return;
      }

      // Create main slider container
      const parentStyle = await getOrCreateStyle("epyc-slider-attributes");
      const sliderAttributesDiv = await el.append(
        webflow.elementPresets.DivBlock
      );
      await applyStyles(sliderAttributesDiv, [parentStyle]);
      await setCustomAttribute(
        sliderAttributesDiv,
        "epyc-slider-element",
        "list"
      );
      const styles = {
        buttonNavigation: {
          wrapperStyle: await getOrCreateStyle("swiper-navigation"),
          prevStyle: await getOrCreateStyle("swiper-prev"),
          nextStyle: await getOrCreateStyle("swiper-next"),
        },
        bulletPagination: {
          wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
          bulletStyle: await getOrCreateStyle("swiper-bullet"),
          activeBulletStyle: await getOrCreateStyle("swiper-bullet-active"),
        },
        fractionPagination: {
          wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
          currentFractionStyle: await getOrCreateStyle(
            "swiper-fraction-current"
          ),
          totalFractionStyle: await getOrCreateStyle("swiper-fraction-total"),
        },
        progressPagination: {
          wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
          progressStyle: await getOrCreateStyle("swiper-progress-fill"),
        },
      };

      // Create navigation and pagination elements based on enabled modules
      if (config.modules.navigation.enabled) {
        await createButtonNavigation(
          sliderAttributesDiv,
          styles.buttonNavigation
        );
      }

      if (config.modules.bulletPagination.enabled) {
        styles.bulletPagination.bulletStyle.setProperties({
          height: "16px",
          width: "16px",
          "background-color": "gray",
        });
        styles.bulletPagination.activeBulletStyle.setProperties({
          "background-color": "green",
        });
        await createBulletPagination(
          sliderAttributesDiv,
          styles.bulletPagination
        );
      }

      if (config.modules.fractionPagination.enabled) {
        await setCustomAttribute(
          sliderAttributesDiv,
          "epyc-pagination-type",
          "fraction"
        );
        await createFractionPagination(
          sliderAttributesDiv,
          styles.fractionPagination
        );
      }

      if (config.modules.progressPagination.enabled) {
        await setCustomAttribute(
          sliderAttributesDiv,
          "epyc-pagination-type",
          "progress"
        );
        await createProgressPagination(
          sliderAttributesDiv,
          styles.progressPagination
        );
      }

      // Set custom attributes for all enabled features
      const attributes = [
        { key: "epyc-autoplay", value: config.modules.autoplay.enabled },
        {
          key: "epyc-mousewheel",
          value: config.modules.mousewheelControl.enabled,
        },
        { key: "epyc-keyboard", value: config.modules.keyboardControl.enabled },
        { key: "epyc-loop", value: config.modules.infiniteLoop.enabled },
        {
          key: "epyc-direction",
          value: config.parameters.slideDirection.value,
        },
        {
          key: "epyc-slider-perview",
          value: config.parameters.slidesPerView.value,
        },
        {
          key: "epyc-space-between",
          value: config.parameters.spaceBetweenSlides.value,
        },
      ];

      for (const { key, value } of attributes) {
        await setCustomAttribute(sliderAttributesDiv, key, value.toString());
      }

      // Create the basic slider structure
      await createSliderStructure(sliderAttributesDiv);

      console.log("Slider component inserted successfully");
    } catch (error) {
      console.error("Failed to insert slider component:", error);
    }
  };
  const getOrCreateStyle = async (styleName: string) => {
    let style = await webflow.getStyleByName(styleName);
    if (!style) {
      style = await webflow.createStyle(styleName);
    }
    return style;
  };
  return (
    <div className="w-80 bg-[#232323] border-r border-neutral-800 flex flex-col">
      {/* Scrollable Settings */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-neutral-400 mb-4">
            PARAMETERS
          </h2>

          <div className="space-y-6">
            {/* Slide Direction */}
            <div className="flex w-full flex-col justify-between">
              <div className="flex items-center gap-3 ">
                <ArrowLeftRight className="w-4 h-4 text-white" />
                <span className="text-sm text-neutral-200">
                  {config.parameters.slideDirection.label}
                </span>
              </div>
              <select
                value={config.parameters.slideDirection.value}
                onChange={(e) =>
                  updateConfig("parameters", "slideDirection", {
                    ...config.parameters.slideDirection,
                    value: e.target.value,
                  })
                }
                className="mt-2 h-8 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
              >
                {config.parameters.slideDirection.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Slides per view */}
            <div className="flex w-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-white" />
                <span className="text-sm text-neutral-200">
                  {config.parameters.slidesPerView.label}
                </span>
              </div>
              <select
                value={config.parameters.slidesPerView.value}
                onChange={(e) =>
                  updateConfig("parameters", "slidesPerView", {
                    ...config.parameters.slidesPerView,
                    value: e.target.value,
                  })
                }
                className=" h-8 mt-2 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
              >
                {config.parameters.slidesPerView.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Space between slides */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Box className="w-4 h-4 text-white" />
                <span className="text-sm text-neutral-200">
                  {config.parameters.spaceBetweenSlides.label}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={config.parameters.spaceBetweenSlides.value}
                  onChange={(e) =>
                    updateConfig("parameters", "spaceBetweenSlides", {
                      ...config.parameters.spaceBetweenSlides,
                      value: Number(e.target.value),
                    })
                  }
                  min="0"
                  max={config.parameters.spaceBetweenSlides.max}
                  step={config.parameters.spaceBetweenSlides.step}
                  className="flex-1"
                />
                <span className="text-sm text-neutral-400 min-w-[48px]">
                  {config.parameters.spaceBetweenSlides.value}px
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-neutral-400 mt-8 mb-4">
            MODULES
          </h2>

          <div className="space-y-4">
            {Object.entries(config.modules).map(([key, module]) => {
              const Icon = module.icon;
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-sm text-neutral-200">
                      {module.label}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      updateConfig("modules", key, {
                        ...module,
                        enabled: !module.enabled,
                      })
                    }
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-neutral-700 transition-colors duration-200 ease-in-out ${
                      module.enabled ? "bg-blue-600" : "bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        module.enabled ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 p-4 flex justify-between bg-[#232323]">
        <button
          type="button"
          onClick={() => setIsCustomizeModeOn(false)}
          className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          back
        </button>
        <button
          type="button"
          onClick={insertCustomConfigSliderComponent}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
