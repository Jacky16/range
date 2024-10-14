import { expect, test } from "@playwright/test";

test.describe("Given the Exercise 2 Page with a fixed values range", () => {
  test.describe("When the user enter the page", () => {
    test("Then the min value should be 1.99 and max value should be 70.99", async ({
      page,
    }) => {
      await page.goto("/exercise2");

      const expectedMinValue = 1.99;
      const expectedMaxValue = 70.99;

      const leftThumb = page.locator("[role=slider]").first();
      const rightThumb = page.locator("[role=slider]").last();

      const minValue = await leftThumb.getAttribute("aria-valuemin");
      const maxValue = await rightThumb.getAttribute("aria-valuemax");

      expect(Number(minValue)).toBe(expectedMinValue);
      expect(Number(maxValue)).toBe(expectedMaxValue);
    });

    test.describe("When the user drags the left thumb to 10% ", () => {
      test("Then it should return the value 10,99", async ({ page }) => {
        await page.goto("/exercise2");

        const leftThumb = page.locator("[role=slider]").first();
        const expectedResult = 10.99;

        const sliderTrack = page.locator("#slider-track");

        const sliderBox = await sliderTrack.boundingBox();
        const thumbBox = await leftThumb.boundingBox();

        if (sliderBox && thumbBox) {
          const { x, width } = sliderBox;
          const thumbWidth = thumbBox.width;

          const moveToX = Math.round(x + width * 0.1 + thumbWidth / 2);

          await leftThumb.hover();
          await page.mouse.down();
          await page.mouse.move(moveToX, 0);
          await page.mouse.up();

          const updatedValue = await leftThumb.getAttribute("aria-valuenow");

          expect(Number(updatedValue)).toBe(expectedResult);
        }
      });

      test.describe("When the user drags the right thumb to 60% ", () => {
        test("Then it should return the value 50,99", async ({ page }) => {
          await page.goto("/exercise2");

          const rightThumb = page.locator("[role=slider]").last();
          const expectedResult = 50.99;

          const sliderTrack = page.locator("#slider-track");

          const sliderBox = await sliderTrack.boundingBox();
          const thumbBox = await rightThumb.boundingBox();

          if (sliderBox && thumbBox) {
            const { x, width } = sliderBox;
            const thumbWidth = thumbBox.width;

            const moveToX = Math.round(x + width * 0.6 + thumbWidth / 2);

            await rightThumb.hover();
            await page.mouse.down();
            await page.mouse.move(moveToX, 0);
            await page.mouse.up();

            const updatedValue = await rightThumb.getAttribute("aria-valuenow");

            expect(Number(updatedValue)).toBe(expectedResult);
          }
        });
      });
    });
  });
});
