import chalk from "chalk";

/**
 * Output a message with distinct coloring in the terminal.
 *
 * @param label - The identifying tag of the log entry.
 * @param value - The content or data of the log.
 */
export function log(label: string, value?: any): void {
  return console.log(`${chalk.bgYellow.hex("000000").bold(` ${label} `)} ${value ? chalk.blue(value) : " "}`);
}
