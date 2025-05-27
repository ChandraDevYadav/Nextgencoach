import { exec } from "child_process";
import path from "path";

export const transcribeAudio = (audioPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join("transcripts", `${Date.now()}.txt`);
    const cmd = `whisper ${audioPath} --model base --output_format txt --output_dir transcripts`;

    exec(cmd, (error) => {
      if (error) return reject(error);

      const transcript = fs.readFileSync(outputPath, "utf-8");
      resolve(transcript);
    });
  });
};
