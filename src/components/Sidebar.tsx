import {
  ArrowLeft,
  ArrowLeftRight,
  Box,
  FlipHorizontal,
  Layers,
} from "lucide-react";
import React from "react";
import { SliderConfig } from "../types/slider-config";
import { insertCustomConfigSliderComponent } from "../lib/slider-utils";

type Props = {
  config: SliderConfig;
  resetconfig: Function;
  updateConfig: (
    type: "parameters" | "modules",
    key: string,
    value: any
  ) => void;
};

function Sidebar({ config, resetconfig, updateConfig }: Props) {
  return (
    <div className="bg-[#232323] border-r border-neutral-800 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-neutral-400 mb-4">
            PARAMETERS
          </h2>

          <div className="space-y-6">
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
            <div className="flex w-full flex-col justify-between">
              <div className="flex items-center gap-3 ">
                <FlipHorizontal className="w-4 h-4 text-white" />
                <span className="text-sm text-neutral-200">
                  {config.parameters.paginationType.label}
                </span>
              </div>
              <select
                value={config.parameters.paginationType.value}
                onChange={(e) =>
                  updateConfig("parameters", "paginationType", {
                    ...config.parameters.paginationType,
                    value: e.target.value,
                  })
                }
                className="mt-2 h-8 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
              >
                {config.parameters.paginationType.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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
      <div className="border-t border-neutral-800 p-4 flex items-center justify-between bg-[#232323]">
        <button
          type="button"
          onClick={() => {
            resetconfig();
          }}
          className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          back
        </button>
        <button
          type="button"
          onClick={() => insertCustomConfigSliderComponent({ config: config })}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
