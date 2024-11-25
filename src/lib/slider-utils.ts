import { SliderConfig } from "src/types/slider-config";
import { WebflowClient } from "webflow-api";
import axiosInstance from "./axiosInstance";

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
    webflow.elementPresets.Button
  );
  await applyStyles(prevNavigation, [prevStyle]);
  prevNavigation.setTextContent("Prev");

  const nextNavigation = await buttonNavigationDiv.append(
    webflow.elementPresets.Button
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
    webflow.elementPresets.DivBlock
  );
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
  slideStyle.setProperties({
    "background-color": "gray",
  });
  const deletSlide = await getOrCreateStyle("delete-slide");
  deletSlide.setProperties({});

  // Create sample slides
  for (let i = 1; i <= 6; i++) {
    const slide = await swiperWrapperDiv.append(webflow.elementPresets.DOM);
    await slide.setTag("div");
    await slide.setStyles([slideStyle]);
    const deleteSlide = await swiperWrapperDiv.append(
      webflow.elementPresets.DivBlock
    );
  }

  return swiperDiv;
}

//  Main slider function

export const insertCustomConfigSliderComponent = async ({
  config,
}: {
  config: SliderConfig;
}) => {
  try {
    const currentPageID = await webflow.getCurrentPage();
    console.log({ page: currentPageID });
    const handleApply = async () => {
      try {
        const response = await axiosInstance.put(
          `/custom-code/pages/${currentPageID.id}/upsertCustomCode`,
          {
            selectedScript: "headlink",
            version: "0.0.1",
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error applying script:", error);
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
    if (config.modules.navigation.enabled) {
      await createButtonNavigation(
        sliderAttributesDiv,
        styles.buttonNavigation
      );
    }

    if (config.parameters.paginationType.value === "Bullet") {
      styles.bulletPagination.bulletStyle.setProperties({
        height: "16px",
        width: "16px",
        "background-color": "gray",
      });
      styles.bulletPagination.activeBulletStyle.setProperties({
        "background-color": "green",
      });
    }

    if (config.parameters.paginationType.value !== "None") {
      if (config.parameters.paginationType.value === "Fraction") {
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
      if (config.parameters.paginationType.value === "Progressbar") {
        await setCustomAttribute(
          sliderAttributesDiv,
          "epyc-pagination-type",
          "progressbar"
        );
        await createProgressPagination(
          sliderAttributesDiv,
          styles.progressPagination
        );
      }
    }
    // Set custom attributes for all enabled features
    const attributes = [
      { key: "epyc-autoplay", value: config.modules.autoplay.enabled },
      {
        key: "epyc-mousewheel",
        value: config.modules.mousewheelControl.enabled,
      },
      { key: "epyc-keyboard", value: config.modules.keyboardControl.enabled },
      { key: "epyc-loop", value: config.modules.infiniteLoop.enabled },
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
