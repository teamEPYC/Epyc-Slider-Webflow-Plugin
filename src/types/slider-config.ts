import {
  Code2,
  Timer,
  Keyboard,
  Mouse,
  RefreshCcw,
  MoreHorizontal,
} from "lucide-react";

export type SliderConfig = {
  name: string;
  parameters: {
    slideDirection: {
      value: "horizontal" | "vertical";
      label: string;
      icon: typeof Code2;
      options: Array<"horizontal" | "vertical">;
    };
    slidesPerView: {
      value: number | "auto";
      label: string;
      icon: typeof Code2;
      options: Array<string | number>;
    };
    paginationType: {
      value: "None" | "Bullet" | "Progressbar" | "Fraction";
      label: string;
      icon: typeof MoreHorizontal;
      options: Array<"None" | "Bullet" | "Progressbar" | "Fraction">;
    };
    spaceBetweenSlides: {
      value: number;
      label: string;
      icon: typeof Code2;
      min: number;
      max: number;
      step: number;
    };
  };
  modules: {
    [key: string]: {
      enabled: boolean;
      label: string;
      icon: typeof Code2;
    };
  };
};

export const defaultSliderConfig: SliderConfig = {
  name: "",
  parameters: {
    slideDirection: {
      value: "horizontal",
      label: "Slide direction",
      icon: Code2,
      options: ["horizontal", "vertical"],
    },
    paginationType: {
      value: "None",
      icon: MoreHorizontal,
      label: " Pagination Type",
      options: ["None", "Bullet", "Progressbar", "Fraction"],
    },

    slidesPerView: {
      value: "auto",
      label: "Slides per view",
      icon: Code2,
      options: ["auto", "1", "2", "3", "4", "5"],
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
    navigation: {
      enabled: false,
      label: "Navigation",
      icon: Code2,
    },
    autoplay: {
      enabled: true,
      label: "Autoplay",
      icon: Timer,
    },
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
};
