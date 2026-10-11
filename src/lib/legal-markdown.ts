import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Liest einen Rechtstext aus `legal/*.md`.
 *
 * Die Kalia-Texte kommen fertig formuliert aus dem App-Projekt und sollen Wort
 * für Wort so erscheinen — deshalb kein Nachbau in JSX, sondern ein kleiner
 * Parser für genau die Teilmenge, die die Dateien nutzen: Überschriften
 * (`#` bis `###`), Absätze, Listen mit `- `, `**fett**` und `[Links](url)`.
 * Zeilen innerhalb eines Absatzes bleiben getrennt (Anschrift, Kontakt).
 * HTML-Kommentare sind Build-Notizen und werden entfernt.
 *
 * Läuft nur zur Build-Zeit: die Seiten werden statisch vorgerendert.
 */

export type LegalBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; lines: string[] }
  | { kind: "list"; items: string[] };

export type LegalDocument = {
  /** Text der `#`-Überschrift in der ersten Zeile. */
  title: string;
  blocks: LegalBlock[];
};

export function loadLegalDocument(file: string): LegalDocument {
  const source = readFileSync(path.join(process.cwd(), "legal", file), "utf8")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n?/g, "\n");

  let title: string | null = null;
  const blocks: LegalBlock[] = [];
  let paragraph: { kind: "paragraph"; lines: string[] } | null = null;
  let list: { kind: "list"; items: string[] } | null = null;

  for (const raw of source.split("\n")) {
    const line = raw.trim();

    if (!line) {
      paragraph = null;
      list = null;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      paragraph = null;
      list = null;
      const level = heading[1].length;
      if (level === 1) {
        if (title !== null) throw new Error(`${file}: mehr als eine „#“-Überschrift`);
        title = heading[2];
      } else {
        blocks.push({ kind: "heading", level: level as 2 | 3, text: heading[2] });
      }
      continue;
    }

    if (line.startsWith("- ")) {
      paragraph = null;
      if (!list) {
        list = { kind: "list", items: [] };
        blocks.push(list);
      }
      list.items.push(line.slice(2));
      continue;
    }

    list = null;
    if (!paragraph) {
      paragraph = { kind: "paragraph", lines: [] };
      blocks.push(paragraph);
    }
    paragraph.lines.push(line);
  }

  if (title === null) throw new Error(`${file}: „# Titel“ fehlt`);
  return { title, blocks };
}

/** Anker für eine Abschnittsüberschrift, z. B. „1. Who is responsible“ → `who-is-responsible`. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
