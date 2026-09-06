import { useState } from "react"
import { LanguagesIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface LanguageOption {
  value: string
  label: string
  href: string
}

interface Props {
  options: LanguageOption[]
  current: string
  ariaLabel: string
  className?: string
}

// Îlot interactif : select shadcn (Base UI) de langue pour la navbar.
// Sélectionner une langue redirige vers l'URL localisée correspondante.
// Les libellés et hrefs sont calculés côté Astro et passés en props.
export function LanguageSelect({
  options,
  current,
  ariaLabel,
  className,
}: Props): React.JSX.Element {
  const [value, setValue] = useState<string>(current)

  // `items` permet à <SelectValue /> d'afficher le libellé (FR/EN)
  // du code sélectionné au lieu de la valeur brute.
  const items = Object.fromEntries(
    options.map((option) => [option.value, option.label])
  )

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => {
        const code = next as string
        const target = options.find((option) => option.value === code)

        if (!target) return

        setValue(code)
        window.location.href = target.href
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel}
        className={cn("text-foreground", className)}
      >
        <LanguagesIcon className="text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="dark">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
