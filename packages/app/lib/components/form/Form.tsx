// SPDX-License-Identifier: MIT
import "../../index.css";

import { BoardView } from "./BoardView";

function renderErrors(errors: { message: string; from: number; to: number }[]) {
  return (
    <div className="flex flex-col gap-2">
      {errors.map((error, i) => (
        <div
          key={i}
          className="rounded-md p-3 border text-sm bg-red-50 border-red-200 text-red-800"
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
  return (
    <div className="rounded-md font-mono flex flex-col gap-4 p-4 bg-white text-zinc-900">
      {Array.isArray(state.data.errors) && state.data.errors.length > 0
        ? renderErrors(state.data.errors)
        : render({state})}
    </div>
  );
}
