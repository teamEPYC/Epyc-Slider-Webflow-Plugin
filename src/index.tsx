import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { sliderTempelateList } from "./constants/SliderTemplateList";
import Sidebar from "./components/Sidebar";
import { ChevronRightIcon } from "lucide-react";
import { defaultSliderConfig, SliderConfig } from "./types/slider-config";
import PreviewScreen from "./components/PreviewScreen";

export const insertSliderComponent = async ({
  buttonNavigation,
  bulletPaginations,
}: {
  buttonNavigation: boolean;
  bulletPaginations: boolean;
}) => {
  try {
    const el = await webflow.getSelectedElement();
    if (!el.children) {
      console.error("No element selected");
      return;
    }

    const parentStyle = await getOrCreateStyle("epyc-slider-attributes");

    const sliderAttributesDiv = await el.append(
      webflow.elementPresets.DivBlock
    );

    await sliderAttributesDiv.setStyles([parentStyle]);
    if (sliderAttributesDiv?.customAttributes) {
      await sliderAttributesDiv.setCustomAttribute(
        "epyc-slider-element",
        "list"
      );
    }
    // slider customization

    // button navigation
    const navigationwrapperStyle = await getOrCreateStyle("swiper-navigation");
    const prevButtonStyle = await getOrCreateStyle("swiper-prev");
    const nextButtonStyle = await getOrCreateStyle("swiper-next");

    if (buttonNavigation) {
      const buttonNavigationDiv = await sliderAttributesDiv.append(
        webflow.elementPresets.DivBlock
      );
      const prevNavigation = await buttonNavigationDiv.append(
        webflow.elementPresets.DivBlock
      );
      const prevNavigationText = prevNavigation.append(
        webflow.elementPresets.Paragraph
      );
      const nextNavigation = await buttonNavigationDiv.append(
        webflow.elementPresets.DivBlock
      );
      const nextNavigationText = nextNavigation.append(
        webflow.elementPresets.Paragraph
      );
      buttonNavigationDiv.setStyles([navigationwrapperStyle]);
      prevNavigation.setStyles([prevButtonStyle]);
      (await prevNavigationText).setTextContent("prev");
      nextNavigation.setStyles([nextButtonStyle]);
      (await nextNavigationText).setTextContent("next");
    }

    // bullet pagination
    const bulletPaginationStyle = await getOrCreateStyle(
      "swiper-bullet-wrapper"
    );
    bulletPaginationStyle.setProperties({
      display: "flex",
      "flex-direction": "row",
    });
    const swiperBulletStyle = await getOrCreateStyle("swiper-bullet");
    const swiperBulletActiveStyle = await getOrCreateStyle(
      "swiper-bullet-active"
    );
    swiperBulletStyle.setProperties({
      height: "16px",
      width: "16px",
      "background-color": "gray",
    });
    swiperBulletActiveStyle.setProperties({
      "background-color": "green",
    });

    if (bulletPaginations) {
      const bulletPaginationDiv = await sliderAttributesDiv.append(
        webflow.elementPresets.DivBlock
      );
      bulletPaginationDiv.setStyles([bulletPaginationStyle]);

      const paginationItem = await bulletPaginationDiv.append(
        webflow.elementPresets.DivBlock
      );
      paginationItem.setStyles([swiperBulletStyle]);
      const activePaginationItem = await bulletPaginationDiv.append(
        webflow.elementPresets.DivBlock
      );
      activePaginationItem.setStyles([
        swiperBulletActiveStyle,
        swiperBulletStyle,
      ]);
    }

    // pafination fraction

    const swiperStyle = await getOrCreateStyle("swiper");

    const swiperDiv = await sliderAttributesDiv.append(
      webflow.elementPresets.DOM
    );
    await swiperDiv.setTag("div");
    await swiperDiv.setStyles([swiperStyle]);

    const wrapperStyle = await getOrCreateStyle("swiper-wrapper");

    const swiperWrapperDiv = await swiperDiv.append(webflow.elementPresets.DOM);
    await swiperWrapperDiv.setTag("div");
    await swiperWrapperDiv.setStyles([wrapperStyle]);

    const slideStyle = await getOrCreateStyle("swiper-slide");

    const slide1 = await swiperWrapperDiv.append(webflow.elementPresets.DOM);
    await slide1.setTag("div");
    await slide1.setStyles([slideStyle]);
    await slide1.setTextContent("slide 1");

    const slide2 = await swiperWrapperDiv.append(webflow.elementPresets.DOM);
    await slide2.setTag("div");
    await slide2.setStyles([slideStyle]);
    await slide2.setTextContent("slide 2");

    const slide3 = await swiperWrapperDiv.append(webflow.elementPresets.DOM);
    await slide3.setTag("div");
    await slide3.setStyles([slideStyle]);
    await slide3.setTextContent("slide 3");

    console.log("Slider component inserted successfully");
  } catch (error) {
    console.error("Failed to insert slider component:", error);
  }
};
export const getOrCreateStyle = async (styleName: string) => {
  let style = await webflow.getStyleByName(styleName);
  if (!style) {
    style = await webflow.createStyle(styleName);
  }
  return style;
};
const App: React.FC = () => {
  const [isCustomizeModeOn, setIsCustomizeModeOn] = useState<boolean>(false);
  const [config, setConfig] = useState<SliderConfig>(defaultSliderConfig);

  const updateConfig = (
    type: "parameters" | "modules",
    key: string,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  if (isCustomizeModeOn) {
    return (
      <div>
        <div className="flex mt-4">
          <div className="w-[450px] h-screen overflow-y-scroll">
            <Sidebar
              setIsCustomizeModeOn={setIsCustomizeModeOn}
              config={config}
              updateConfig={updateConfig}
            />
          </div>
          <div className="w-full py-10">
            <PreviewScreen config={config} />
          </div>
        </div>
      </div>
    );
  }
  const handleCustomize = (item: SliderConfig) => {
    setConfig(item);
    setIsCustomizeModeOn(true);
  };
  return (
    <div className="w-full bg-zinc-900 antialiased">
      <div className="w-full p-4">
        <h1 className="text-zinc-200 font-bold text-lg">Epyc Slider Builder</h1>
        <div className="flex flex-col items-center justify-center w-full mt-6">
          <h2 className="text-4xl text-zinc-300 font-semibold">
            Create amazing slider with no code
          </h2>
          <h3 className="text-base text-zinc-300 mt-2">
            Customize your slider or choose from our presets to get started
            quickly
          </h3>
        </div>
        <div className="flex w-full items-center justify-center mt-4">
          <button
            onClick={() => setIsCustomizeModeOn(true)}
            className="bg-white text-black px-2 py-1 text-xs font-bold flex items-center rounded cursor-pointer"
          >
            <span>Customize</span>
            <span>
              <ChevronRightIcon className="text-black size-4" />
            </span>
          </button>
        </div>

        <form className="w-full flex flex-col space-y-4 text-white mt-4">
          {sliderTempelateList.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between items-center pt-2">
                <p className="text-lg font-semibold text-zinc-400">
                  {item.name}
                </p>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleCustomize(item);
                    }}
                    className="text-xs bg-zinc-300 border border-zinc-900 text-zinc-900 w-20 hover:bg-zinc-900 hover:text-zinc-300 hover:border hover:border-zinc-300 px-2 duration-100 py-2 rounded font-semibold"
                  >
                    Customize
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-xs bg-zinc-300 border border-zinc-900 text-zinc-900 w-20 hover:bg-zinc-900 hover:text-zinc-300 hover:border hover:border-zinc-300 px-2 duration-100 py-2 rounded font-semibold"
                  >
                    Insert
                  </button>
                </div>
              </div>
              <div className="w-full h-56 bg-black pt-4 rounded-xl mt-4 flex">
                <PreviewScreen config={item} />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

const initializeExtension = async (): Promise<void> => {
  try {
    await webflow.setExtensionSize("large");
  } catch (error) {
    console.error("Failed to initialize extension:", error);
  }
};

await initializeExtension();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
