import { expect, test } from "@playwright/test";

test.describe("Given the Exercise 1 Page", () => {
  test.describe("When the user drags the left thumb to 50% ", () => {
    test("Then it should return the value 50", async ({ page }) => {
      await page.goto("/exercise1");

      const leftThumb = page.locator("[role=slider]").first();

      const expectedResult = 50;

      const sliderTrack = page.locator("#slider-track");

      const sliderBox = await sliderTrack.boundingBox();
      const thumbBox = await leftThumb.boundingBox();

      if (sliderBox && thumbBox) {
        const { x, width } = sliderBox;
        const thumbWidth = thumbBox.width;

        const moveToX = Math.round(x + width * 0.5 + thumbWidth / 2);

        await leftThumb.hover();
        await page.mouse.down();
        await page.mouse.move(moveToX, 0);
        await page.mouse.up();

        const updatedValue = await leftThumb.getAttribute("aria-valuenow");

        expect(Number(updatedValue)).toBe(expectedResult);
      }
    });
  });

  test.describe("When the user drags the right thumb to 50% ", () => {
    test("Then it should return the value 50", async ({ page }) => {
      await page.goto("/exercise1");

      const rightThumb = page.locator("[role=slider]").last();

      const expectedResult = 50;

      const sliderTrack = page.locator("#slider-track");

      const sliderBox = await sliderTrack.boundingBox();
      const thumbBox = await rightThumb.boundingBox();

      if (sliderBox && thumbBox) {
        const { x, width } = sliderBox;
        const thumbWidth = thumbBox.width;

        const moveToX = Math.round(x + width * 0.5 + thumbWidth / 2);

        await rightThumb.hover();
        await page.mouse.down();
        await page.mouse.move(moveToX, 0);
        await page.mouse.up();

        const updatedValue = await rightThumb.getAttribute("aria-valuenow");

        expect(Number(updatedValue)).toBe(expectedResult);
      }
    });
  });

  test.describe("When the right thumb is at 50% and the left thumb is at 90%", () => {
    test("Then the value of the left thumb should be less than the right thumb", async ({
      page,
    }) => {
      await page.goto("/exercise1");

      const leftThumb = page.locator("[role=slider]").first();
      const rightThumb = page.locator("[role=slider]").last();

      const sliderTrack = page.locator("#slider-track");
      const sliderBox = await sliderTrack.boundingBox();

      const rightThumbBox = await rightThumb.boundingBox();
      const leftThumbBox = await leftThumb.boundingBox();

      if (sliderBox && rightThumbBox && leftThumbBox) {
        const { x, width } = sliderBox;

        const rightThumbWidth = rightThumbBox.width;
        const leftThumbWidth = leftThumbBox.width;

        const moveToXLeft = Math.round(x + width * 0.9 + leftThumbWidth / 2);
        const moveToXRight = Math.round(x + width * 0.5 + rightThumbWidth / 2);

        await rightThumb.hover();
        await page.mouse.down();
        await page.mouse.move(moveToXRight, 0);
        await page.mouse.up();

        await leftThumb.hover();
        await page.mouse.down();
        await page.mouse.move(moveToXLeft, 0);
        await page.mouse.up();

        const leftThumbValue = await leftThumb.getAttribute("aria-valuenow");
        const rightThumbValue = await rightThumb.getAttribute("aria-valuenow");

        expect(Number(leftThumbValue)).toBeLessThan(Number(rightThumbValue));
      }
    });
  });

  test.describe("When the user type in the left thumb input 50", () => {
    test("Then it the left thumb should be 50", async ({ page }) => {
      const expectedValue = 50;

      await page.goto("/exercise1");

      const leftThumb = page.locator("[role=slider]").first();
      const leftThumbInput = page.locator("input").first();

      await leftThumbInput.fill(expectedValue.toString());

      await leftThumbInput.blur();

      const updatedValue = await leftThumb.getAttribute("aria-valuenow");

      expect(Number(updatedValue)).toBe(expectedValue);
    });
  });

  test.describe("When the user type in the right thumb input 40", () => {
    test("Then it the right thumb should be 40", async ({ page }) => {
      const expectedValue = 40;

      await page.goto("/exercise1");

      const rightThumb = page.locator("[role=slider]").last();
      const rightThumbInput = page.locator("input").last();

      await rightThumbInput.clear();

      await rightThumbInput.fill(expectedValue.toString());

      await rightThumbInput.blur();

      const updatedValue = await rightThumb.getAttribute("aria-valuenow");

      expect(Number(updatedValue)).toBe(expectedValue);
    });
  });
});
