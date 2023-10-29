import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import baseX from "base-x";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(inputStr: string) {
  return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
}

export async function copyIt(inputStr: string) {
  await navigator?.clipboard.writeText(inputStr);
}

function encodeBase58(buf: Buffer): string {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return baseX(alphabet).encode(buf);
}

export function getId() {
  return encodeBase58(
    Buffer.from(crypto.randomUUID().replace(/-/g, ""), "hex")
  );
}
