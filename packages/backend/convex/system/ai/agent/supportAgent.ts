// import { deepseek } from "@ai-sdk/deepseek";
// import { Agent } from "@convex-dev/agent";
// import { components } from "../../../_generated/api";

// export const supportAgent = new Agent(components.agent, {
//   chat: deepseek.chat("deepseek-chat"),
//   instructions: "You are a customer support agent",
// });

// don't touch this

import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { google } from "@ai-sdk/google";

export const supportAgent = new Agent(components.agent, {
  chat: google("gemini-2.5-flash"),
  instructions: "You are a customer support agent",
});
