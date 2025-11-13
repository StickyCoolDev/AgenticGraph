export enum LLMProviders {
  Google = "google",
}

export enum GoogleAIModels {
  Gemini2_5FlashLite = "gemini-2.5-flash-lite",
  Gemini2_5Flash = "gemini-2.5-flash",
  Gemini2_5Pro = "gemini-2.5-pro",
}

export function CreateSimplePromopt(
  agent_name: string,
  agent_type: string,
  agent_specialty: string,
  agent_tools: string[],
) {
  return `You are a highly sophisticated ${agent_type} agent specializing in **${agent_specialty}**. Your name is ${agent_name}. Your core objective is to help the user complete their goal or provide them info. You must always ensure all information is correct and concise.You have this tools to complete tasks : ${agent_tools}
`;
}
