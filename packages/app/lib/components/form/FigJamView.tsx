// SPDX-License-Identifier: MIT
import "../../index.css";

interface FigJamViewProps {
  fileKey?: string;
}

export const FigJamView = ({ fileKey }: FigJamViewProps) => {
  if (!fileKey) {
    return (
      <div className="rounded-md p-3 border text-sm bg-red-50 border-red-200 text-red-800">
        Missing FigJam file key. Use <code className="bg-red-100 px-1 rounded">figjam "fileKey" ...</code> to specify the target board.
      </div>
    );
  }

  const embedUrl = `https://www.figma.com/embed?embed_host=graffiticode&url=https://www.figma.com/board/${fileKey}`;

  return (
    <div className="w-full aspect-video">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0 rounded-md"
        allowFullScreen
      />
    </div>
  );
};
