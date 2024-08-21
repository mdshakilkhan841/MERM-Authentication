/* eslint-disable react/prop-types */
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", isValid: password.length >= 6 },
    { label: "Contains uppercase letter", isValid: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", isValid: /[a-z]/.test(password) },
    { label: "Contains a number", isValid: /[0-9]/.test(password) },
    {
      label: "Contains special character",
      isValid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
    },
  ];

  return (
    <div className="space-y-1">
      {criteria.map(({ label, isValid }) => (
        <div
          key={label}
          className="flex items-center space-x-2 sm:text-sm text-xs"
        >
          {isValid ? (
            <Check className="sm:size-5 size-4 text-green-500" />
          ) : (
            <X className="sm:size-5 size-4 text-red-500" />
          )}
          <label className={isValid && "text-green-500"}>{label}</label>
        </div>
      ))}
    </div>
  );
};

const calculateStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) strength++;
  return strength;
};

const PasswordStrengthMeter = ({ password }) => {
  const strength = calculateStrength(password);
  const strengthText = ["Too weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColors = [
    "bg-red-500",
    "bg-red-400",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-green-500",
  ][strength];

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 mb-1 sm:text-lg text-sm">
        <span>Password Strength</span>
        <span>{strengthText}</span>
      </div>
      <div className="flex space-x-1 mb-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? strengthColors : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
