import { render, screen } from '@testing-library/react';
import App from './App';

describe("App tests", () => {
  test("should render input with placeholder text", () => {
    const page = render(<App />);
    const input = page.getByPlaceholderText('CB4 0GF');
    expect(input).toBeInTheDocument();
  });
  
  test("should render submit button", () => {
    const page = render(<App />);
    const button = page.getByTestId("submitButton");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });
});