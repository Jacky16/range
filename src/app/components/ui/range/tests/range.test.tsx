import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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

  describe("When the user types 50 on the left thumb input field", () => {
    test("Then it should return the value 50,00 €", async () => {
      const valueToBeTyped = 50;
      const expectedValue = valueToBeTyped.toLocaleString("es", {
        style: "currency",
        currency: "EUR",
      });

      render(<Range min={0} max={100} />);

      const leftThumbInput = screen.getByRole("textbox", {
        name: "min",
      });

      await fireEvent.focus(leftThumbInput);

      await fireEvent.change(leftThumbInput, {
        target: { value: valueToBeTyped.toString() },
      });

      await fireEvent.blur(leftThumbInput);

      expect(leftThumbInput).toHaveProperty("value", expectedValue);
    });
  });

  describe("When the user types 50 on the right thumb input field", () => {
    test("Then it should return the value 50,00 €", async () => {
      const valueToBeTyped = 50;
      const expectedValue = valueToBeTyped.toLocaleString("es", {
        style: "currency",
        currency: "EUR",
      });

      render(<Range min={0} max={100} />);

      const rightThumbInput = screen.getByRole("textbox", {
        name: "max",
      });

      await fireEvent.focus(rightThumbInput);
      await fireEvent.change(rightThumbInput, {
        target: { value: valueToBeTyped.toString() },
      });
      await fireEvent.blur(rightThumbInput);

      expect(rightThumbInput).toHaveProperty("value", expectedValue);
    });
  });

  describe("When the user types 200 on the right thumb input field", () => {
    test("Then it should return the value 100,00 €", async () => {
      const valueToBeTyped = 200;
      const expectedValue = Number(100).toLocaleString("es", {
        style: "currency",
        currency: "EUR",
      });

      render(<Range min={0} max={100} />);

      const rightThumbInput = screen.getByRole("textbox", {
        name: "max",
      });

      await fireEvent.focus(rightThumbInput);
      await fireEvent.change(rightThumbInput, {
        target: { value: valueToBeTyped.toString() },
      });
      await fireEvent.blur(rightThumbInput);

      expect(rightThumbInput).toHaveProperty("value", expectedValue);
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
