import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { type SliderConfig } from "../types/slider-config";

interface PreviewProps {
  config: SliderConfig;
}

function PreviewScreen({ config }: PreviewProps) {
  return (
    <div className="h-[400px] flex items-center justify-center p-8 overflow-hidden rounded-lg">
      <div className="epyc-slider-attributes w-full h-full max-h-[400px] max-w-[640px] overflow-hidden relative bg-white rounded-lg shadow-lg">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            Autoplay,
            Keyboard,
            Mousewheel,
          ]}
          autoplay={
            config.modules.autoplay.enabled
              ? { delay: 3000, disableOnInteraction: false }
              : false
          }
          loop={config.modules.infiniteLoop.enabled}
          direction={config.parameters.slideDirection.value}
          slidesPerView={config.parameters.slidesPerView.value}
          spaceBetween={config.parameters.spaceBetweenSlides.value}
          keyboard={{ enabled: config.modules.keyboardControl.enabled }}
          mousewheel={{ enabled: config.modules.mousewheelControl.enabled }}
          navigation={
            config.modules.navigation.enabled
              ? {
                  nextEl: ".swiper-next",
                  prevEl: ".swiper-prev",
                }
              : false
          }
          pagination={
            config.modules.bulletPagination.enabled
              ? { clickable: true, el: ".swiper-bullet-wrapper" }
              : config.modules.fractionPagination.enabled
              ? {
                  type: "fraction",
                  el: ".swiper-fraction",
                  renderFraction: (currentClass, totalClass) =>
                    `<span class="${currentClass} font-medium"></span> / <span class="${totalClass} text-neutral-500"></span>`,
                }
              : config.modules.progressPagination.enabled
              ? {
                  type: "progressbar",
                  el: ".swiper-progress",
                }
              : false
          }
          onSlideChange={(swiper) =>
            console.log(`Current Slide: ${swiper.activeIndex + 1}`)
          }
        >
          {[1, 2, 3, 4].map((slideNum) => (
            <SwiperSlide key={slideNum}>
              <div className="bg-neutral-100 rounded-md p-8 text-center">
                <span className="text-xl font-medium text-neutral-700">
                  Slide {slideNum}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        {config.modules.navigation.enabled && (
          <div className="swiper-navigation top-1/2 translate-y-1/2 w-full px-4 flex justify-between pointer-events-none">
            <button className="swiper-prev bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-next bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Bullet Pagination */}
        {config.modules.bulletPagination.enabled && (
          <div className="swiper-bullet-wrapper absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"></div>
        )}

        {/* Fraction Pagination */}
        {config.modules.fractionPagination.enabled && (
          <div className="swiper-fraction absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md"></div>
        )}

        {/* Progress Pagination */}
        {config.modules.progressPagination.enabled && (
          <div className="swiper-progress absolute bottom-0 left-0 w-full h-1 bg-neutral-200"></div>
        )}
      </div>
    </div>
  );
}

export default PreviewScreen;
