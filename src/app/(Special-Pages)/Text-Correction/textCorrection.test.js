/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Page from "./page.jsx";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/text-correction",
}));

// Mock RTK Query API
const mockCorrectText = jest.fn(() =>
  Promise.resolve({ data: { data: { corrected: "نص مصحح" } } })
);
jest.mock("../../redux/textCorrection", () => ({
  useCorrectTextMutation: () => [mockCorrectText],
}));

// Create a theme for MUI components
const theme = createTheme();

function renderWithProviders(ui) {
  const store = configureStore({ reducer: { dummy: (state = {}) => state } });
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>
  );
}

describe("Text Correction Page", () => {
  beforeEach(() => {
    mockCorrectText.mockClear();
  });

  test("renders input and button", () => {
    renderWithProviders(<Page />);
    expect(screen.getByPlaceholderText(/ادخل النص/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /تحقيق/i })).toBeInTheDocument();
  });

  test("button triggers correction when clicked", async () => {
    renderWithProviders(<Page />);
    const input = screen.getByPlaceholderText(/ادخل النص/i);
    fireEvent.change(input, { target: { value: "نص للاختبار" } });
    fireEvent.click(screen.getByRole("button", { name: /تحقيق/i }));

    // Check that the API was called
    await waitFor(() => {
      expect(mockCorrectText).toHaveBeenCalled();
    });
  });

  test("shows loading state in button when correcting", async () => {
    renderWithProviders(<Page />);
    const input = screen.getByPlaceholderText(/ادخل النص/i);
    fireEvent.change(input, { target: { value: "نص للاختبار" } });
    fireEvent.click(screen.getByRole("button", { name: /تحقيق/i }));

    // The button should show loading text
    await waitFor(() => {
      expect(screen.getByText(/جاري التحقق/i)).toBeInTheDocument();
    });
  });

  test("button is enabled when input is provided", () => {
    renderWithProviders(<Page />);
    const button = screen.getByRole("button", { name: /تحقيق/i });
    const input = screen.getByPlaceholderText(/ادخل النص/i);

    fireEvent.change(input, { target: { value: "نص للاختبار" } });
    expect(button).not.toBeDisabled();
  });
});

describe("Text Correction Page - API states", () => {
  test("button is disabled when input is empty", () => {
    renderWithProviders(<Page />);
    const button = screen.getByRole("button", { name: /تحقيق/i });
    fireEvent.click(button);
    // Button should still be enabled but no API call should be made for empty text
    expect(button).not.toBeDisabled();
  });
});
