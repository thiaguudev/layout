import { Theme } from "@/config/themes"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Config = {
  style: string
  theme: Theme["name"]
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}