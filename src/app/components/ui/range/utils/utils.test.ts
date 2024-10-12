import { RangeValue } from "../types/range-context.types";
import { calculateThumbPosition, checkThumbPosition } from "./utils";

describe("Given the calculateThumbPosition function", () => {
  describe("When the mouse is positioned at the middle of the range with an min value of 0 and a max value of 100 ", () => {
    test("Then it should return the middle value of the range", () => {
      const expectedResult = 50;

      const options = {
        rangeLeftPosition: 0,
        rangeWidth: 100,
        thumbSize: 0,
        mouseXPosition: 50,
        minValue: 0,
        maxValue: 100,
      };

      const result = calculateThumbPosition(
        options.mouseXPosition,
        options.rangeLeftPosition,
        options.rangeWidth,
        options.minValue,
        options.maxValue
      );

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the mouse is positioned at the middle of the range with an min value of 0 and a max value of 60  ", () => {
    test("Then it should return 24% of the range", () => {
      const expectedResult = 24;

      const options = {
        rangeLeftPosition: 0,
        rangeWidth: 100,
        mouseXPosition: 40,
        minValue: 0,
        maxValue: 60,
      };

      const result = calculateThumbPosition(
        options.mouseXPosition,
        options.rangeLeftPosition,
        options.rangeWidth,
        options.minValue,
        options.maxValue
      );

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the mouse is positioned at 20% of the range with an min value of 0 and a max value of 50", () => {
    test("Then it should return 10% of the range", () => {
      const expectedResult = 10;

      const options = {
        rangeLeftPosition: 0,
        rangeWidth: 100,
        thumbSize: 20,
        mouseXPosition: 20,
        minValue: 0,
        maxValue: 50,
      };

      const result = calculateThumbPosition(
        options.mouseXPosition,
        options.rangeLeftPosition,
        options.rangeWidth,
        options.minValue,
        options.maxValue
      );

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the mouse is positioned at the end of the range and the range is between 10 and 50", () => {
    test("Then it should return the max value of the range", () => {
      const expectedResult = 50;

      const options = {
        rangeLeftPosition: 0,
        rangeWidth: 100,
        thumbSize: 10,
        mouseXPosition: 100,
        minValue: 10,
        maxValue: 50,
      };

      const result = calculateThumbPosition(
        options.mouseXPosition,
        options.rangeLeftPosition,
        options.rangeWidth,
        options.minValue,
        options.maxValue
      );

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the mouse is positioned at the start of the range and the range is between 10 and 50", () => {
    test("Then it should return the min value of the range", () => {
      const expectedResult = 10;

      const options = {
        rangeLeftPosition: 0,
        rangeWidth: 100,
        thumbSize: 10,
        mouseXPosition: 0,
        minValue: 10,
        maxValue: 50,
      };

      const result = calculateThumbPosition(
        options.mouseXPosition,
        options.rangeLeftPosition,
        options.rangeWidth,
        options.minValue,
        options.maxValue
      );

      expect(result).toBe(expectedResult);
    });
  });
});

describe("Given the checkThumbPosition function with an offset of 0.01 between thumbs", () => {
  const offset = 0.01;
  const initialRangeValue: RangeValue = {
    min: 0,
    max: 100,
  };

  describe("When checking the left thumb position", () => {
    describe("And the current value (95) is greater than the previous maximum (90)", () => {
      test("Then it should return 89.99, ensuring the left thumb doesn't exceed the right thumb", () => {
        const expectedResult = 89.99;

        const previousRangeValue: RangeValue = {
          min: 70,
          max: 90,
        };

        const currentLeftThumbValue = 95;

        const result = checkThumbPosition(
          currentLeftThumbValue,
          previousRangeValue,
          initialRangeValue,
          "left",
          offset
        );

        expect(result).toBe(expectedResult);
      });
    });

    describe("And the current value (200) is greater than the initial maximum (100) and the previous maximum is 50", () => {
      test("Then it should return 49.99, ensuring the left thumb stays below the right thumb's position", () => {
        const expectedResult = 49.99;

        const previousRangeValue: RangeValue = {
          min: 20,
          max: 50,
        };

        const currentLeftThumbValue = 200;

        const result = checkThumbPosition(
          currentLeftThumbValue,
          previousRangeValue,
          initialRangeValue,
          "left",
          offset
        );

        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("When checking the right thumb position", () => {
    describe("And the current value (5) is less than the initial minimum (0) and the previous minimum is 50", () => {
      test("Then it should return 50.01, ensuring the right thumb doesn't fall below the left thumb's position", () => {
        const expectedResult = 50.01;

        const previousRangeValue: RangeValue = {
          min: 50,
          max: 100,
        };

        const currentRightThumbValue = 5;

        const result = checkThumbPosition(
          currentRightThumbValue,
          previousRangeValue,
          initialRangeValue,
          "right",
          offset
        );

        expect(result).toBe(expectedResult);
      });
    });

    describe("And the current value (10) is less than the previous minimum (20)", () => {
      test("Then it should return 20.01, ensuring the right thumb does not overlap with the left thumb", () => {
        const expectedResult = 20.01;

        const previousRangeValue: RangeValue = {
          min: 20,
          max: 30,
        };

        const currentRightThumbValue = 10;

        const result = checkThumbPosition(
          currentRightThumbValue,
          previousRangeValue,
          initialRangeValue,
          "right",
          offset
        );

        expect(result).toBe(expectedResult);
      });
    });
  });
});
