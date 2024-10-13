import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Range from "../range";

describe("Given the Range component", () => {
  describe("When it is rendered with a minimum value of 0 and a maximum value of 100", () => {
    test("Then the left thumb should be positioned at the minimum value and the right thumb at the maximum value", () => {
      const leftThumbExpectedValue = 0;
      const rightThumbExpectedValue = 100;

      render(
        <Range
          min={0}
          max={100}
          onChange={jest.fn()}
          onValueCommit={jest.fn()}
        />
      );

      const [leftThumb, rightThumb] = screen.getAllByRole("slider");

      expect(leftThumb).toHaveAttribute(
        "aria-valuenow",
        leftThumbExpectedValue.toString()
      );
      expect(rightThumb).toHaveAttribute(
        "aria-valuenow",
        rightThumbExpectedValue.toString()
      );
    });
    test('Then the left thumb should be a ariamaxvalue of "100" and the right thumb ariamaxvalue of "100"', () => {
      const leftThumbExpectedValue = 100;
      const rightThumbExpectedValue = 100;

      render(
        <Range
          min={0}
          max={100}
          onChange={jest.fn()}
          onValueCommit={jest.fn()}
        />
      );

      const [leftThumb, rightThumb] = screen.getAllByRole("slider");

      expect(leftThumb).toHaveAttribute(
        "aria-valuemax",
        leftThumbExpectedValue.toString()
      );
      expect(rightThumb).toHaveAttribute(
        "aria-valuemax",
        rightThumbExpectedValue.toString()
      );
    });

    test('Then the left thumb should be a ariaminvalue of "0" and the right thumb ariaminvalue of "0"', () => {
      const leftThumbExpectedValue = 0;
      const rightThumbExpectedValue = 0;

      render(
        <Range
          min={0}
          max={100}
          onChange={jest.fn()}
          onValueCommit={jest.fn()}
        />
      );

      const [leftThumb, rightThumb] = screen.getAllByRole("slider");

      expect(leftThumb).toHaveAttribute(
        "aria-valuemin",
        leftThumbExpectedValue.toString()
      );
      expect(rightThumb).toHaveAttribute(
        "aria-valuemin",
        rightThumbExpectedValue.toString()
      );
    });
  });

  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
  describe(`When it is rendered with a values array ${values.map((value) =>
    value.toString()
  )}`, () => {
    test("Then the left thumb should be positioned at the minimum value and the right thumb at the maximum value", () => {
      const leftThumbExpectedValue = values[0];
      const rightThumbExpectedValue = values[values.length - 1];

      render(
        <Range values={values} onChange={jest.fn()} onValueCommit={jest.fn()} />
      );

      const [leftThumb, rightThumb] = screen.getAllByRole("slider");

      expect(leftThumb).toHaveAttribute(
        "aria-valuenow",
        leftThumbExpectedValue.toString()
      );
      expect(rightThumb).toHaveAttribute(
        "aria-valuenow",
        rightThumbExpectedValue.toString()
      );
    });

    test('Then the left thumb should be a ariamaxvalue of "70.99" and the right thumb ariamaxvalue of "70.99"', () => {
      const leftThumbExpectedValue = values[values.length - 1];
      const rightThumbExpectedValue = values[values.length - 1];

      render(
        <Range values={values} onChange={jest.fn()} onValueCommit={jest.fn()} />
      );

      const [leftThumb, rightThumb] = screen.getAllByRole("slider");

      expect(leftThumb).toHaveAttribute(
        "aria-valuemax",
        leftThumbExpectedValue.toString()
      );
      expect(rightThumb).toHaveAttribute(
        "aria-valuemax",
        rightThumbExpectedValue.toString()
      );
    });
  });
});
