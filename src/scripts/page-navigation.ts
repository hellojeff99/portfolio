export const initializePageNavigation = (root: HTMLElement) => {
  if (root.dataset.navigationInitialized === "true") return;
  root.dataset.navigationInitialized = "true";

  const header = root.querySelector<HTMLElement>("[data-site-header]");
  const menu = root.querySelector<HTMLElement>("[data-mobile-menu]");
  const menuToggle =
    root.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const backdrop = root.querySelector<HTMLElement>("[data-menu-backdrop]");
  const menuIcon = root.querySelector<SVGElement>("[data-menu-icon]");
  const closeIcon = root.querySelector<SVGElement>("[data-close-icon]");
  const desktopSidebar = root.querySelector<HTMLElement>(
    "[data-desktop-sidebar]",
  );
  const contentLayout = root.querySelector<HTMLElement>(
    "[data-content-layout]",
  );
  const desktopMedia = matchMedia("(min-width: 768px)");
  const activeSectionRatio = Number(root.dataset.activeSectionRatio ?? "0.34");
  const activeSectionFallback = root.dataset.activeSectionFallback;
  let desktopSidebarOpen = root.dataset.initialSidebarOpen === "true";

  const updateMenuToggle = (open: boolean, label: string) => {
    if (!menuToggle) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", label);
    menuIcon?.classList.toggle("hidden", open);
    closeIcon?.classList.toggle("hidden", !open);
  };

  const setMenuOpen = (open: boolean, updateToggle = true) => {
    if (!header || !menu || !menuToggle) return;
    header.dataset.menuOpen = String(open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("hidden", !open);
    backdrop?.setAttribute("aria-hidden", String(!open));
    backdrop?.classList.toggle("hidden", !open);
    contentLayout?.toggleAttribute("inert", open);
    if (open) contentLayout?.setAttribute("aria-hidden", "true");
    else contentLayout?.removeAttribute("aria-hidden");
    document.body.classList.toggle("overflow-hidden", open);
    if (updateToggle) {
      updateMenuToggle(open, open ? "메뉴 닫기" : "메뉴 열기");
    }
    if (open) {
      requestAnimationFrame(() =>
        menu
          .querySelector<HTMLElement>("a[href], button:not([disabled])")
          ?.focus(),
      );
    }
  };

  const getMenuFocusables = () => {
    if (!menu || !menuToggle) return [];
    return [
      menuToggle,
      ...menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.getClientRects().length > 0);
  };

  const setDesktopSidebarOpen = (open: boolean) => {
    desktopSidebarOpen = open;
    if (desktopSidebar) {
      desktopSidebar.setAttribute("aria-hidden", String(!open));
      desktopSidebar.toggleAttribute("inert", !open);
      desktopSidebar.style.opacity = open ? "" : "0";
      desktopSidebar.style.pointerEvents = open ? "" : "none";
      desktopSidebar.style.transform = open ? "" : "translateX(-0.75rem)";
    }
    if (contentLayout) {
      contentLayout.dataset.sidebarOpen = String(open);
      contentLayout.style.gridTemplateColumns = open
        ? ""
        : "0rem minmax(0, 1fr)";
      contentLayout.style.columnGap = open ? "" : "0rem";
    }
    updateMenuToggle(open, open ? "사이드바 닫기" : "사이드바 열기");
  };

  menuToggle?.addEventListener("click", () => {
    if (desktopMedia.matches) {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    } else {
      const open = header?.dataset.menuOpen !== "true";
      setMenuOpen(open);
      if (!open) menuToggle.focus();
    }
  });
  backdrop?.addEventListener("click", () => {
    setMenuOpen(false);
    menuToggle?.focus();
  });
  menu
    ?.querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () => setMenuOpen(false)),
    );
  document.addEventListener("keydown", (event) => {
    if (desktopMedia.matches || header?.dataset.menuOpen !== "true") return;
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuToggle?.focus();
      return;
    }
    if (event.key === "Tab") {
      const focusables = getMenuFocusables();
      if (focusables.length === 0) return;
      const activeIndex = focusables.indexOf(
        document.activeElement as HTMLElement,
      );
      const nextIndex = event.shiftKey
        ? (activeIndex <= 0 ? focusables.length : activeIndex) - 1
        : (activeIndex + 1) % focusables.length;
      event.preventDefault();
      focusables[nextIndex]?.focus();
    }
  });
  desktopMedia.addEventListener("change", (event) => {
    setMenuOpen(false, !event.matches);
    if (event.matches) setDesktopSidebarOpen(desktopSidebarOpen);
  });

  if (desktopMedia.matches) setDesktopSidebarOpen(desktopSidebarOpen);
  else setMenuOpen(false);

  const sections = [
    ...root.querySelectorAll<HTMLElement>("[data-nav-section]"),
  ];
  const navLinks = [
    ...root.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
  ];
  let ticking = false;

  const updateActiveSection = () => {
    const marker = window.scrollY + window.innerHeight * activeSectionRatio;
    let activeId = activeSectionFallback === "first" ? sections[0]?.id : "";
    for (const section of sections) {
      if (section.offsetTop <= marker) activeId = section.id;
    }
    navLinks.forEach((link) => {
      const isActive = link.hash === `#${activeId}`;
      const inactiveColor = link.closest("[data-mobile-menu]")
        ? "text-slate-600"
        : "text-slate-700";
      link.classList.toggle("bg-blue-50", isActive);
      link.classList.toggle("text-blue-600", isActive);
      link.classList.toggle(inactiveColor, !isActive);
      const indicator = link.querySelector<HTMLElement>("[data-nav-indicator]");
      indicator?.classList.toggle("bg-transparent", !isActive);
      indicator?.classList.toggle("bg-blue-600", isActive);
      const index = link.querySelector<HTMLElement>("[data-nav-index]");
      index?.classList.toggle("text-slate-500", !isActive);
      index?.classList.toggle("text-blue-600", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();
};
