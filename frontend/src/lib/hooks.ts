"use client";

import { useCallback, useEffect, useState } from "react";

export interface AsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  reload: () => void;
}

/** Hook sederhana untuk loading / error / data state pada pemanggilan API. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(undefined);
    fn()
      .then((d) => active && setData(d))
      .catch((e: Error) => active && setError(e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { data, error, loading, reload };
}

/** Preferensi boolean yang disimpan di localStorage (mis. spoiler toggle). */
export function useLocalBoolean(key: string, initial: boolean): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) setValue(raw === "true");
  }, [key]);
  const update = useCallback(
    (v: boolean) => {
      setValue(v);
      window.localStorage.setItem(key, String(v));
    },
    [key],
  );
  return [value, update];
}
