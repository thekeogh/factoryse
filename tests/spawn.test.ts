import { beforeEach, describe, expect, it } from "vitest";

import { Factory } from "@src/Factory";
import { spawn } from "@src/spawn";

it("Spawns one Factory instance", () => {
  expect(spawn(1, f => ({ name: f.person.fullName() }))).toHaveLength(1);
});
it("Spawns multiple Factory instances", () => {
  expect(spawn(5, f => ({ name: f.person.fullName() }))).toHaveLength(5);
});
it("All spawns are an instance of Factory", () => {
  expect(spawn(5, f => ({ name: f.person.fullName() }))[0]).toBeInstanceOf(Factory);
});
it("Spawns multiple Factory instances with varying data", () => {
  const count = 5;
  const factories = spawn(count, f => ({ id: f.string.uuid() }));
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      expect(factories[i].get().id).not.toBe(factories[j].get().id);
    }
  }
});
