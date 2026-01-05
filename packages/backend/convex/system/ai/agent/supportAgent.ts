import { deepseek } from "@ai-sdk/deepseek";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";

export const supportAgent = new Agent(components.agent, {
  chat: deepseek.chat("deepseek-chat"),
  instructions: "You are a customer support agent",
});
