export const initializeProjectMermaid = (root: HTMLElement) => {
  if (root.dataset.mermaidInitialized === "true") return;

  const blocks = [
    ...root.querySelectorAll<HTMLElement>('pre[data-language="mermaid"]'),
  ];
  if (blocks.length === 0) return;

  root.dataset.mermaidInitialized = "true";
  let renderStarted = false;

  const renderMermaidDiagrams = async () => {
    if (renderStarted) return;
    renderStarted = true;

    const { default: mermaid } = await import("mermaid");

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: {
        background: "#ffffff",
        primaryColor: "#eff6ff",
        primaryTextColor: "#0f172a",
        primaryBorderColor: "#60a5fa",
        lineColor: "#64748b",
        secondaryColor: "#f8fafc",
        tertiaryColor: "#ffffff",
        fontFamily: "Pretendard, Inter, ui-sans-serif, system-ui, sans-serif",
      },
      flowchart: {
        curve: "basis",
        htmlLabels: true,
      },
    });

    await document.fonts.ready;

    for (const [index, block] of blocks.entries()) {
      const definition = block.textContent?.trim();
      if (!definition) continue;

      try {
        const { svg, bindFunctions } = await mermaid.render(
          `project-mermaid-${index}`,
          definition,
        );
        const diagram = document.createElement("figure");
        diagram.className = "mermaid-diagram";
        diagram.setAttribute("role", "img");
        diagram.setAttribute(
          "aria-label",
          `프로젝트 구조 다이어그램 ${index + 1}`,
        );
        diagram.innerHTML = svg;
        block.replaceWith(diagram);
        bindFunctions?.(diagram);
      } catch (error) {
        block.classList.add("mermaid-render-error");
        console.error("Mermaid diagram rendering failed.", error);
      }
    }
  };

  if ("IntersectionObserver" in window) {
    const diagramObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        diagramObserver.disconnect();
        void renderMermaidDiagrams();
      },
      { rootMargin: "600px 0px" },
    );
    blocks.forEach((block) => diagramObserver.observe(block));
  } else {
    void renderMermaidDiagrams();
  }
};
