import {
  Code2,
  Keyboard,
  MoreHorizontal,
  Timer,
  Mouse,
  RefreshCcw,
} from "lucide-react";
import { SliderConfig } from "src/types/slider-config";
const defaults = {
  booleanFalse: (label = "Setting", icon = Code2) => {
    return {
      enabled: false,
      label,
      icon,
    };
  },
  transitionSpeed: {
    value: 300, // ms
    lable: "",
    icon: undefined,
    min: 200,
    max: 400,
    step: 0,
  },
  slidesPerGroup: {
    value: 1,
    label: "",
    icon: undefined,
    options: [],
  },
};
const defaultModules = {
  navigation: defaults.booleanFalse("Navigation", Code2),
  autoplay: defaults.booleanFalse("Autoplay", Timer),
  keyboardControl: defaults.booleanFalse("Keyboard control", Keyboard),
  mousewheelControl: defaults.booleanFalse("Mousewheel control", Mouse),
  infiniteLoop: defaults.booleanFalse("Infinite loop", RefreshCcw),
};

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
      paginationType: {
        value: "None",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        ...defaults.transitionSpeed,
      },
      slidesPerGroup: {
        ...defaults.slidesPerGroup,
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "Bullet",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "None",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "Progressbar",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "Fraction",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "None",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
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
      paginationType: {
        value: "Bullet",
        label: "Pagination Type",
        icon: MoreHorizontal,
        options: ["None", "Bullet", "Progressbar", "Fraction"],
      },
      transitionSpeed: {
        value: 0,
        lable: "",
        icon: undefined,
        min: 0,
        max: 0,
        step: 0,
      },
      slidesPerGroup: {
        value: 0,
        label: "",
        icon: undefined,
        options: [],
      },
    },
    modules: defaultModules,
  },
];
