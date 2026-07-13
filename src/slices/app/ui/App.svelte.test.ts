import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import App from "./App.svelte";

describe("App", () => {
  it("renders fill action", () => {
    render(App);

    expect(screen.getByText("HH Helper")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Заполнить" }),
    ).toBeInTheDocument();
  });
});
