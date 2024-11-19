import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
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
  const swiperKey = `swiper-${config.parameters.paginationType.value}-${config.modules.autoplay.enabled}`;

  const getPaginationConfig = () => {
    switch (config.parameters.paginationType.value) {
      case "Bullet":
        const abc = config.parameters.slideDirection.value;
        return {
          clickable: true,
          el: ".swiper-pagination",
        };
      case "Fraction":
        return {
          type: "fraction" as const,
          el: ".swiper-fraction",
        };
      case "Progressbar":
        return {
          type: "progressbar" as const,
          el: ".swiper-progress-pagination",
        };
      default:
        return false;
    }
  };

  console.log(config);
  return (
    <div className="h-[400px]  flex items-center justify-center p-8 overflow-hidden rounded-lg">
      <div className="epyc-slider-attributes relative h-full w-[420px] overflow-hidden bg-white rounded-lg shadow-lg">
        <Swiper
          key={swiperKey}
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            Autoplay,
            Keyboard,
            Mousewheel,
          ]}
          {...(config.modules.autoplay.enabled
            ? {
                autoplay: {
                  delay: 2500,
                },
              }
            : {})}
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
          pagination={getPaginationConfig()}
          onSlideChange={(swiper) =>
            console.log(`Current Slide: ${swiper.activeIndex + 1}`)
          }
          className="h-full "
        >
          <div className="flex h-full w-full items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((slideNum) => (
              <SwiperSlide
                className="h-[400px] w-full bg-gray-200 flex items-center justify-center"
                key={slideNum}
              >
                <span className="font-bold text-xs">Slide {slideNum}</span>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        {/* Navigation */}
        {config.modules.navigation.enabled && (
          <div className="absolute bottom-0 flex justify-between z-10 w-full px-4 py-2">
            <button className="swiper-prev bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-next bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        {/* pagination */}

        {config.parameters.paginationType.value === "Bullet" && (
          <div className="swiper-pagination absolute  w-full px-4 mt-4 pointer-events-auto"></div>
        )}

        {config.parameters.paginationType.value === "Fraction" && (
          <span className="swiper-fraction z-10 flex justify-center mx-auto font-semibold text-xs absolute text-black px-3 py-1"></span>
        )}

        {config.parameters.paginationType.value === "Progressbar" && (
          <div className="swiper-progress-pagination absolute w-full bottom-0 z-10"></div>
        )}
      </div>
    </div>
  );
}

export default PreviewScreen;
