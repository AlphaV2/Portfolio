import { useEffect, useRef, useState } from 'react';

type ActivityLog = {
  id: number;
  time: string;
  kind: string;
  label: string;
  section?: string;
  component?: string;
 status?: string;
};

const HEAT_COLS = 18;
const HEAT_ROWS = 4;

function formatClock(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createEmptyHeatMap() {
  return Array.from(
    { length: HEAT_COLS * HEAT_ROWS },
    () => 0
  );
}

function capitalize(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

function formatLabel(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function getHeatColor(value: number) {
  if (value >= 0.95)
    return 'rgba(255,255,255,0.98)';

  if (value >= 0.72)
    return 'rgba(125,180,255,0.92)';

  if (value >= 0.42)
    return 'rgba(59,130,246,0.72)';

  if (value >= 0.18)
    return 'rgba(37,99,235,0.34)';

  return 'rgba(255,255,255,0.045)';
}

export default function AmbientCanvas() {
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  });

  const [dimensions, setDimensions] =
    useState({
      width: 300,
      height: 600,
    });

  const [activeSection, setActiveSection] =
    useState('About');

  const [lastStatus, setLastStatus] =
    useState('standby');

  const [logs, setLogs] = useState<
    ActivityLog[]
  >([]);

  const [heatMap, setHeatMap] = useState(
    createEmptyHeatMap()
  );

  const [heatFocus, setHeatFocus] =
    useState<number | null>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const terminalRef =
    useRef<HTMLDivElement>(null);

  const logIdRef = useRef(0);

  const safeCoords = {
    x: Number.isFinite(coords.x)
      ? coords.x
      : 0,

    y: Number.isFinite(coords.y)
      ? coords.y
      : 0,
  };

  const pushLog = (
    entry: Omit<ActivityLog, 'id' | 'time'>
  ) => {
    logIdRef.current += 1;

    const nextEntry: ActivityLog = {
      id: logIdRef.current,
      time: formatClock(),
      ...entry,
    };

    setLogs((current) =>
      [...current, nextEntry].slice(-16)
    );

    if (entry.section) {
      setActiveSection(entry.section);
    }

    if (entry.status) {
      setLastStatus(entry.status);
    }
  };

  useEffect(() => {
    pushLog({
      kind: 'boot',
      label: 'kernel online: portfolio ambient console initialized',
      section: 'system',
      component: 'tty0',
      status: 'ok',
    });

    pushLog({
      kind: 'boot',
      label: 'display server linked: awaiting pointer events',
      section: 'system',
      component: 'x11',
      status: 'ready',
    });
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      if (containerRef.current) {
        const rect =
          containerRef.current.getBoundingClientRect();

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (centerX > 0 && centerY > 0) {
          const x =
            ((event.clientX -
              rect.left -
              centerX) /
              centerX) *
            36;

          const y =
            ((event.clientY -
              rect.top -
              centerY) /
              centerY) *
            36;

          setCoords({ x, y });
        }
      }

      const width = window.innerWidth || 1;
      const height =
        window.innerHeight || 1;

      const column = Math.floor(
        clamp(
          event.clientX / width,
          0,
          0.9999
        ) * HEAT_COLS
      );

      const row = Math.floor(
        clamp(
          event.clientY / height,
          0,
          0.9999
        ) * HEAT_ROWS
      );

      const index =
        row * HEAT_COLS + column;

      setHeatFocus(index);

      setHeatMap((current) =>
        current.map((value, cellIndex) => {
          const cellRow = Math.floor(
            cellIndex / HEAT_COLS
          );

          const cellColumn =
            cellIndex % HEAT_COLS;

          const isFocus =
            cellRow === row &&
            cellColumn === column;

          const isNeighbor =
            (cellRow === row &&
              Math.abs(
                cellColumn - column
              ) === 1) ||
            (cellColumn === column &&
              Math.abs(cellRow - row) ===
                1);

          let target = 0;

          if (isFocus) {
            target = 1;
          } else if (isNeighbor) {
            target = 0.24;
          }

          const eased = value * 0.88;

          return Math.max(target, eased);
        })
      );
    };

    const handleResize = () => {
      if (!containerRef.current) return;

      setDimensions({
        width:
          containerRef.current.clientWidth,
        height:
          containerRef.current
            .clientHeight,
      });
    };

    const handlePortfolioActivity = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          kind?: string;
          label?: string;
          section?: string;
          component?: string;
          status?: string;
        }>;

      const detail = customEvent.detail;

      if (!detail) return;

      pushLog({
        kind: detail.kind ?? 'event',
        label:
          detail.label ??
          'portfolio activity',
        section: detail.section,
        component: detail.component,
        status: detail.status,
      });
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleResize
    );

    window.addEventListener(
      'portfolio-activity',
      handlePortfolioActivity as EventListener
    );

    handleResize();

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      window.removeEventListener(
        'portfolio-activity',
        handlePortfolioActivity as EventListener
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden xl:flex w-80 shrink-0 border-l border-white/10 bg-[#0B1117] flex-col p-7 h-screen sticky top-0 overflow-hidden text-emerald-200 isolate"
    >
      <div className="relative flex-none h-44 overflow-hidden my-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <svg
          className="absolute inset-0 z-10 h-full w-full overflow-hidden"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            className="transition-all duration-700 ease-out"
            style={{
              transform: `translate(${safeCoords.x * 0.12}px, ${safeCoords.y * 0.12}px)`,
            }}
          />

          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="rgba(78,139,255,0.35)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="transition-all duration-700 ease-out"
            style={{
              transform: `translate(${safeCoords.x * -0.08}px, ${safeCoords.y * -0.08}px)`,
            }}
          />

          <line
            x1="100"
            y1="100"
            x2={
              100 +
              safeCoords.x * 1.05
            }
            y2={
              100 +
              safeCoords.y * 1.05
            }
            stroke="#4E8BFF"
            strokeWidth="1.2"
            opacity="0.45"
          />

          <circle
            cx={
              100 +
              safeCoords.x * 1.05
            }
            cy={
              100 +
              safeCoords.y * 1.05
            }
            r="4"
            fill="#F97316"
          />

          <circle
            cx="132"
            cy="76"
            r="3"
            fill="#60A5FA"
            opacity="0.8"
            className="animate-pulse"
          />

          <circle
            cx="78"
            cy="126"
            r="2.5"
            fill="#34D399"
            opacity="0.6"
            className="animate-pulse"
          />

          <circle
            cx="100"
            cy="100"
            r="6"
            fill="#D8E6F7"
          />
        </svg>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-[0.72] flex-col rounded-xl border border-emerald-500/20 bg-[#030506] p-2 overflow-hidden shadow-[0_14px_28px_rgba(0,0,0,0.28)]">
          <div className="mb-1.5 flex items-center justify-between gap-2 shrink-0 border-b border-emerald-500/15 pb-1.5 text-emerald-400">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.26em]">
              <span className="text-emerald-300">root@portfolio</span>
              <span className="text-emerald-500/70">:~</span>
              <span className="text-emerald-200">/ambient</span>
            </div>

            <span className="rounded-sm border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-200">
              tty0
            </span>
          </div>

          <div
            ref={terminalRef}
            className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-0.5 font-mono text-[7px] leading-tight text-emerald-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="text-emerald-400/55">[  OK  ] mounting interactive session</div>

            {logs.length === 0 ? (
              <div className="text-emerald-200/35">[ wait ] waiting for pointer or page events</div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="space-y-0.5 overflow-hidden text-emerald-100/90"
                >
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 whitespace-normal break-words">
                    <span className="shrink-0 text-emerald-500/70">[{log.time}]</span>
                    <span className="shrink-0 text-emerald-300">{log.kind.toUpperCase()}</span>
                    <span className="min-w-0 break-words text-emerald-100">{log.label}</span>
                  </div>
                  <div className="pl-4 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-emerald-400/70">
                    <span>sec:{log.section ?? 'system'}</span>
                    <span>|</span>
                    <span>dev:{log.component ?? 'tty0'}</span>
                    <span>|</span>
                    <span>{log.status ?? 'ok'}</span>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center gap-2 text-emerald-300/75">
              <span>root@portfolio:~/ambient#</span>
              <span className="inline-block h-3 w-[1px] animate-pulse bg-emerald-300" />
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex flex-none min-h-0 flex-col rounded-xl border border-white/10 bg-[#050806]/92 p-2 overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
          <div className="mb-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.18em] text-emerald-400/60 shrink-0">
            <span>Heat Map</span>

            <span>{lastStatus}</span>
          </div>

          <div
            className="relative grid w-full gap-[3px] overflow-hidden rounded-xl border border-white/6 bg-[#0A1016] p-2"
            style={{
              aspectRatio: `${HEAT_COLS} / ${HEAT_ROWS}`,
              gridTemplateColumns: `repeat(${HEAT_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${HEAT_ROWS}, minmax(0, 1fr))`,
              minHeight: '82px',
            }}
            onMouseLeave={() =>
              setHeatFocus(null)
            }
          >
            <div className="absolute inset-0 opacity-35 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:11px_11px]" />

            {heatMap.map((cell, index) => {
              const focused =
                heatFocus === index;

              return (
                <span
                  key={index}
                  className="relative block aspect-square rounded-[4px] border border-white/[0.04] transition-all duration-200 ease-out"
                  style={{
                    backgroundColor:
                      getHeatColor(cell),

                    transform: focused
                      ? 'scale(1.08)'
                      : cell > 0
                      ? 'scale(1.02)'
                      : 'scale(1)',

                    boxShadow: focused
                      ? '0 0 14px rgba(96,165,250,0.42)'
                      : cell >= 0.24
                      ? '0 0 8px rgba(59,130,246,0.14)'
                      : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-1 border-t border-emerald-400/15 pt-2 font-mono text-[9px] text-emerald-400/55 shrink-0">
        <div className="flex justify-between gap-3">
          <span>VECTOR DELTA</span>

          <span className="font-medium text-emerald-100/85">
            X:{' '}
            {safeCoords.x.toFixed(1)} /
            Y:{' '}
            {safeCoords.y.toFixed(1)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span>ACTIVE SECTION</span>

          <span className="font-medium text-emerald-100/85">
            {activeSection}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span>PORTFOLIO FRAME</span>

          <span className="font-medium text-emerald-100/85">
            {dimensions.width}x
            {dimensions.height}px
          </span>
        </div>
      </div>
    </div>
  );
}