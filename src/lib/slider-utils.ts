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
    webflow.elementPresets.DivBlock
  );
  const prevNavigationText = await prevNavigation.append(
    webflow.elementPresets.Paragraph
  );
  await applyStyles(prevNavigation, [prevStyle]);
  await prevNavigationText.setTextContent("prev");

  const nextNavigation = await buttonNavigationDiv.append(
    webflow.elementPresets.DivBlock
  );
  const nextNavigationText = await nextNavigation.append(
    webflow.elementPresets.Paragraph
  );
  await applyStyles(nextNavigation, [nextStyle]);
  await nextNavigationText.setTextContent("next");
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
  const swiperDiv = await parentDiv.append(webflow.elementPresets.DOM);
  await swiperDiv.setTag("div");
  await swiperDiv.setStyles([swiperStyle]);

  const wrapperStyle = await getOrCreateStyle("swiper-wrapper");
  const swiperWrapperDiv = await swiperDiv.append(webflow.elementPresets.DOM);
  await swiperWrapperDiv.setTag("div");
  await swiperWrapperDiv.setStyles([wrapperStyle]);

  const slideStyle = await getOrCreateStyle("swiper-slide");

  // Create sample slides
  for (let i = 1; i <= 3; i++) {
    const slide = await swiperWrapperDiv.append(webflow.elementPresets.DOM);
    await slide.setTag("div");
    await slide.setStyles([slideStyle]);
    await slide.setTextContent(`slide ${i}`);
  }

  return swiperDiv;
}
