/*
 * Advent of Code
 * Day 7 - 2nd Solution
 * * * * * * * * * * * * * * *
 * w|!./run %
 */

import transformer from "../modules/transformer.ts";

type DiskUsage = {
  [name: string]: number;
};

transformer("./inputs/07.txt", async (readlines) => {
  const du: DiskUsage = {};
  const currentDirs: string[] = [];
  for await (const line of readlines) {
    const dirChange = /^\$ cd (.+)/.exec(line);
    const filesize = /^\d+/.exec(line);

    if (dirChange) {
      const arg = dirChange[1];
      if (arg == "..") {
        currentDirs.pop();
      } else {
        const path =
          arg === "/" ? arg : currentDirs[currentDirs.length - 1] + "/" + arg;
        path.replace("//", "/");
        currentDirs.push(path);
        if (!du[path]) du[path] = 0;
      }
    }
    if (filesize) {
      for (const dir of currentDirs) {
        du[dir] += +filesize[0];
      }
    }
  }
  // return dirSizes.toString();
  const spaceNeeded = 30000000 - (70000000 - du["/"]);
  const candidates = [];
  for (const dir in du) {
    const filesize = du[dir];
    if (filesize >= spaceNeeded) {
      candidates.push(filesize);
    }
  }
  candidates.sort((a, b) => a - b);
  return candidates[0].toString();
});
