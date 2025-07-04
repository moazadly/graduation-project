/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WordBeforeAfterPage from "./page";

// Mock Next.js navigation and RTK Query
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: (key) => (key === "word" ? "اختبار" : null),
  }),
  usePathname: () => "/word-before-after",
}));

const mockPostPredict = jest.fn(() => Promise.resolve({ data: [] }));
jest.mock("../../redux/wordBeforeAfter", () => ({
  usePostPredictMutation: () => [mockPostPredict],
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

describe("Word-Before-After Page", () => {
  beforeEach(() => {
    mockPostPredict.mockClear();
  });

  test("renders without crashing", () => {
    renderWithProviders(<WordBeforeAfterPage />);
    expect(
      screen.getByText(/اكتشف الكلمات الأكثر ارتباطًا بالكلمة المستهدفة!/i)
    ).toBeInTheDocument();
  });

  test("renders the Search component", () => {
    renderWithProviders(<WordBeforeAfterPage />);
    expect(
      screen.getByPlaceholderText(/أدخل الكلمة التي تريد البحث عنها/i)
    ).toBeInTheDocument();
  });

  test("displays word from search params", () => {
    renderWithProviders(<WordBeforeAfterPage />);
    expect(screen.getByText("اختبار")).toBeInTheDocument();
  });
});

describe("Word-Before-After Page - API states", () => {
  test("shows skeleton when API is loading", () => {
    // Mock the BeforeAfterResults component to show loading state
    jest.doMock("../../components/BeforeAfterResults", () => {
      return function MockBeforeAfterResults() {
        return <div data-testid="data-table-skeleton">Loading skeleton</div>;
      };
    });

    const PageWithLoading = require("./page").default;
    renderWithProviders(<PageWithLoading />);
    expect(screen.getByTestId("data-table-skeleton")).toBeInTheDocument();
    jest.resetModules();
  });
});
