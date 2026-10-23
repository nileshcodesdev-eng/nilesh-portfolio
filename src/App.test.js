import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({ get: jest.fn() }));

import Feed from "./pages/Feed";
import store from "./store";

test("shows sample videos when no live video API key is configured", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    </Provider>
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(
    screen.getByAltText(
      "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour"
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(/add a rapidapi key to load live youtube results/i)
  ).toBeInTheDocument();
});
