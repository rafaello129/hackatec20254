import { useEffect, useMemo, useState } from "react";
import { getSupportPrograms, getSupportStatus } from "@/services/support-programs.service";
import type { SupportProgress } from "@/types/support-programs.types";

const storageKey = "peek-support-programs-demo-v1";
const programs = getSupportPrograms();
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function readProgress(): SupportProgress {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    const validIds = (value: unknown): string[] => Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && programs.some((p) => p.id === id)))] : [];
    return { saved: validIds(data?.saved), applications: validIds(data?.applications) };
  } catch {
    return { saved: [], applications: [] };
  }
}

export function useSupportPrograms() {
  const [progress, setProgress] = useState(readProgress);
  const [storageWarning, setStorageWarning] = useState(false);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [kind, setKind] = useState("");
  const [region, setRegion] = useState("");
  const [tab, setTab] = useState("all");
  const [openOnly, setOpenOnly] = useState(true);
  const [sort, setSort] = useState("deadline");

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); setStorageWarning(false); }
    catch { setStorageWarning(true); }
  }, [progress]);

  const filtered = useMemo(() => programs.filter((p) =>
    normalize(`${p.title} ${p.institution} ${p.description} ${p.sector}`).includes(normalize(query.trim())) &&
    (!source || p.source === source) && (!kind || p.kind === kind) &&
    (!region || p.region === region || p.region === "Nacional") &&
    (!openOnly || getSupportStatus(p.deadline) !== "Cerrada") &&
    (tab !== "saved" || progress.saved.includes(p.id)) &&
    (tab !== "applications" || progress.applications.includes(p.id)),
  ).sort((a, b) => sort === "name" ? a.title.localeCompare(b.title, "es") : (a.deadline ?? "9999").localeCompare(b.deadline ?? "9999")),
  [query, source, kind, region, openOnly, tab, sort, progress]);

  function toggleSaved(id: string) {
    setProgress((prev) => ({ ...prev, saved: prev.saved.includes(id) ? prev.saved.filter((item) => item !== id) : [...prev.saved, id] }));
  }
  function apply(id: string) {
    const program = programs.find((p) => p.id === id);
    if (!program || getSupportStatus(program.deadline) === "Cerrada") return;
    setProgress((prev) => ({ ...prev, applications: [...new Set([...prev.applications, id])] }));
  }
  function clearFilters() { setQuery(""); setSource(""); setKind(""); setRegion(""); setOpenOnly(true); }

  return { programs, filtered, progress, storageWarning, query, setQuery, source, setSource, kind, setKind, region, setRegion,
    tab, setTab, openOnly, setOpenOnly, sort, setSort, toggleSaved, apply, clearFilters };
}
