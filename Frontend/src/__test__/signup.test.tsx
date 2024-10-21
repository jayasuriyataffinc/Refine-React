import { useNavigate } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Signup from "../pages/Login/SignUp";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue({ navigate: jest.fn() });
  });
  test("Form render", () => {
    render(<Signup />);
    expect(screen.getByTestId("form-test")).toBeInTheDocument();
  });

  test("Top icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("title-icon")).toBeInTheDocument();
  });
  
  test("Welcome Back Title", () => {
    render(<Signup />);
    const SignupTitle = screen.getByText(/Create Account/i);
    expect(SignupTitle).toBeInTheDocument();
  });
  test("Sign in to your secure account text ", () => {
    render(<Signup />);
    const SignupTitle = screen.getByText(/Sign up for a new account/i);
    expect(SignupTitle).toBeInTheDocument();
  });

  test("Username Input field", () => {
    render(<Signup />);
    const inputElement = screen.getByPlaceholderText(/Enter the Username/i);
    expect(inputElement).toBeInTheDocument();
  });
  test("Mail Input field", () => {
    render(<Signup />);
    const inputElement = screen.getByPlaceholderText(/Enter the Email/i);
    expect(inputElement).toBeInTheDocument();
  });
  test("Password Input field", () => {
    render(<Signup />);
    const inputElement = screen.getByPlaceholderText(/Enter the Password/i);
    expect(inputElement).toBeInTheDocument();
  });
  test("Confirm Password Input field", () => {
    render(<Signup />);
    const inputElement = screen.getByPlaceholderText(/Confirm Password/i);
    expect(inputElement).toBeInTheDocument();
  });
  test("Username icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("username-icon")).toBeInTheDocument();
  });
  test("Mail icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });
  test("Password icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("password-icon")).toBeInTheDocument();
  });
  test("Confirm Password icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("con-password-icon")).toBeInTheDocument();
  });
  test("Password Toggle icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("password-toggle-icon")).toBeInTheDocument();
  });
  test("Confirm Password Toggle icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("con-toggle-icon")).toBeInTheDocument();
  });
  test("Signup icon text", () => {
    render(<Signup />);
    expect(screen.getByTestId("Signup-icon")).toBeInTheDocument();
  });
  test("Signup btn", () => {
    render(<Signup />);
    expect(screen.getByTestId("signup-btn")).toBeInTheDocument();
  });
  test("Signup button  Text", () => {
    render(<Signup />);
    const loginTitle = screen.getByText("Sign up");
    expect(loginTitle).toBeInTheDocument();
  });
  test("Navigation Text", () => {
    render(<Signup />);
    const SignupTitle = screen.getByText(/You have an Account ?/i);
    expect(SignupTitle).toBeInTheDocument();
    const linkElement = screen.getByText(/Click here/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
    expect(screen.getByText(/to LogIn/i)).toBeInTheDocument();
  });
  test("Or continue with  Text", () => {
    render(<Signup />);
    const SignupTitle = screen.getByText(/Or continue with/i);
    expect(SignupTitle).toBeInTheDocument();
  });
  test("Google Account  Text", () => {
    render(<Signup />);
    const SignupTitle = screen.getByText(/Google Account/i);
    expect(SignupTitle).toBeInTheDocument();
  });
  test("Google btn", () => {
    render(<Signup />);
    expect(screen.getByTestId("google-btn")).toBeInTheDocument();
  });
  test("Google btn", () => {
    render(<Signup />);
    const onClick = jest.fn();
    const btn = screen.getByTestId("google-btn")
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(0)
  });
});
