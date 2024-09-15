import { Button as DefaultButton } from "@/components/ui/button"; // Assuming you're importing your Button from UI library
import classNames from "classnames";

const CustomButton = ({
  type = "submit",
  className,
  color = "primary",
  disableAnimation = false,
  radius = "sm",
  disabled = false,
  isLoading = false,
  children,
  ...props
}) => {
  // Define default classes
  const defaultClasses = classNames(
    "w-full", // Default class for width
    {
      "bg-primary": color === "primary", // If color is primary
      "rounded-sm": radius === "sm", // If radius is sm
      "rounded-md": radius === "md", // Medium radius
      "rounded-lg": radius === "lg", // Large radius
      "animate-none": disableAnimation, // Disable animation
      "opacity-50 cursor-not-allowed": disabled, // Disable styles
      "loading-spinner": isLoading, // Loading state styles, e.g., you can style this with spinner icon
    },
    className // Allow custom className to be merged
  );

  return (
    <DefaultButton
      type={type}
      className={defaultClasses}
      disabled={disabled}
      isLoading={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </DefaultButton>
  );
};

export default CustomButton;
