import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const serverSource = readFileSync(
    new URL("../server/src/app.ts", import.meta.url),
    "utf8",
);

describe("game-wide pending question invariant", () => {
    it("migrates from the per-seeker index to a game-wide partial unique index", () => {
        expect(serverSource).toContain(
            "DROP INDEX IF EXISTS one_pending_question_per_seeker",
        );
        expect(serverSource).toContain(
            "CREATE UNIQUE INDEX IF NOT EXISTS one_pending_question_per_game",
        );
        expect(serverSource).toContain(
            "ON questions(game_id) WHERE status = 'pending'",
        );
    });
});
