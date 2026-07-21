export const initializeProjectTextFlows = (root: HTMLElement) => {
  if (root.dataset.textFlowsInitialized === "true") return;
  root.dataset.textFlowsInitialized = "true";

  const textFlowDefinitions = JSON.parse(
    root.dataset.textFlowDefinitions ?? "[]",
  ) as string[];
  const blocks = [
    ...root.querySelectorAll<HTMLPreElement>('pre[data-language="plaintext"]'),
  ].filter((block) =>
    textFlowDefinitions.includes(block.textContent?.trim() ?? ""),
  );

  for (const block of blocks) {
    const definition = block.textContent?.trim();
    if (!definition) continue;

    const steps = definition.split(/\s*(?:→|->|=>)\s*/u).filter(Boolean);

    if (steps.length < 2) {
      block.classList.add("text-panel");
      continue;
    }

    const flow = document.createElement("figure");
    flow.className = "text-flow";
    flow.style.setProperty("--flow-step-count", String(steps.length));

    const list = document.createElement("ol");
    list.className = "text-flow__steps";

    for (const step of steps) {
      const item = document.createElement("li");
      const label = document.createElement("span");
      label.className = "text-flow__label";
      label.textContent = step;

      item.append(label);
      list.append(item);
    }

    flow.append(list);
    block.replaceWith(flow);
  }
};
