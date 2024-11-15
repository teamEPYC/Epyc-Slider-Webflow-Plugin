import { ArrowLeftRight, Box, ChevronLeftIcon, Layers } from "lucide-react";
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
    <div className="flex flex-col gap-4 text-white text xs p-4">
      <div className="bg-white/20 absolute bottom-0 left-0 flex justify-evenly w-[280px]">
        <button
          className="bg-black text-white px-2 py-1 flex items-center"
          onClick={() => setIsCustomizeModeOn(false)}
        >
          <span>
            <ChevronLeftIcon className="size-4" />
          </span>
          <span>back</span>
        </button>
        <button
          className="text-black"
          onClick={insertCustomConfigSliderComponent}
        >
          Insert
        </button>
      </div>

      <div className="w-64 bg-slate-800 text-zinc-100 p-4 rounded-lg">
        <h2 className="text-xs font-medium text-zinc-400 mb-4">PARAMETERS</h2>
        <div className="space-y-3">
          {/* Slide Direction */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeftRight className="w-4 h-4" />
              <span className="text-sm">
                {config.parameters.slideDirection.label}
              </span>
            </div>
            <Select
              value={config.parameters.slideDirection.value}
              onValueChange={(value) =>
                updateConfig("parameters", "slideDirection", {
                  ...config.parameters.slideDirection,
                  value,
                })
              }
            >
              <SelectTrigger className="w-24 h-8 bg-zinc-900 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                {config.parameters.slideDirection.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Slides Per View */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span className="text-sm">
                {config.parameters.slidesPerView.label}
              </span>
            </div>
            <Select
              value={config.parameters.slidesPerView.value.toString()}
              onValueChange={(value) =>
                updateConfig("parameters", "slidesPerView", {
                  ...config.parameters.slidesPerView,
                  value,
                })
              }
            >
              <SelectTrigger className="w-24 h-8 bg-zinc-900 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                {config.parameters.slidesPerView.options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Space Between Slides */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4" />
              <span className="text-sm">
                {config.parameters.spaceBetweenSlides.label}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.parameters.spaceBetweenSlides.value]}
                onValueChange={([value]) =>
                  updateConfig("parameters", "spaceBetweenSlides", {
                    ...config.parameters.spaceBetweenSlides,
                    value,
                  })
                }
                max={config.parameters.spaceBetweenSlides.max}
                step={config.parameters.spaceBetweenSlides.step}
                className="flex-1"
              />
              <span className="text-sm text-zinc-400 min-w-[48px]">
                {config.parameters.spaceBetweenSlides.value}px
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-64 bg-slate-800 text-zinc-100 p-4 rounded-lg">
        <h2 className="text-xs font-medium text-zinc-400 mb-4">MODULES</h2>
        <div className="space-y-3">
          {Object.entries(config.modules).map(([key, module]) => {
            const Icon = module.icon;
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{module.label}</span>
                </div>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={() =>
                    updateConfig("modules", key, {
                      ...module,
                      enabled: !module.enabled,
                    })
                  }
                  className="data-[state=checked]:bg-blue-600"
                  aria-label={`Toggle ${module.label}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
