// SPDX-License-Identifier: MIT
import "../../index.css";

import { BoardView } from "./BoardView";

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
    const { schema, ...rest } = data;
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
  } else if (source?.type === "board" || source?.fileKey) {
    return <BoardView fileKey={source.fileKey} />;
  } else {
    return renderJSON(source);
  }
}

export const Form = ({ state }) => {
  const theme = typeof state.data === "object" && state.data !== null ? state.data.theme : undefined;
  return (
    <div className="rounded-md font-mono flex flex-col gap-4 p-4 bg-white text-zinc-900">
      {Array.isArray(state.errors) && state.errors.length > 0
        ? renderErrors(state.errors, theme)
        : render({state})}
    </div>
  );
}
