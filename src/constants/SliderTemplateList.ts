import {
  Code2,
  Keyboard,
  MoreHorizontal,
  Timer,
  Mouse,
  RefreshCcw,
} from "lucide-react";
import { SliderConfig } from "src/types/slider-config";

export const sliderTempelateList: SliderConfig[] = [
  {
    name: "Basic Horizontal Auto",
    parameters: {
      slideDirection: {
        value: "horizontal",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: "auto",
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 0,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: false, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: false,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: false,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: {
        enabled: false,
        label: "Infinite loop",
        icon: RefreshCcw,
      },
    },
  },
  {
    name: "Vertical Loop Slider",
    parameters: {
      slideDirection: {
        value: "vertical",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: 1,
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 10,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: false, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: false,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: false,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: { enabled: true, label: "Infinite loop", icon: RefreshCcw },
    },
  },
  {
    name: "3 Slides Per View",
    parameters: {
      slideDirection: {
        value: "horizontal",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: 3,
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 15,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: true, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: true,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: true,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: {
        enabled: false,
        label: "Infinite loop",
        icon: RefreshCcw,
      },
    },
  },
  {
    name: "Autoplay Vertical Slider",
    parameters: {
      slideDirection: {
        value: "vertical",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: 1,
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 0,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: false, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: true,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: false,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: { enabled: true, label: "Infinite loop", icon: RefreshCcw },
    },
  },
  {
    name: "Infinite Horizontal Loop",
    parameters: {
      slideDirection: {
        value: "horizontal",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: 3,
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 30,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: true, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: false,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: false,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: { enabled: true, label: "Infinite loop", icon: RefreshCcw },
    },
  },
  {
    name: "Minimalist Autoplay Slider",
    parameters: {
      slideDirection: {
        value: "horizontal",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: "auto",
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 10,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: false, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: false,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: false,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: {
        enabled: false,
        label: "Infinite loop",
        icon: RefreshCcw,
      },
    },
  },
  {
    name: "Two Slides Loop",
    parameters: {
      slideDirection: {
        value: "horizontal",
        label: "Slide direction",
        icon: Code2,
        options: ["horizontal", "vertical"],
      },
      slidesPerView: {
        value: 2,
        label: "Slides per view",
        icon: Code2,
        options: ["auto", 1, 2, 3, 4, 5],
      },
      spaceBetweenSlides: {
        value: 5,
        label: "Space between slides",
        icon: Code2,
        min: 0,
        max: 100,
        step: 1,
      },
    },
    modules: {
      navigation: { enabled: true, label: "Navigation", icon: Code2 },
      bulletPagination: {
        enabled: false,
        label: "Bullet Pagination",
        icon: MoreHorizontal,
      },
      fractionPagination: {
        enabled: false,
        label: "Fraction Pagination",
        icon: MoreHorizontal,
      },
      progressPagination: {
        enabled: false,
        label: "Progress Pagination",
        icon: MoreHorizontal,
      },
      autoplay: { enabled: true, label: "Autoplay", icon: Timer },
      keyboardControl: {
        enabled: true,
        label: "Keyboard control",
        icon: Keyboard,
      },
      mousewheelControl: {
        enabled: false,
        label: "Mousewheel control",
        icon: Mouse,
      },
      infiniteLoop: { enabled: true, label: "Infinite loop", icon: RefreshCcw },
    },
  },
];
