/**
 * @jest-environment jsdom
 */

// 1. Mock `lucide-react` so Jest doesn't try to parse its ESM build:
jest.mock("lucide-react", () => ({
  Mic: () => null,
  MicOff: () => null,
  // Add any other icons you import from "lucide-react" here as empty components
}));

// 2. Mock Next.js' `useRouter` and `useSearchParams` so that your component can call `router.push(...)` and get search params without error:
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: (key) => (key === "word" ? "test" : null),
  }),
}));

// 5. Mock the RTK Query hook for collocations API:
jest.mock("../../redux/collocationApi", () => ({
  useGetCollocationsQuery: jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page.jsx";
import { useGetCollocationsQuery } from "../../redux/collocationApi";

let stableDataArray = [];

beforeEach(() => {
  useGetCollocationsQuery.mockImplementation(() => ({
    data: { data: stableDataArray },
    isLoading: false,
    isError: false,
    isSuccess: true,
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  // 3. Mock navigator.mediaDevices.getUserMedia so any calls in your component won't throw:
  Object.defineProperty(global.navigator, "mediaDevices", {
    value: {
      getUserMedia: jest.fn().mockResolvedValue({
        /* fake stream object */
      }),
    },
  });

  // 4. Mock MediaRecorder (if your component instantiates it):
  global.MediaRecorder = class {
    constructor(stream) {
      this.stream = stream;
      this.start = jest.fn();
      this.stop = jest.fn();
      this.addEventListener = jest.fn();
      this.removeEventListener = jest.fn();
    }
  };
});

test("collocation input should be rendered", () => {
  render(<Page />);
  const collocationInputEl = screen.getByPlaceholderText(
    /أدخل الكلمة التي تريد البحث عنها/i
  );
  expect(collocationInputEl).toBeInTheDocument();
});
test("button should be rendered", () => {
  render(<Page />);
  const searchBtn = screen.getByTestId("search_btn");

  expect(searchBtn).toBeInTheDocument();
});
test("button should be disabled", () => {
  render(<Page />);
  const searchBtn = screen.getByTestId("search_btn");
  expect(searchBtn).toBeDisabled();
});
test("button should not be disabled when inputs exist", () => {
  render(<Page />);
  const searchBtn = screen.getByTestId("search_btn");
  const collocationInputEl = screen.getByPlaceholderText(
    /أدخل الكلمة التي تريد البحث عنها/i
  );

  const testValue = "test";

  fireEvent.change(collocationInputEl, { target: { value: testValue } });

  expect(searchBtn).not.toBeDisabled();
});
test("error message should not be visible", () => {
  render(<Page />);
  const errorEl = screen.getByTestId("err");
  expect(errorEl).not.toBeVisible();
});

test("error message for not valid input (validate on submit)", () => {
  render(<Page />);
  const input = screen.getByPlaceholderText(
    /أدخل الكلمة التي تريد البحث عنها/i
  );
  const submitButton = screen.getByRole("button", { name: /بحث/i });
  const errorEl = screen.getByTestId("err");

  fireEvent.change(input, { target: { value: "دخلنا كلمتين" } });

  fireEvent.click(submitButton);

  expect(errorEl).toBeVisible();
});

describe("Collocations API integration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders collocations from API mock", () => {
    // Arrange: mock API data
    useGetCollocationsQuery.mockReturnValue({
      data: { data: [{ highlight: ["قبل$كلمة$بعد"], source: "test source" }] },
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    // Act: render the component/page that uses the hook
    render(<Page />);

    // Assert: check for expected output from mocked data
    // The word in the highlight is 'كلمة'
    expect(screen.getByText("كلمة")).toBeInTheDocument();
    // Optionally, check for the source if it is rendered
    // expect(screen.getByText(/test source/i)).toBeInTheDocument();
  });
});

describe("CollocationsResult API states", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading skeleton when loading", () => {
    useGetCollocationsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });
    render(<Page />);
    // DataTableSkeleton renders a data-table-skeleton
    expect(screen.getByTestId("data-table-skeleton")).toBeInTheDocument();
  });

  test("shows no table when error", () => {
    useGetCollocationsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
    });
    render(<Page />);
    // DataTable should not be in the document
    expect(screen.queryByTestId("data-table")).not.toBeInTheDocument();
  });

  test("shows empty table when no results", () => {
    useGetCollocationsQuery.mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
      isSuccess: true,
    });
    render(<Page />);
    // Check for the empty state message
    expect(
      screen.getByText("لا توجد نتائج متاحة لهذه الكلمة.")
    ).toBeInTheDocument();
  });
});
