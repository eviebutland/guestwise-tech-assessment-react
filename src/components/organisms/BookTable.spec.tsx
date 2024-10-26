import { describe, it, expect, vi, afterEach } from "vitest";
import BookTable from "./BookTable";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
// would love to complete this unit test as have really enjoyed working on this project!

global.fetch = vi.fn();

describe("BookTable", () => {
  afterEach(() => {
    cleanup();
  });
  it("Renders all fields", () => {
    render(<BookTable />);
    // screen.debug(); // This is like wrapper.html()
    const email = screen.getByTestId("email");
    const name = screen.getByTestId("name");
    const phone = screen.getByTestId("phone");
    const guests = screen.getByTestId("numberOfPeople");
    const date = screen.getByTestId("date");
    // const time = screen.getByTestId("time");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(guests).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    fireEvent.change(email, { target: { value: "testing@email.com" } });
    fireEvent.change(phone, { target: { value: "01234567890" } });
    fireEvent.change(name, { target: { value: "Tester" } });
    fireEvent.change(guests, { target: { value: 1 } });
    fireEvent.change(date, { target: { value: "2024-10-26T00:00" } });

    expect(email.value).toBe("testing@email.com");
    expect(name.value).toBe("Tester");
    expect(phone.value).toBe("01234567890");
    expect(guests.value).toBe("1");
    expect(date.value).toBe("2024-10-26T00:00");
  });
  it("Renders API fail message", () => {});
  it("Renders success message after submission", () => {});
  it("Renders validation messages", () => {});
});
