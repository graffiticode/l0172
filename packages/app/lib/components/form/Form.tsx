// SPDX-License-Identifier: MIT
import "../../index.css";
import { useState, useEffect } from "react";

import { ThemeToggle } from "./ThemeToggle";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function renderErrors(errors: { message: string; from: number; to: number }[], theme: string | undefined) {
  return (
    <div className="flex flex-col gap-2">
      {errors.map((error, i) => (
        <div
          key={i}
          className={classNames(
            "rounded-md p-3 border text-sm",
            theme === "dark"
              ? "bg-red-900/50 border-red-700 text-red-200"
              : "bg-red-50 border-red-200 text-red-800"
          )}
        >
          {error.message}
        </div>
      ))}
    </div>
  );
}

function renderJSON(data) {
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const { schema, theme, ...rest } = data;
    return (
      <pre className="text-xs">{JSON.stringify(rest, null, 2)}</pre>
    );
  }
  return (
    <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
  );
}

function render({ state }) {
  const { data } = state;
  const source = data?._ ?? data;
  if (source?.print !== undefined) {
    if (typeof source.print === "string") {
      return <span className="text-sm">{source.print}</span>;
    } else {
      return renderJSON(source.print);
    }
  } else if (typeof source?.hello === "string") {
    return <span className="text-sm">{`hello, ${source.hello}!`}</span>;
  } else if (typeof source?.image === "string") {
    return <img src={source.image} />;
  } else {
    return renderJSON(source);
  }
}

export const Form = ({ state }) => {
  const source = state.data?._ ?? state.data;
  const initialTheme = typeof source === 'object' && source !== null && !Array.isArray(source) ? source.theme : undefined;
  const [ theme, setTheme ] = useState(initialTheme ?? state.data.theme);

  useEffect(() => {
    state.apply({
      type: "update",
      args: {
        theme,
      },
    });
  }, [theme]);
  return (
    <div
      className={classNames(
        theme === "dark" && "bg-zinc-900 text-white" || "bg-white text-zinc-900",
        "rounded-md font-mono flex flex-col gap-4 p-4"
      )}
    >
      {theme !== undefined && <ThemeToggle theme={theme} setTheme={setTheme} />}
      {Array.isArray(state.data.errors) && state.data.errors.length > 0
        ? renderErrors(state.data.errors, theme)
        : render({state})}
    </div>
  );
}
