import axiosInstance from "./axiosInstance";
import { SliderTypesConfig } from "src/types/sliderTypes";

export async function applyStyles(element: any, styles: any[]) {
  if (element && styles.length > 0) {
    await element.setStyles(styles);
  }
}

export async function setCustomAttribute(
  element: any,
  attribute: string,
  value: any
) {
  if (element && attribute && value) {
    await element.setCustomAttribute(attribute, value);
  }
}

export async function getOrCreateStyle(styleName: string) {
  let style = await webflow.getStyleByName(styleName);
  if (!style) {
    style = await webflow.createStyle(styleName);
  }
  return style;
}

export async function createButtonNavigation(parentDiv: any, styles: any) {
  const { wrapperStyle, prevStyle, nextStyle } = styles;
  const buttonNavigationDiv = await parentDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(buttonNavigationDiv, [wrapperStyle]);

  const prevNavigation = await buttonNavigationDiv.append(
    webflow.elementPresets.DOM
  );
  await applyStyles(prevNavigation, [prevStyle]);
  prevNavigation.setTextContent("Prev");

  const nextNavigation = await buttonNavigationDiv.append(
    webflow.elementPresets.DOM
  );

  await applyStyles(nextNavigation, [nextStyle]);
  nextNavigation.setTextContent("Next");
}

export async function createBulletPagination(parentDiv: any, styles: any) {
  const { wrapperStyle, bulletStyle, activeBulletStyle } = styles;

  const bulletPaginationDiv = await parentDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(bulletPaginationDiv, [wrapperStyle]);

  const paginationItem = await bulletPaginationDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(paginationItem, [bulletStyle]);

  const activePaginationItem = await bulletPaginationDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(activePaginationItem, [bulletStyle, activeBulletStyle]);
}

export async function createFractionPagination(parentDiv: any, styles: any) {
  const { wrapperStyle, currentFractionStyle, totalFractionStyle } = styles;

  const fractionPaginationDiv = await parentDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(fractionPaginationDiv, [wrapperStyle]);

  const currentFractionItem = await fractionPaginationDiv.append(
    webflow.elementPresets.TextBlock
  );
  await applyStyles(currentFractionItem, [currentFractionStyle]);

  const totalFractionItem = await fractionPaginationDiv.append(
    webflow.elementPresets.TextBlock
  );
  await applyStyles(totalFractionItem, [totalFractionStyle]);
}

export async function createProgressPagination(parentDiv: any, styles: any) {
  const { wrapperStyle, progressStyle } = styles;
  const progressPaginationDiv = await parentDiv.append(
    webflow.elementPresets.DivBlock
  );
  await applyStyles(progressPaginationDiv, [wrapperStyle]);

  const progressDiv = await progressPaginationDiv.append(
    webflow.elementPresets.DOM
  );
  progressDiv.setTag("span");
  await applyStyles(progressDiv, [progressStyle]);
}

export async function createSliderStructure(parentDiv: any) {
  const swiperStyle = await getOrCreateStyle("swiper");
  await swiperStyle.setProperties({
    height: "500px",
  });
  const swiperDiv = await parentDiv.append(webflow.elementPresets.DOM);
  await swiperDiv.setTag("div");
  await swiperDiv.setStyles([swiperStyle]);

  const wrapperStyle = await getOrCreateStyle("swiper-wrapper");
  const swiperWrapperDiv = await swiperDiv.append(webflow.elementPresets.DOM);
  await swiperWrapperDiv.setTag("div");
  await swiperWrapperDiv.setStyles([wrapperStyle]);

  const slideStyle = await getOrCreateStyle("swiper-slide");
  await slideStyle.setProperties({
    "background-color": "gray",
  });
  const deleteSlideStyle = await getOrCreateStyle("delete-slide");
  deleteSlideStyle.setProperties({
    display: "flex",
    "align-content": "center",
    "justify-content": "center",
    "background-color": "gray",
  });

  // Create sample slides
  for (let i = 1; i <= 6; i++) {
    const slide = await swiperWrapperDiv.append(
      webflow.elementPresets.DivBlock
    );
    await slide.setStyles([slideStyle]);
    const deleteSlide = await slide.append(webflow.elementPresets.DOM);
    await deleteSlide.setStyles([deleteSlideStyle]);
    await deleteSlide.setTextContent(`slide ${i}`);
  }

  return swiperDiv;
}

//  Main slider function

export const insertCustomConfigSliderComponent = async ({
  config,
}: {
  config: SliderTypesConfig;
}) => {
  try {
    const currentPageID = await webflow.getCurrentPage();
    console.log(currentPageID.id);
    const siteId = await webflow.getSiteInfo();
    console.log(siteId);
    const handleApply = async () => {
      try {
        console.log("Applying custom script to the page...");

        const response = await axiosInstance.put(
          `/custom-code/pages/${currentPageID.id}/upsertCustomCode`,
          {
            selectedScript: "headerlink",
            version: "0.0.1",
            siteId: siteId.siteId,
          }
        );

        console.log("Script applied successfully:", response.data);
      } catch (error) {
        if (error.response) {
          console.error("API Error:", {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    handleApply();

    const el = await webflow.getSelectedElement();
    if (!el?.children) {
      webflow.notify({
        type: "Error",
        message:
          "Please select a element whaich has children property accesible",
      });
      return;
    }

    // Create main slider container
    const parentStyle = await getOrCreateStyle("epyc-slider-attributes");
    parentStyle.setProperties({
      position: "relative",
    });
    const sliderAttributesDiv = await el.append(
      webflow.elementPresets.DivBlock
    );
    await applyStyles(sliderAttributesDiv, [parentStyle]);
    await setCustomAttribute(
      sliderAttributesDiv,
      "epyc-slider-element",
      "list"
    );
    const styles = {
      buttonNavigation: {
        wrapperStyle: await getOrCreateStyle("swiper-navigation"),
        prevStyle: await getOrCreateStyle("swiper-prev"),
        nextStyle: await getOrCreateStyle("swiper-next"),
      },
      bulletPagination: {
        wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
        bulletStyle: await getOrCreateStyle("swiper-bullet"),
        activeBulletStyle: await getOrCreateStyle("swiper-bullet-active"),
      },
      fractionPagination: {
        wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
        currentFractionStyle: await getOrCreateStyle("swiper-fraction-current"),
        totalFractionStyle: await getOrCreateStyle("swiper-fraction-total"),
      },
      verticalScrolling: {
        height: await getOrCreateStyle("vertical-direction-height"),
      },
      progressPagination: {
        wrapperStyle: await getOrCreateStyle("swiper-bullet-wrapper"),
        progressStyle: await getOrCreateStyle("swiper-progress-fill"),
      },
    };

    // Create navigation and pagination elements based on enabled modules
    if (config.modules.navigation.value) {
      await createButtonNavigation(
        sliderAttributesDiv,
        styles.buttonNavigation
      );
      await styles.buttonNavigation.wrapperStyle.setProperties({
        position: "absolute",
        "z-index": "10",
        bottom: "0",
        display: "flex",
        "justify-content": "space-between",
        width: "100%",
        "padding-left": "10px",
        "padding-right": "10px",
        "padding-bottom": "10px",
      });
      await styles.buttonNavigation.prevStyle.setProperties({
        "background-color": "white",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "padding-right": "4px",
        "padding-left": "4px",
        "padding-top": "4px",
        "padding-bottom": "4px",
        "border-end-end-radius": "4px",
        "border-start-start-radius": "4px",
        "font-size": "14px",
        "font-weight": "600",
      });

      await styles.buttonNavigation.nextStyle.setProperties({
        "background-color": "white",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "padding-right": "4px",
        "padding-left": "4px",
        "padding-top": "4px",
        "padding-bottom": "4px",
        "border-end-end-radius": "4px",
        "border-start-start-radius": "4px",
        "font-size": "14px",
        "font-weight": "600",
      });
    }
    if (config.modules.pagination.value !== "none") {
      if (config.modules.pagination.value === "bullet") {
        await createBulletPagination(
          sliderAttributesDiv,
          styles.bulletPagination
        );
        await styles.bulletPagination.wrapperStyle.setProperties({
          position: "absolute",
          "z-index": "10",
          width: "100%",
          display: "flex",
          bottom: "0",
          "justify-content": "center",
        });
        await styles.bulletPagination.bulletStyle.setProperties({
          "margin-right": "5px",
          height: "10px",
          width: "10px",
          "background-color": "white",
        });
        await styles.bulletPagination.activeBulletStyle.setProperties({
          "background-color": "blue",
        });
      }
      if (config.modules.pagination.value === "fraction") {
        await setCustomAttribute(
          sliderAttributesDiv,
          "epyc-pagination-type",
          "fraction"
        );
        await createFractionPagination(
          sliderAttributesDiv,
          styles.fractionPagination
        );
      }
      if (config.modules.pagination.value === "progressbar") {
        await setCustomAttribute(
          sliderAttributesDiv,
          "epyc-pagination-type",
          "progressbar"
        );
        await createProgressPagination(
          sliderAttributesDiv,
          styles.progressPagination
        );
        await styles.progressPagination.progressStyle.setProperties({
          "background-color": "blue",
        });
      }
    }
    // Set custom attributes for all enabled features
    const attributes = [
      { key: "epyc-autoplay", value: config.modules.autoplay.value },
      {
        key: "epyc-mousewheel",
        value: config.modules.mousewheelControl.value,
      },
      { key: "epyc-keyboard", value: config.modules.keyboardControl.value },
      {
        key: "epyc-direction",
        value: config.parameters.slideDirection.value,
      },
      {
        key: "epyc-slides-per-view",
        value: config.parameters.slidesPerView.value,
      },
      {
        key: "epyc-space-between",
        value: config.parameters.spaceBetweenSlides.value,
      },
      {
        key: "epyc-slides-per-group",
        value: config.parameters.slidesPerGroup.value,
      },
      {
        key: "epyc-free-mode",
        value: config.modules.freeMode.value,
      },
      {
        key: "epyc-loop",
        value: config.parameters.loopMode.value,
      },
      {
        key: "epyc-auto-height",
        value: config.parameters.autoHeight.value,
      },
      {
        key: "epyc-effect",
        value: config.effects.effect.value,
      },
      {
        key: "epyc-grab-cursor",
        value: config.modules.grabCusor.value,
      },
      {
        key: "epyc-effect",
        value: config.effects.effect.value,
      },
    ];

    for (const { key, value } of attributes) {
      await setCustomAttribute(sliderAttributesDiv, key, value.toString());
    }

    // Create the basic slider structure
    await createSliderStructure(sliderAttributesDiv);

    console.log("Slider component inserted successfully");
  } catch (error) {
    console.error("Failed to insert slider component:", error);
  }
};
