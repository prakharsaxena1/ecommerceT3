'use client';
import React, { useState, useRef, useEffect, type SetStateAction } from "react";

let currentOTPIndex = 0;

type OTPFieldProps = {
  otp: string[];
  setOtp: React.Dispatch<SetStateAction<string[]>>
};

const OTPField: React.FC<OTPFieldProps> = ({ otp, setOtp }) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className="flex flex-row flex-nowrap justify-around text-center">
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={activeOTPIndex === index ? inputRef : null}
              type="text"
              className="w-12 h-12 border-2 rounded outline-none text-center text-xl focus:border-gray-700 focus:text-gray-700 text-gray-400 border-gray-400 transition-all"
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OTPField;
