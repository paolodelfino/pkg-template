import { assert } from "chai";
import {} from "../../dist/index.mjs";
import { stopwatch } from "./utils";
import { parseArgs } from "util";
import { Test_Set } from "putesting";
import "./utils";

type Tests = "";

async function main() {
  const tests = new Test_Set<Tests>({
    "": {
      async callback() {},
    },
  });

  const argc = process.argv.length - 2;
  const argv = process.argv.slice(2);

  if (argc == 0) {
    await tests.run();
  } else {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        list: {
          type: "boolean",
        },
      },
    });

    if (values.list) {
      console.log(tests.keys);
      return;
    }

    for (const arg of positionals) {
      if (!tests.has(arg)) {
        throw new Error(`"${arg}" is not a valid test`);
      }
      await tests.run(arg);
    }
  }
}

main();
