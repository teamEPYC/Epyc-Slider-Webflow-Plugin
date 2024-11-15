import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { type SliderConfig } from "../types/slider-config";

interface PreviewProps {
  config: SliderConfig;
}

function PreviewScreen({ config }: PreviewProps) {
  return (
    <div className="h-full flex items-center justify-center p-8 overflow-hidden">
      <div
        className="epyc-slider-attributes w-full overflow-hidden max-w-3xl relative bg-white rounded-lg shadow-lg"
        data-slider-element="list"
        data-autoplay={config.modules.autoplay.enabled}
        data-mousewheel={config.modules.mousewheelControl.enabled}
        data-keyboard={config.modules.keyboardControl.enabled}
        data-loop={config.modules.infiniteLoop.enabled}
        data-direction={config.parameters.slideDirection.value}
        data-slides-per-view={config.parameters.slidesPerView.value}
        style={
          {
            "--space-between": `${config.parameters.spaceBetweenSlides.value}px`,
          } as React.CSSProperties
        }
      >
        <div className="swiper overflow-hidden">
          <div
            className="swiper-wrapper flex transition-transform duration-300"
            style={{
              flexDirection:
                config.parameters.slideDirection.value === "vertical"
                  ? "column"
                  : "row",
              gap: `${config.parameters.spaceBetweenSlides.value}px`,
            }}
          >
            {[1, 2, 3, 4].map((slideNum) => (
              <div
                key={slideNum}
                className="swiper-slide flex-shrink-0 bg-gray-200 rounded-md p-8 text-center"
                style={{
                  width:
                    config.parameters.slidesPerView.value === "auto"
                      ? "auto"
                      : `calc((100% - ${
                          config.parameters.spaceBetweenSlides.value *
                          (Number(config.parameters.slidesPerView.value) - 1)
                        }px) / ${config.parameters.slidesPerView.value})`,
                  height:
                    config.parameters.slideDirection.value === "vertical"
                      ? "200px"
                      : "auto",
                }}
              >
                <span className="text-xl font-medium text-gray-700">
                  Slide {slideNum}
                </span>
              </div>
            ))}
          </div>

          {config.modules.navigation.enabled && (
            <div className="swiper-navigation absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between pointer-events-none">
              <button className="swiper-prev bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 pointer-events-auto">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="swiper-next bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 pointer-events-auto">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {config.modules.bulletPagination.enabled && (
            <div className="swiper-bullet-wrapper absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4].map((bullet) => (
                <div
                  key={bullet}
                  className={`swiper-bullet w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    bullet === 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {config.modules.fractionPagination.enabled && (
            <div className="swiper-fraction absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
              <span className="swiper-fraction-current font-medium">1</span>
              <span className="mx-1">/</span>
              <span className="swiper-fraction-total text-gray-500">4</span>
            </div>
          )}

          {config.modules.progressPagination.enabled && (
            <div className="swiper-progress absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <div className="swiper-progress-fill h-full bg-blue-600 w-1/4 transition-all duration-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewScreen;
