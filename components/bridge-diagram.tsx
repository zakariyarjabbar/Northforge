'use client';
import { useLocale } from './locale-provider';
import { useState } from 'react';
const stages = [
  { name: 'Foundations', text: 'Marine foundations transfer structural loads into the ground, with the main supports set outside the navigation channel.' },
  { name: 'Pylons & cables', text: 'The pylons and stay cables share the work of supporting the deck, creating a balanced route for forces to reach the foundations.' },
  { name: 'Deck & approaches', text: 'Deck sections connect progressively. The approach roads bring the crossing into the surrounding transport network.' },
];
export function BridgeDiagram() {
  const { t } = useLocale();
  const [stage, setStage] = useState(2);
  return <section className="bridge-experience"><div><h2>{t("A connection,")}<br /> {t(" built in sequence.")}</h2><p>{t("Explore how the principal structural systems come together.")}</p></div><div className="bridge-diagram"><svg viewBox="0 0 800 270" role="img" aria-label={t("Bridge structural diagram showing {stage}", { stage: t(stages[stage].name) })}><path className="water-line" d="M0 218h800M0 235h800M0 252h800" /><path className="ground-line" d="M0 210h100l25 36h100l28-6h100l30 6h182l30-28h205" /><g className="diagram-foundation"><path d="M213 194v55h35v-55M552 194v55h35v-55" /><path d="M205 248h51M545 248h50" /></g><g className={stage >= 1 ? 'diagram-pylon on' : 'diagram-pylon'}><path d="M215 196 230 28l15 168M555 196l15-168 15 168" />{Array.from({ length: 7 }, (_, i) => <g key={i}><path d={`M230 ${42 + i*10} ${70 + i*20} 190M230 ${42+i*10} ${390-i*20} 190M570 ${42+i*10} ${410+i*20} 190M570 ${42+i*10} ${730-i*20} 190`} /></g>)}</g><g className={stage >= 2 ? 'diagram-deck on' : 'diagram-deck'}><path d="M18 190h764v9H18z" /><path d="M105 199v26M694 199v22" /></g><path className="dimension-line" d="M266 125h268m-261-5-7 5 7 5m254-10 7 5-7 5" /><text x="400" y="111" textAnchor="middle">{t("CLEAR NAVIGATION CHANNEL")}</text></svg><div className="stage-buttons" aria-label={t("Construction stages")}>{stages.map((s, i) => <button key={s.name} aria-pressed={stage === i} onClick={() => setStage(i)}><span>{i + 1}</span>{t(s.name)}</button>)}</div><p className="stage-explanation" aria-live="polite">{t(stages[stage].text)}</p></div></section>;
}
