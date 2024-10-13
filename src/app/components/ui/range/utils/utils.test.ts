import { RangeValue } from "../types/range-context.types";
import {
  calculateRelativePercentage,
  calculateThumbPosition,
  checkThumbPosition,
  findClosestValue,
  getClosestValueIndex,
} from "./utils";

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

describe("Given the calculateRelativePercentage function", () => {
  describe("When the value is less than the minValue", () => {
    test("Then it should return 0", () => {
      const expectedResult = 0;

      const result = calculateRelativePercentage(5, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is greater than the maxValue", () => {
    test("Then it should return 100", () => {
      const expectedResult = 100;

      const result = calculateRelativePercentage(70, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is equal to the minValue", () => {
    test("Then it should return 0", () => {
      const expectedResult = 0;

      const result = calculateRelativePercentage(10, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is equal to the maxValue", () => {
    test("Then it should return 100%", () => {
      const expectedResult = 100;

      const result = calculateRelativePercentage(60, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is exactly in the middle of the range with a min value of 0 and a max value of 100", () => {
    test("Then it should return 50%", () => {
      const expectedResult = 50;

      const result = calculateRelativePercentage(50, 0, 100);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is 55 and the minValue is 10 and the maxValue is 60", () => {
    test("Then it should return 90%", () => {
      const expectedResult = 90;

      const result = calculateRelativePercentage(55, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When the value is between minValue is 10 and maxValue is 60", () => {
    test("Then it should return 60%", () => {
      const expectedResult = 60;

      const result = calculateRelativePercentage(40, 10, 60);

      expect(result).toBe(expectedResult);
    });
  });
});

describe("Given the findClosestValue function", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  describe(`When the value is 9 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 10.99", () => {
      const expectedResult = 10.99;

      const result = findClosestValue(9, values);

      expect(result).toBe(expectedResult);
    });
  });

  describe(`When the value is 50 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 50.99", () => {
      const expectedResult = 50.99;
      const value = 50;

      const result = findClosestValue(value, values);

      expect(result).toBe(expectedResult);
    });
  });

  describe(`When the value is 100 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 70.99", () => {
      const expectedResult = 70.99;
      const value = 100;

      const result = findClosestValue(value, values);

      expect(result).toBe(expectedResult);
    });
  });

  describe(`When the value is 0 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 1.99", () => {
      const expectedResult = 1.99;
      const result = findClosestValue(0, values);

      expect(result).toBe(expectedResult);
    });
  });
});

describe("Given the getClosestValueIndex function", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  describe(`When the value is 10.99 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 2", () => {
      const expectedResult = 2;
      const value = 10.99;

      const result = getClosestValueIndex(values, value);

      expect(result).toBe(expectedResult);
    });
  });

  describe(`When the value is 25 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 3", () => {
      const expectedResult = 3;
      const value = 25;

      const result = getClosestValueIndex(values, value);

      expect(result).toBe(expectedResult);
    });
  });

  describe(`When the value is 100 and the values ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then it should return 5", () => {
      const expectedResult = 5;
      const value = 100;

      const result = getClosestValueIndex(values, value);

      expect(result).toBe(expectedResult);
    });
  });
});
