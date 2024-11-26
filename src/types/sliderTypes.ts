import {
  ArrowRight,
  MousePointer,
  Sliders,
  Clock,
  Settings,
  LockIcon,
  SpaceIcon,
  BookOpenIcon,
  SlidersHorizontal,
  Download,
  Layers,
  Mouse,
  Navigation,
  ListFilter,
  ScrollText,
  Shuffle,
  Keyboard,
  Play,
  PlayIcon,
} from "lucide-react";

import React, { type ElementType } from "react";

export type SlideDirection = "horizontal" | "vertical";
export type LoopMode = boolean;
export type EffectType = "slide" | "fade" | "cube" | "coverflow" | "flip";
export type PaginationType = "progressbar" | "bullet" | "fraction" | "none";

export interface SliderConfigOption<T> {
  value: T;
  label: string;
  icon?: ElementType;
  options?: readonly T[];
}

export interface ModuleConfig {
  navigation: SliderConfigOption<boolean>;
  pagination: SliderConfigOption<PaginationType>;
  scrollbar: SliderConfigOption<boolean>;
  freeMode: SliderConfigOption<boolean>;
  keyboardControl: SliderConfigOption<boolean>;
  mousewheelControl: SliderConfigOption<boolean>;
  parallax: SliderConfigOption<boolean>;
  lazyLoading: SliderConfigOption<boolean>;
  autoplay: SliderConfigOption<boolean>;
}

export interface ParametersConfig {
  slideDirection: SliderConfigOption<SlideDirection>;
  slidesPerView: SliderConfigOption<number>;
  slidesPerGroup: SliderConfigOption<number>;
  slidesRows: SliderConfigOption<number>;
  centeredSlides: SliderConfigOption<boolean>;
  spaceBetweenSlides: SliderConfigOption<number>;
  initialSlide: SliderConfigOption<number>;
  autoHeight: SliderConfigOption<boolean>;
  grabCursor: SliderConfigOption<boolean>;
  slideToClickedSlide: SliderConfigOption<boolean>;
  loopMode: SliderConfigOption<LoopMode>;
}

export interface EffectsConfig {
  effect: SliderConfigOption<EffectType>;
  transitionDuration: SliderConfigOption<number>;
}

export interface SliderTypesConfig {
  parameters: ParametersConfig;
  effects: EffectsConfig;
  modules: ModuleConfig;
}

export const SLIDES_PER_VIEW_OPTIONS = [1, 2, 3, 4, 5];
export const PAGINATION_OPTIONS: PaginationType[] = [
  "progressbar",
  "bullet",
  "fraction",
  "none",
];
export const DIRECTION_OPTIONS: SlideDirection[] = ["horizontal", "vertical"];
export const EFFECT_OPTIONS: EffectType[] = [
  "slide",
  "fade",
  "cube",
  "coverflow",
  "flip",
];

export const initialSliderConfig: SliderTypesConfig = {
  parameters: {
    slideDirection: {
      value: "horizontal",
      label: "Slide Direction",
      options: DIRECTION_OPTIONS,
      icon: ArrowRight,
    },
    slidesPerView: {
      value: 1,
      label: "Slides Per View",
      icon: Sliders,
      options: SLIDES_PER_VIEW_OPTIONS,
    },
    slidesPerGroup: { value: 1, label: "Slides Per Group", icon: Sliders },
    slidesRows: { value: 1, label: "Slides Rows", icon: Sliders },
    centeredSlides: {
      value: false,
      label: "Centered Slides",
      icon: MousePointer,
    },
    spaceBetweenSlides: {
      value: 0,
      label: "Space Between Slides",
      icon: SpaceIcon,
    },
    initialSlide: { value: 0, label: "Initial Slide", icon: BookOpenIcon },
    autoHeight: { value: false, label: "Auto Height", icon: MousePointer },
    grabCursor: { value: false, label: "Grab Cursor", icon: MousePointer },
    slideToClickedSlide: {
      value: false,
      label: "Slide to Clicked Slide",
      icon: SlidersHorizontal,
    },
    loopMode: { value: false, label: "Loop Mode", icon: LockIcon },
  },
  effects: {
    effect: {
      value: "slide",
      label: "Effect",
      icon: Settings,
      options: EFFECT_OPTIONS,
    },
    transitionDuration: { value: 300, label: "Transition Duration" },
  },
  modules: {
    navigation: {
      value: false,
      label: "Navigation",
      icon: Navigation,
    },
    pagination: {
      value: "none",
      label: "Pagination Type",
      icon: ListFilter,
      options: PAGINATION_OPTIONS,
    },
    scrollbar: {
      value: false,
      label: "Scrollbar",
      icon: ScrollText,
    },
    freeMode: {
      value: false,
      label: "Free Mode",
      icon: Shuffle,
    },
    keyboardControl: {
      value: false,
      label: "Keyboard Control",
      icon: Keyboard,
    },
    mousewheelControl: {
      value: false,
      label: "Mousewheel Control",
      icon: Mouse,
    },
    parallax: {
      value: false,
      label: "Parallax",
      icon: Layers,
    },
    lazyLoading: {
      value: false,
      label: "Lazy Loading",
      icon: Download,
    },
    autoplay: {
      value: false,
      label: "Autoplay",
      icon: PlayIcon,
    },
  },
};
