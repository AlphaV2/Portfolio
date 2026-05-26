import { useState } from 'react';
import { ToggleLeft, ToggleRight, Play, RefreshCw, Shield, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface PolicySetting {
  id: string;
  name: string;
  desc: string;
  active: boolean;
  limitValue: string;
}

interface LogEntry {
  timestamp: string;
  actor: string;
  action: string;
  status: 'READY' | 'REVIEW' | 'BLOCKED';
  note: string | null;
}

export default function ProjectSandbox() {
  const [policies, setPolicies] = useState<PolicySetting[]>([
    { id: 'speed', name: 'Page Speed Checks', desc: 'Keeps heavy assets and layout shifts under control.', active: true, limitValue: 'Fast load' },
    { id: 'forms', name: 'Form Validation', desc: 'Makes sure inputs are complete before sending a lead.', active: true, limitValue: 'Required fields' },
    { id: 'deploy', name: 'Deployment Review', desc: 'Flags missing checks before a release goes live.', active: false, limitValue: 'Staging first' },
    { id: 'ux', name: 'UX Guardrails', desc: 'Protects readability, spacing, and mobile fit.', active: true, limitValue: 'Readable UI' }
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '04:31:02', actor: 'Client Request', action: 'Open project inquiry', status: 'READY', note: 'WhatsApp message prepared' },
    { timestamp: '04:31:15', actor: 'Portfolio View', action: 'Inspect services and contact info', status: 'READY', note: 'Clear handoff path' }
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const togglePolicy = (id: string) => {
    setPolicies(policies.map((policy) => (policy.id === id ? { ...policy, active: !policy.active } : policy)));
  };

  const runSimulation = (scenario: 'safe' | 'needs-review' | 'blocked') => {
    setIsSimulating(true);

    setTimeout(() => {
      const timestamp = new Date().toTimeString().split(' ')[0];
      let newLog: LogEntry;

      if (scenario === 'safe') {
        newLog = {
          timestamp,
          actor: 'WhatsApp Lead',
          action: 'Send a short project note',
          status: 'READY',
          note: 'Direct contact link opens'
        };
      } else if (scenario === 'needs-review') {
        newLog = {
          timestamp,
          actor: 'Website Refresh',
          action: 'Improve copy and colors',
          status: 'REVIEW',
          note: 'Confirm brand palette and scope'
        };
      } else {
        newLog = {
          timestamp,
          actor: 'Release Draft',
          action: 'Ship with missing validation',
          status: 'BLOCKED',
          note: 'Needs form and deploy checks'
        };
      }

      setLogs((previousLogs) => [newLog, ...previousLogs].slice(0, 5));
      setIsSimulating(false);
    }, 700);
  };

  const clearSandboxLogs = () => {
    setLogs([]);
  };

  return (
    <div id="project-lab" className="border border-white/10 bg-[#0F1720] p-6 my-6 rounded-[28px] text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-300" />
          <h4 className="font-display font-semibold text-white text-base">
            Project Delivery Lab
          </h4>
        </div>
        <span className="font-mono text-[10px] uppercase bg-white/5 px-2 py-1 text-white/60 border border-white/10 rounded-full">
          Visual checks
        </span>
      </div>

      <p className="text-xs text-white/68 mb-6 leading-relaxed">
        This panel shows a few practical safeguards for a portfolio or client website: speed, forms, launch review, and readability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 flex flex-col gap-4">
          <h5 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
            Delivery checklist
          </h5>
          <div className="flex flex-col gap-2.5">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className={`flex items-start justify-between p-3 border rounded-2xl transition-colors group ${
                  policy.active ? 'border-sky-400/30 bg-sky-400/[0.04]' : 'border-white/10 bg-transparent'
                }`}
              >
                <div className="flex flex-col gap-1 pr-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${policy.active ? 'bg-emerald-300' : 'bg-white/35'}`} />
                    <span className="font-sans text-xs font-semibold text-white">
                      {policy.name}
                    </span>
                    <span className="font-mono text-[9px] bg-white/5 px-1.5 py-0.5 border border-white/10 text-white/55 rounded-full">
                      {policy.limitValue}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/62 leading-normal">
                    {policy.desc}
                  </span>
                </div>
                <button
                  id={`toggle-policy-${policy.id}`}
                  onClick={() => togglePolicy(policy.id)}
                  className="text-white/55 hover:text-sky-300 transition-colors pt-0.5"
                >
                  {policy.active ? (
                    <ToggleRight className="w-6 h-6 text-sky-300" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-white/45" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col gap-4">
          <h5 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
            Simulate a lead flow
          </h5>
          <div className="flex flex-wrap gap-2">
            <button
              id="btn-trigger-safe"
              onClick={() => runSimulation('safe')}
              disabled={isSimulating}
              className="flex-1 min-w-[120px] font-mono text-[10px] uppercase tracking-[0.18em] border border-white/10 hover:border-emerald-300/40 bg-white/5 hover:bg-emerald-400/10 p-2.5 text-white/70 hover:text-white transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5 rounded-2xl"
            >
              <Play className="w-3 h-3" /> WhatsApp Lead
            </button>
            <button
              id="btn-trigger-dangerous"
              onClick={() => runSimulation('needs-review')}
              disabled={isSimulating}
              className="flex-1 min-w-[120px] font-mono text-[10px] uppercase tracking-[0.18em] border border-white/10 hover:border-sky-300/40 bg-white/5 hover:bg-sky-400/10 p-2.5 text-white/70 hover:text-white transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5 rounded-2xl"
            >
              <AlertTriangle className="w-3 h-3" /> Needs Review
            </button>
            <button
              id="btn-trigger-costly"
              onClick={() => runSimulation('blocked')}
              disabled={isSimulating}
              className="flex-1 min-w-[120px] font-mono text-[10px] uppercase tracking-[0.18em] border border-white/10 hover:border-orange-300/40 bg-white/5 hover:bg-orange-400/10 p-2.5 text-white/70 hover:text-white transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5 rounded-2xl"
            >
              <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} /> Block Launch
            </button>
          </div>

          <div className="flex-1 border border-white/10 bg-[#0D141B] p-4 flex flex-col gap-3 min-h-[220px] rounded-[24px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] uppercase font-bold tracking-[0.22em] text-white">
                Delivery log
              </span>
              <button
                id="btn-clear-logs"
                onClick={clearSandboxLogs}
                className="font-mono text-[9px] text-white/55 hover:text-sky-300 transition-colors"
              >
                CLEAR
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[180px] pr-1">
              {logs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <HelpCircle className="w-8 h-8 text-white/20 mb-1.5" />
                  <span className="font-mono text-[10px] text-white/55">
                    Waiting for a project trigger...
                  </span>
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-white/8 pb-2.5 last:border-0 last:pb-0 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-white/45">
                          [{log.timestamp}]
                        </span>
                        <span className="font-sans font-semibold text-white">
                          {log.actor}
                        </span>
                      </div>
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        log.status === 'READY'
                          ? 'bg-emerald-400/10 text-emerald-300'
                          : log.status === 'REVIEW'
                            ? 'bg-sky-400/10 text-sky-300'
                            : 'bg-orange-400/10 text-orange-300'
                      }`}>
                        {log.status === 'READY' ? 'READY' : log.status === 'REVIEW' ? 'REVIEW' : 'BLOCKED'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pl-2 border-l border-white/10 text-white/66">
                      <span>{log.action}</span>
                      <span className="font-mono text-[10px]">Status set</span>
                    </div>
                    {log.note && (
                      <div className="text-[10px] text-white/55 pl-2 font-mono flex items-center gap-1 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-emerald-300 shrink-0" />
                        <span>{log.note}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
