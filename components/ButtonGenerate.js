"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/libs/api";
import ButtonLead from "./ButtonLead";

const ButtonGenerate = ({ extraStyle }) => {
  const inputRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const randomUserIdSeed = Math.random().toString(36).substring(7);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    setIsLoading(true);
    try {
      toast.success("Generating...");

      const response = await apiClient.post("/open-ai", {
        messages: [{ role: "user", content: userInput }],
        userId: randomUserIdSeed
      });

      setAiResponse(response);

      toast.success("Success!");

      // just remove the focus on the input
      inputRef.current.blur();
      setUserInput("");
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return <>
  <form
  className={`w-full max-w-xs space-y-3 ${extraStyle ? extraStyle : ""}`}
  onSubmit={handleSubmit}
>
  <input
    required
    type="text"
    value={userInput}
    ref={inputRef}
    placeholder="I need financial advice on..."
    className="input input-bordered w-full placeholder:opacity-60"
    onChange={(e) => setUserInput(e.target.value)}
  />

  <button
    className="btn btn-primary btn-block"
    type="submit"
    disabled={isDisabled}
  >
    Generate
    {isLoading ? (
      <span className="loading loading-spinner loading-xs"></span>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
</form>
{aiResponse && (
      <>
      <div>
        {aiResponse}
      </div>
      {/* Bold text */}
      <b>Need more help? Signup below!</b>
      <ButtonLead />
      </>
  )}
</>
};

export default ButtonGenerate;
