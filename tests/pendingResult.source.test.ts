import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const read = (path: string) =>
    readFileSync(new URL(path, import.meta.url), "utf8");

const sidebarSource = read("../src/components/QuestionSidebar.tsx");
const resultCardSources = [
    "radius",
    "thermometer",
    "tentacles",
    "matching",
    "measuring",
].map((name) => read(`../src/components/cards/${name}.tsx`));

describe("pending seeker result editing", () => {
    it("keeps question definitions locked while enabling geographic result controls", () => {
        expect(sidebarSource).toContain("canEditPendingQuestionResult");
        expect(sidebarSource).toContain("resultEditable");
        for (const source of resultCardSources) {
            expect(source).toContain("resultEditable");
        }
    });
});
