import { ref, onMounted, onBeforeUnmount } from "vue";

export function useActiveSection(ids) {
  const active = ref("");
  let ticking = false;

  function update() {
    ticking = false;
    const line = window.innerHeight * 0.4;
    let current = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      current = ids[ids.length - 1];
    }
    active.value = current;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  onMounted(() => {
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  });

  return active;
}
