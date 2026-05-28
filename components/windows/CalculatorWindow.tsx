"use client";

import { useCallback, useEffect, useState } from "react";
import type { WindowComponentProps } from "@/lib/windows";

export function CalculatorWindow({ playSound }: WindowComponentProps) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [operand, setOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const current = parseFloat(display);

  const inputDigit = useCallback(
    (digit: string) => {
      playSound("click");
      if (resetNext) {
        setDisplay(digit);
        setResetNext(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, resetNext, playSound],
  );

  const inputDot = useCallback(() => {
    playSound("click");
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, resetNext, playSound]);

  const calculate = useCallback(
    (a: number, op: string, b: number): number => {
      switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : NaN;
        default: return b;
      }
    },
    [],
  );

  const handleOperator = useCallback(
    (op: string) => {
      playSound("click");
      if (operator && operand !== null && !resetNext) {
        const result = calculate(operand, operator, current);
        const resultStr = isNaN(result) ? "Error" : String(result);
        setDisplay(resultStr);
        setOperand(result);
      } else {
        setOperand(current);
      }
      setOperator(op);
      setResetNext(true);
    },
    [operator, operand, current, resetNext, calculate, playSound],
  );

  const handleEquals = useCallback(() => {
    playSound("click");
    if (operator && operand !== null) {
      const result = calculate(operand, operator, current);
      const resultStr = isNaN(result) ? "Error" : String(result);
      setDisplay(resultStr);
      setOperand(null);
      setOperator(null);
      setResetNext(true);
    }
  }, [operator, operand, current, calculate, playSound]);

  const clear = useCallback(() => {
    playSound("click");
    setDisplay("0");
    setOperand(null);
    setOperator(null);
    setResetNext(false);
  }, [playSound]);

  const clearEntry = useCallback(() => {
    playSound("click");
    setDisplay("0");
    setResetNext(false);
  }, [playSound]);

  const backspace = useCallback(() => {
    playSound("click");
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display, playSound]);

  const toggleSign = useCallback(() => {
    playSound("click");
    if (display !== "0") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  }, [display, playSound]);

  const percent = useCallback(() => {
    playSound("click");
    if (operand !== null) {
      setDisplay(String(operand * current / 100));
    } else {
      setDisplay(String(current / 100));
    }
    setResetNext(true);
  }, [current, operand, playSound]);

  const sqrt = useCallback(() => {
    playSound("click");
    const result = Math.sqrt(current);
    setDisplay(isNaN(result) ? "Error" : String(result));
    setResetNext(true);
  }, [current, playSound]);

  const reciprocal = useCallback(() => {
    playSound("click");
    const result = current !== 0 ? 1 / current : NaN;
    setDisplay(isNaN(result) ? "Error" : String(result));
    setResetNext(true);
  }, [current, playSound]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      else if (e.key === ".") inputDot();
      else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") handleOperator(e.key);
      else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Escape") clear();
      else if (e.key === "Backspace") backspace();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inputDigit, inputDot, handleOperator, handleEquals, clear, backspace]);

  const btn = (label: string, onClick: () => void, color?: string, wide?: boolean) => (
    <button
      onClick={onClick}
      className={`h-[36px] ${wide ? "col-span-1" : ""} flex items-center justify-center border-[2px] bg-[#c0c0c0] text-[14px] font-bold cursor-default active:translate-x-px active:translate-y-px select-none`}
      style={{
        borderColor: "#dfdfdf #808080 #808080 #dfdfdf",
        color: color ?? "#000080",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Menu bar */}
      <div className="flex items-center h-[20px] px-2 border-b border-[#808080] text-[11px]">
        <span className="px-2 underline cursor-default">Edit</span>
        <span className="px-2 underline cursor-default">View</span>
        <span className="px-2 underline cursor-default">Help</span>
      </div>

      {/* Display */}
      <div className="mx-3 mt-3 mb-2">
        <div
          className="h-[32px] flex items-center justify-end px-2 bg-white text-[18px] font-mono text-right"
          style={{ borderColor: "#808080 #dfdfdf #dfdfdf #808080", borderWidth: 2, borderStyle: "solid" }}
        >
          {display}
        </div>
      </div>

      {/* Buttons grid */}
      <div className="flex-1 px-3 pb-3">
        {/* Row 1: blank, Backspace, CE, C */}
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-[4px] mb-[4px]">
          <div className="h-[32px] border-[2px] bg-[#c0c0c0]" style={{ borderColor: "#dfdfdf #808080 #808080 #dfdfdf" }} />
          <button
            onClick={backspace}
            className="h-[32px] flex items-center justify-center border-[2px] bg-[#c0c0c0] text-[11px] font-bold text-[#800000] cursor-default active:translate-x-px active:translate-y-px"
            style={{ borderColor: "#dfdfdf #808080 #808080 #dfdfdf" }}
          >
            Backspace
          </button>
          <button
            onClick={clearEntry}
            className="h-[32px] flex items-center justify-center border-[2px] bg-[#c0c0c0] text-[11px] font-bold text-[#800000] cursor-default active:translate-x-px active:translate-y-px"
            style={{ borderColor: "#dfdfdf #808080 #808080 #dfdfdf" }}
          >
            CE
          </button>
          <button
            onClick={clear}
            className="h-[32px] flex items-center justify-center border-[2px] bg-[#c0c0c0] text-[11px] font-bold text-[#800000] cursor-default active:translate-x-px active:translate-y-px"
            style={{ borderColor: "#dfdfdf #808080 #808080 #dfdfdf" }}
          >
            C
          </button>
        </div>

        {/* Main grid: 4 rows x 6 cols */}
        <div className="grid grid-cols-6 gap-[4px]">
          {/* Row: MC 7 8 9 / sqrt */}
          {btn("MC", () => { playSound("click"); setMemory(0); }, "#800000")}
          {btn("7", () => inputDigit("7"))}
          {btn("8", () => inputDigit("8"))}
          {btn("9", () => inputDigit("9"))}
          {btn("÷", () => handleOperator("/"), "#ff0000")}
          {btn("√", sqrt)}

          {/* Row: MR 4 5 6 * % */}
          {btn("MR", () => { playSound("click"); setDisplay(String(memory)); setResetNext(true); }, "#800000")}
          {btn("4", () => inputDigit("4"))}
          {btn("5", () => inputDigit("5"))}
          {btn("6", () => inputDigit("6"))}
          {btn("×", () => handleOperator("*"), "#ff0000")}
          {btn("%", percent)}

          {/* Row: MS 1 2 3 - 1/x */}
          {btn("MS", () => { playSound("click"); setMemory(current); }, "#800000")}
          {btn("1", () => inputDigit("1"))}
          {btn("2", () => inputDigit("2"))}
          {btn("3", () => inputDigit("3"))}
          {btn("−", () => handleOperator("-"), "#ff0000")}
          {btn("1/x", reciprocal)}

          {/* Row: M+ 0 +/- . + = */}
          {btn("M+", () => { playSound("click"); setMemory(memory + current); }, "#800000")}
          {btn("0", () => inputDigit("0"))}
          {btn("±", toggleSign)}
          {btn(".", inputDot)}
          {btn("+", () => handleOperator("+"), "#ff0000")}
          {btn("=", handleEquals, "#ff0000")}
        </div>
      </div>
    </div>
  );
}
