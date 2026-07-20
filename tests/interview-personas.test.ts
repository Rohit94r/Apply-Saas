import { describe, expect, it } from "vitest";
import {
  DEFAULT_PERSONA_ID,
  getInterviewPersona,
  INTERVIEW_PERSONAS,
  personasByGender
} from "@/lib/ai/interview-personas";
import { addNaturalPauses } from "@/lib/ai/openai-tts";

describe("interview personas", () => {
  it("has two male and two female interviewers", () => {
    expect(personasByGender("male")).toHaveLength(2);
    expect(personasByGender("female")).toHaveLength(2);
    expect(INTERVIEW_PERSONAS.every((p) => p.avatarSrc.startsWith("/"))).toBe(
      true
    );
  });

  it("resolves persona by id and openai voice alias", () => {
    expect(getInterviewPersona("james").openaiVoice).toBe("onyx");
    expect(getInterviewPersona("nova").name).toBe("Sarah");
    expect(getInterviewPersona(undefined).id).toBe(DEFAULT_PERSONA_ID);
  });

  it("adds natural pauses for conversational TTS", () => {
    const out = addNaturalPauses("Tell me about yourself. What would you do?");
    expect(out).toContain("Tell me... tell me about");
    expect(out).toContain("Hmm, what would you");
    expect(out).toContain("?...");
  });
});
