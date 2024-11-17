import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { type SliderConfig } from "../types/slider-config";

interface PreviewProps {
  config: SliderConfig;
}

function PreviewScreen({ config }: PreviewProps) {
  return (
    <div className="h-[400px] flex items-center justify-center p-8 overflow-hidden bg-neutral-900 rounded-lg">
      <div
        className="epyc-slider-attributes w-full h-full max-h-[400px] max-w-[640px] overflow-hidden relative bg-white rounded-lg shadow-lg"
        epyc-slider-element="list"
        epyc-autoplay={config.modules.autoplay.enabled}
        epyc-mousewheel={config.modules.mousewheelControl.enabled}
        epyc-keyboard={config.modules.keyboardControl.enabled}
        epyc-loop={config.modules.infiniteLoop.enabled}
        epyc-direction={config.parameters.slideDirection.value}
        epyc-slides-per-view={config.parameters.slidesPerView.value}
        style={
          {
            "--space-between": `${config.parameters.spaceBetweenSlides.value}px`,
          } as React.CSSProperties
        }
      >
        <div className="swiper flex items-center justify-center">
          <div className="swiper-wrapper">
            {[1, 2, 3, 4].map((slideNum) => (
              <div
                key={slideNum}
                className="swiper-slide bg-neutral-100 rounded-md p-8 text-center"
              >
                <span className="text-xl font-medium text-neutral-700">
                  Slide {slideNum}
                </span>
              </div>
            ))}
          </div>
          {/* 
          {config.modules.navigation.enabled && (
            <div className="swiper-navigation absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between pointer-events-none">
              <button className="swiper-prev bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="swiper-next bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )} */}

          {/* {config.modules.bulletPagination.enabled && (
            <div className="swiper-bullet-wrapper absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4].map((bullet) => (
                <div
                  key={bullet}
                  className={`swiper-bullet w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    bullet === 1 ? "bg-blue-600" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          )}

          {config.modules.fractionPagination.enabled && (
            <div className="swiper-fraction absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
              <span className="swiper-fraction-current font-medium">1</span>
              <span className="mx-1">/</span>
              <span className="swiper-fraction-total text-neutral-500">4</span>
            </div>
          )}

          {config.modules.progressPagination.enabled && (
            <div className="swiper-progress absolute bottom-0 left-0 w-full h-1 bg-neutral-200">
              <div className="swiper-progress-fill h-full bg-blue-600 w-1/4 transition-all duration-300" />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default PreviewScreen;
