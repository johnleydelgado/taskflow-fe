import {
    lazy,
    Suspense,
    useEffect,
    useState,
    forwardRef,
    type ForwardedRef,
  } from "react";
  import type { LottieComponentProps } from "lottie-react";
  
  /* ------------------------------------------------------------------ */
  /*               1.  lazy‑load player + normalise export              */
  /* ------------------------------------------------------------------ */
  const LazyLottieCmp = lazy(() =>
    import("lottie-react").then((m) => ({
      default: (m as any).default ?? m, // handle CJS or ESM build
    }))
  );
  
  /* ------------------------------------------------------------------ */
  /*               2.  tiny Tailwind skeleton for fallback              */
  /* ------------------------------------------------------------------ */
  function Skeleton({
    width = 120,
    height = 120,
  }: {
    width?: number | string;
    height?: number | string;
  }) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="w-full h-full rounded-md bg-gray-700/60 animate-pulse" />
      </div>
    );
  }
  
  /* ------------------------------------------------------------------ */
  /*               3.  public component props & generics                */
  /* ------------------------------------------------------------------ */
  export interface LazyLottieProps<T extends Record<string, unknown>>
    extends Omit<LottieComponentProps, "animationData"> {
    /** async import()/fetch that resolves to raw JSON */
    getJson: () => Promise<T>;
    id: string;
  }
  
  /* ------------------------------------------------------------------ */
  /*               4.  forwardRef wrapper + JSON clone                  */
  /* ------------------------------------------------------------------ */
  export const LazyLottie = forwardRef(function LazyLottie<
    T extends Record<string, unknown>
  >(
    { getJson, id, ...props }: LazyLottieProps<T>,
    ref: ForwardedRef<any>
  ) {
    const [animationData, setAnimationData] = useState<T | null>(null);
  
    /* fetch + deep‑clone once on mount */
    useEffect(() => {
      let cancelled = false;
      getJson().then((raw) => {
        if (cancelled) return;
        // raw may be frozen (Vite/ESM JSON) ➜ clone to make it mutable
        const safe = typeof structuredClone === "function"
          ? structuredClone((raw as any).default ?? raw)
          : (JSON.parse(JSON.stringify((raw as any).default ?? raw)) as T);
  
        setAnimationData(safe);
      });
      return () => {
        cancelled = true;
      };
    }, [getJson]);
  
    /* single fallback used by Suspense + pre‑JSON state */
    const fallback = null
    if (!animationData) return fallback;
  
    return (
      <Suspense fallback={fallback}>
        <LazyLottieCmp
          animationData={animationData}
          /* pass all other props (loop, className, style, …) */
          {...props}
          /* forward player ref if caller needs control */
          lottieRef={ref as any}
        />
      </Suspense>
    );
  });
  