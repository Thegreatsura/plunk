import {motion, useReducedMotion} from 'framer-motion';
import {Check, CornerDownLeft, Search} from 'lucide-react';
import React from 'react';

import type {ChangelogArtifact} from '../../content/changelog';
import {Chip, Surface} from '../home/Surface';
import {InboundMessage} from '../home/InboundMessage';

/**
 * Miniatures for the changelog.
 *
 * Same rule as the homepage artifacts: each one is a small replica of the
 * surface the feature actually lives on (the preference page, the terminal,
 * the segment editor), never a diagram about it. They are deliberately a size
 * down from the feature-page artifacts, because here they sit beside a
 * paragraph in a long list and have to be read in a glance, not studied.
 *
 * Every artifact plays one short reveal in the order the real thing happens.
 * Reduced motion collapses all of it to an instant fade via `beat`.
 */

const EASE = [0.23, 1, 0.32, 1] as const;

/** One step in an artifact's reveal. `i` is its slot on a ~0.35s grid. */
function useBeat() {
  const still = useReducedMotion();
  return (i: number, from: {x?: number; y?: number} = {y: 4}) => ({
    initial: still ? {opacity: 0} : {opacity: 0, ...from},
    whileInView: still ? {opacity: 1} : {opacity: 1, x: 0, y: 0},
    viewport: {once: true, margin: '-10%'} as const,
    transition: {duration: 0.4, delay: still ? 0 : 0.15 + i * 0.35, ease: EASE},
  });
}

/* ------------------------------------------------------------------------- */

function Snooze() {
  const beat = useBeat();
  const still = useReducedMotion();
  const options = ['2 weeks', '1 month', '6 months', '1 year'];
  const chosen = 1;

  return (
    <Surface label={'manage preferences'} meta={<span>loopstudio.io</span>} bodyClassName={'p-5'}>
      <motion.div {...beat(0)} className={'flex items-baseline justify-between gap-4'}>
        <p className={'font-display font-semibold tracking-[-0.01em] text-neutral-900'}>How long should we pause your emails?</p>
        <span className={'flex-shrink-0 text-ui text-neutral-500'}>Cancel</span>
      </motion.div>
      <div className={'mt-4 grid grid-cols-2 gap-2'}>
        {options.map((option, i) => (
          <motion.span
            key={option}
            {...beat(0.5 + i * 0.15)}
            className={'relative overflow-hidden rounded-lg border border-neutral-200 px-3 py-2 text-ui text-neutral-700'}
          >
            {option}
            {i === chosen && (
              <motion.span
                aria-hidden
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.3, delay: still ? 0 : 1.6, ease: EASE}}
                className={'absolute inset-0 bg-neutral-900 px-3 py-2 text-white'}
              >
                {option}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
      {/* The picker has no confirm button: choosing a duration snoozes. The
          status line is the real one the preference page shows afterwards. */}
      <motion.p {...beat(4.6)} className={'mt-4 border-t border-neutral-100 pt-4 text-ui text-neutral-600'}>
        Snoozed until October 11, 2026
      </motion.p>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Mcp() {
  const beat = useBeat();
  return (
    <Surface tone={'dark'} chrome label={'terminal'}>
      {/* Lines wrap like a real terminal instead of scrolling, so the
          command is never clipped in a narrow column. */}
      <div className={'p-5 font-code text-[0.75rem] leading-relaxed'}>
        <motion.p {...beat(0)} className={'whitespace-pre-wrap [overflow-wrap:anywhere] text-neutral-100'}>
          <span className={'text-neutral-600'}>$ </span>claude mcp add plunk <span className={'whitespace-nowrap'}>-- npx</span>{' '}
          <span className={'whitespace-nowrap'}>-y @plunk/mcp</span>
        </motion.p>
        <motion.p {...beat(1)} className={'whitespace-pre-wrap [overflow-wrap:anywhere] text-neutral-500'}>
          Added stdio MCP server plunk
        </motion.p>
        <motion.p {...beat(2)} className={'mt-4 whitespace-pre-wrap [overflow-wrap:anywhere] text-neutral-100'}>
          <span className={'text-neutral-600'}>&rsaquo; </span>Unsubscribe ana@example.com
        </motion.p>
        <motion.div {...beat(3)} className={'mt-3'}>
          <p className={'whitespace-pre-wrap [overflow-wrap:anywhere] text-neutral-100'}>
            <span aria-hidden className={'text-neutral-500'}>
              &#9679;{' '}
            </span>
            plunk_unsubscribe_contact
            <span className={'text-neutral-500'}>(email: &quot;ana@example.com&quot;)</span>
          </p>
          <p className={'whitespace-pre-wrap [overflow-wrap:anywhere] pl-[1.35rem] text-neutral-500'}>
            <span aria-hidden>&#9495; </span>unsubscribed
          </p>
        </motion.div>
      </div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function LiquidEditor() {
  const beat = useBeat();
  const blocks = [
    {name: 'if', hint: '{% if %} … {% endif %}'},
    {name: 'case', hint: '{% case %} … {% when %}'},
    {name: 'for', hint: '{% for %} … {% else %}'},
  ];

  return (
    <Surface tone={'dark'} label={'template editor'} meta={<span>welcome</span>}>
      <div className={'relative p-5 font-code text-[0.75rem] leading-[1.9]'}>
        <motion.p {...beat(0)} className={'flex gap-4 whitespace-pre'}>
          <span className={'w-3 text-right text-neutral-600'}>1</span>
          <span className={'text-neutral-300'}>
            Hi <span className={'text-white'}>{'{{ contact.firstName | '}</span>
            <span className={'text-white underline decoration-red-400 decoration-wavy underline-offset-4'}>upcse</span>
            <span className={'text-white'}>{' }}'}</span>,
          </span>
        </motion.p>
        <motion.p {...beat(1)} className={'flex gap-4 whitespace-pre'}>
          <span className={'w-3'} />
          <span className={'text-red-400'}>undefined filter: upcse</span>
        </motion.p>
        <motion.p {...beat(2)} className={'mt-2 flex gap-4 whitespace-pre'}>
          <span className={'w-3 text-right text-neutral-600'}>2</span>
          <span className={'text-neutral-300'}>
            {'{%'}
            <span className={'ml-px inline-block h-3.5 w-px translate-y-0.5 bg-white'} />
          </span>
        </motion.p>

        <motion.ul
          {...beat(3, {y: -4})}
          className={'ml-10 mt-1 w-56 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 py-1'}
        >
          {blocks.map((block, i) => (
            <li
              key={block.name}
              className={`flex items-baseline justify-between gap-3 px-3 py-0.5 ${i === 0 ? 'bg-neutral-800' : ''}`}
            >
              <span className={i === 0 ? 'text-white' : 'text-neutral-300'}>{block.name}</span>
              <span className={'truncate text-[0.6875rem] text-neutral-500'}>{block.hint}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Liquid() {
  const beat = useBeat();
  const items = [
    {name: 'Linen shirt', qty: 2},
    {name: 'Canvas tote', qty: 1},
  ];

  return (
    <Surface label={'order-shipped'} meta={<Chip>liquid</Chip>}>
      <div className={'overflow-x-auto border-b border-neutral-200 bg-neutral-50 px-5 py-4 font-code text-[0.75rem] leading-[1.8]'}>
        <motion.p {...beat(0)} className={'whitespace-pre text-neutral-900'}>
          {'{% for item in order.items %}'}
        </motion.p>
        <motion.p {...beat(0.4)} className={'whitespace-pre text-neutral-500'}>
          {'  {{ item.name }} × {{ item.qty }}'}
        </motion.p>
        <motion.p {...beat(0.8)} className={'whitespace-pre text-neutral-900'}>
          {'{% endfor %}'}
        </motion.p>
      </div>
      <div className={'px-5 py-4'}>
        <motion.p {...beat(1.8)} className={'font-display font-semibold tracking-[-0.01em] text-neutral-900'}>
          Your order is on its way
        </motion.p>
        <ul className={'mt-2 divide-y divide-neutral-100'}>
          {items.map((item, i) => (
            <motion.li
              key={item.name}
              {...beat(2.4 + i * 0.4)}
              className={'flex items-baseline justify-between py-1.5 text-ui text-neutral-700'}
            >
              {item.name}
              <span className={'font-code text-label text-neutral-500'}>× {item.qty}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Checkbox({on}: {on: boolean}) {
  return (
    <span
      aria-hidden
      className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-[4px] border ${
        on ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 bg-white'
      }`}
    >
      {on && <Check className={'h-2.5 w-2.5'} strokeWidth={3} />}
    </span>
  );
}

function TableFilter() {
  const beat = useBeat();
  const rows = [
    {name: 'August newsletter', status: 'Sent', on: true},
    {name: 'Win-back, pro users', status: 'Sent', on: true},
    {name: 'Spring launch', status: 'Sent', on: false},
  ];

  return (
    <Surface label={'campaigns'}>
      <motion.div {...beat(0)} className={'flex items-center gap-2 border-b border-neutral-200 px-4 py-3'}>
        <span className={'flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-ui text-neutral-400'}>
          <Search className={'h-3.5 w-3.5 flex-shrink-0'} strokeWidth={1.75} />
          <span className={'truncate'}>Search campaigns</span>
        </span>
        <span className={'flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-2.5 py-1.5 text-ui text-neutral-700'}>
          Status
          <Chip>Sent</Chip>
        </span>
      </motion.div>
      <ul className={'divide-y divide-neutral-100'}>
        {rows.map((row, i) => (
          <motion.li key={row.name} {...beat(1 + i * 0.3)} className={'flex items-center gap-3 px-4 py-2.5'}>
            <Checkbox on={row.on} />
            <span className={'min-w-0 flex-1 truncate text-ui text-neutral-800'}>{row.name}</span>
            <span className={'font-code text-label text-neutral-500'}>{row.status}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        {...beat(2.4, {y: 6})}
        className={'flex items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50 px-4 py-2.5'}
      >
        <span className={'font-code text-label text-neutral-600'}>2 selected</span>
        <span className={'rounded-full border border-neutral-300 bg-white px-3 py-1 text-ui font-semibold text-neutral-900'}>
          Delete
        </span>
      </motion.div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Rule({field, operator, value}: {field: string; operator: string; value: string}) {
  return (
    <span className={'flex flex-wrap items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2.5'}>
      <span className={'text-ui text-neutral-800'}>{field}</span>
      <Chip>{operator}</Chip>
      <span className={'text-ui font-semibold text-neutral-900'}>{value}</span>
    </span>
  );
}

function SegmentFilter() {
  const beat = useBeat();
  return (
    <Surface label={'segment'} meta={<span>win-back</span>} bodyClassName={'bg-neutral-50 p-4'}>
      <motion.div {...beat(0)}>
        <Rule field={'Segment'} operator={'memberOfSegment'} value={'Pro customers'} />
      </motion.div>
      <motion.p {...beat(0.8)} className={'my-1.5 pl-3 font-code text-label text-neutral-500'}>
        and
      </motion.p>
      <motion.div {...beat(1.3)}>
        <Rule field={'session.started'} operator={'notTriggeredWithin'} value={'30 days'} />
      </motion.div>
      <motion.div {...beat(2.4)} className={'mt-4 flex items-baseline justify-between px-1'}>
        <span className={'text-ui text-neutral-500'}>Matching contacts</span>
        <span className={'font-display text-h3 font-bold tabular-nums tracking-[-0.02em] text-neutral-900'}>1,284</span>
      </motion.div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function CommandPalette() {
  const beat = useBeat();
  const groups = [
    {heading: 'Switch project', items: ['Loop Studio', 'Loop Studio (staging)']},
    {heading: 'Recent', items: ['Campaign: Loop weekly']},
  ];
  let slot = 1;

  return (
    <Surface label={'⌘K'} meta={<span>anywhere</span>}>
      <motion.div {...beat(0)} className={'flex items-center gap-2.5 border-b border-neutral-200 px-4 py-3'}>
        <Search className={'h-4 w-4 text-neutral-400'} strokeWidth={1.75} />
        <span className={'text-ui text-neutral-900'}>
          loop
          <span className={'ml-px inline-block h-3.5 w-px translate-y-0.5 bg-neutral-900'} />
        </span>
      </motion.div>
      <div className={'p-2'}>
        {groups.map(group => (
          <div key={group.heading} className={'pb-1'}>
            <motion.p {...beat(slot++)} className={'px-2.5 pb-1 pt-2 text-[0.6875rem] font-medium text-neutral-500'}>
              {group.heading}
            </motion.p>
            {group.items.map((item, i) => {
              const active = group.heading === 'Switch project' && i === 0;
              return (
                <motion.p
                  key={item}
                  {...beat(slot++ * 0.7)}
                  className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-ui ${
                    active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'
                  }`}
                >
                  {item}
                  {active && <CornerDownLeft className={'h-3.5 w-3.5 text-neutral-500'} strokeWidth={1.75} />}
                </motion.p>
              );
            })}
          </div>
        ))}
      </div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Onboarding() {
  const beat = useBeat();
  const steps = [
    {title: 'Verify your domain', done: true},
    {title: 'Fire your first event', done: true},
    {title: 'Create a template', done: false},
    {title: 'Build a workflow', done: false},
  ];

  return (
    <Surface label={'get started'} meta={<span>automations</span>}>
      <motion.div {...beat(0)} className={'flex gap-1.5 px-5 pt-5'}>
        {steps.map(step => (
          <span
            key={step.title}
            aria-hidden
            className={`h-1 flex-1 rounded-full ${step.done ? 'bg-neutral-900' : 'bg-neutral-200'}`}
          />
        ))}
      </motion.div>
      <ul className={'flex flex-col gap-1 p-3'}>
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            {...beat(0.8 + i * 0.35)}
            className={`flex items-center gap-3 rounded-lg px-2 py-2 ${i === 2 ? 'bg-neutral-50' : ''}`}
          >
            <span
              aria-hidden
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                step.done ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
              }`}
            >
              {step.done && <Check className={'h-3 w-3'} strokeWidth={3} />}
            </span>
            <span className={`flex-1 text-ui ${step.done ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>
              {step.title}
            </span>
            {i === 2 && <span className={'font-code text-label text-neutral-500'}>next</span>}
          </motion.li>
        ))}
      </ul>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Branches() {
  const still = useReducedMotion();
  const W = 420;
  const nodeW = 116;
  const nodeH = 38;
  const top = {x: (W - 180) / 2, y: 16, w: 180};
  const arms = [
    {answer: 'pro', label: 'Pro tips'},
    {answer: 'team', label: 'Invite team'},
    {answer: 'default', label: 'Welcome'},
  ].map((arm, i) => ({...arm, x: 14 + i * ((W - 28 - nodeW) / 2), y: 138}));
  const from = {x: W / 2, y: top.y + nodeH};
  const H = 138 + nodeH + 16;

  return (
    <Surface tone={'dark'} label={'workflow'} meta={<span>condition</span>}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={'h-auto w-full'}
        role="img"
        aria-label={'A condition on data.plan splitting into three branches: pro, team, and default.'}
      >
        <defs>
          <pattern id="cl-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#262626" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#cl-grid)" />

        {arms.map((arm, i) => {
          const to = {x: arm.x + nodeW / 2, y: arm.y};
          const midY = from.y + 34;
          const d =
            Math.abs(to.x - from.x) < 1
              ? `M ${from.x} ${from.y} V ${to.y}`
              : `M ${from.x} ${from.y} V ${midY - 10} Q ${from.x} ${midY} ${from.x + 10 * Math.sign(to.x - from.x)} ${midY} H ${to.x - 10 * Math.sign(to.x - from.x)} Q ${to.x} ${midY} ${to.x} ${midY + 10} V ${to.y}`;
          return (
            <motion.path
              key={arm.answer}
              d={d}
              fill="none"
              stroke="#525252"
              strokeWidth="1.25"
              initial={still ? {pathLength: 1, opacity: 0} : {pathLength: 0, opacity: 1}}
              whileInView={{pathLength: 1, opacity: 1}}
              viewport={{once: true, margin: '-10%'}}
              transition={{duration: 0.6, delay: still ? 0 : 0.5 + i * 0.15, ease: EASE}}
            />
          );
        })}

        <motion.g
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.4, delay: still ? 0 : 0.15, ease: EASE}}
        >
          <rect x={top.x} y={top.y} width={top.w} height={nodeH} rx="10" fill="#ffffff" />
          <circle cx={top.x + 17} cy={top.y + nodeH / 2} r="4" fill="none" stroke="#737373" strokeWidth="1.5" />
          <text x={top.x + 31} y={top.y + nodeH / 2} dominantBaseline="central" className={'font-code'} fontSize="12" fill="#171717">
            Condition
            <tspan fill="#737373" fontSize="10.5" dx="7">
              data.plan
            </tspan>
          </text>
        </motion.g>

        {arms.map((arm, i) => (
          <motion.g
            key={arm.answer}
            initial={still ? {opacity: 0} : {opacity: 0, y: 4}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.4, delay: still ? 0 : 1 + i * 0.15, ease: EASE}}
          >
            {/* Masks the connector behind the label so the line reads as
                passing under it rather than striking through it. */}
            <rect
              x={arm.x + nodeW / 2 - (arm.answer.length * 6.3 + 12) / 2}
              y={arm.y - 20}
              width={arm.answer.length * 6.3 + 12}
              height="16"
              fill="#0a0a0a"
            />
            <text x={arm.x + nodeW / 2} y={arm.y - 12} dominantBaseline="central" textAnchor="middle" className={'font-code'} fontSize="10.5" fill="#a3a3a3">
              {arm.answer}
            </text>
            <rect x={arm.x} y={arm.y} width={nodeW} height={nodeH} rx="10" fill="#1c1c1c" stroke="#404040" />
            <rect x={arm.x + 13} y={arm.y + nodeH / 2 - 3.5} width="7" height="7" rx="2" fill="#737373" />
            <text x={arm.x + 28} y={arm.y + nodeH / 2} dominantBaseline="central" className={'font-code'} fontSize="11.5" fill="#e5e5e5">
              {arm.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function InlineImage() {
  const beat = useBeat();
  return (
    <Surface label={'receipt'} meta={<Chip>cid:logo</Chip>}>
      <div className={'overflow-x-auto border-b border-neutral-200 bg-neutral-50 px-5 py-4 font-code text-[0.75rem] leading-[1.8]'}>
        <motion.p {...beat(0)} className={'whitespace-pre text-neutral-500'}>
          {'attachments: [{ '}
          <span className={'text-neutral-900'}>{'contentId: "logo"'}</span>
          {', … }]'}
        </motion.p>
        <motion.p {...beat(0.7)} className={'whitespace-pre text-neutral-500'}>
          {'<img src="'}
          <span className={'text-neutral-900'}>cid:logo</span>
          {'" />'}
        </motion.p>
      </div>
      <div className={'flex flex-col items-center px-5 py-6 text-center'}>
        <motion.span
          {...beat(1.8, {y: 8})}
          aria-hidden
          className={'flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 font-display text-lg font-extrabold text-white'}
        >
          L
        </motion.span>
        <motion.p {...beat(2.4)} className={'mt-3 font-display font-semibold tracking-[-0.01em] text-neutral-900'}>
          Thanks for your order
        </motion.p>
        <motion.p {...beat(2.7)} className={'text-ui text-neutral-500'}>
          Receipt #4021 from Loop Studio
        </motion.p>
      </div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Preview() {
  const beat = useBeat();
  return (
    <Surface label={'activity'} meta={<span>ana@example.com</span>}>
      <ul className={'divide-y divide-neutral-100'}>
        <motion.li {...beat(0)} className={'flex items-center gap-3 px-5 py-3'}>
          <Chip>email.opened</Chip>
          <span className={'min-w-0 flex-1 truncate text-ui text-neutral-700'}>Welcome to Loop</span>
          <span className={'font-code text-[0.6875rem] text-neutral-400'}>2m</span>
        </motion.li>
        <motion.li {...beat(0.5)} className={'flex items-center gap-3 bg-neutral-50 px-5 py-3'}>
          <Chip>email.delivered</Chip>
          <span className={'min-w-0 flex-1 truncate text-ui text-neutral-900'}>Welcome to Loop</span>
          <span className={'rounded-full border border-neutral-300 bg-white px-2.5 py-0.5 text-[0.75rem] font-semibold text-neutral-900'}>
            Preview
          </span>
        </motion.li>
      </ul>
      <motion.div
        {...beat(1.6, {y: 8})}
        className={'mx-5 mb-5 mt-1 overflow-hidden rounded-lg border border-neutral-200 shadow-[0_8px_24px_-12px_rgba(23,23,23,0.18)]'}
      >
        <div className={'border-b border-neutral-100 px-4 py-2.5'}>
          <p className={'text-ui font-semibold text-neutral-900'}>Welcome to Loop</p>
          <p className={'font-code text-[0.6875rem] text-neutral-500'}>hello@loopstudio.io</p>
        </div>
        <p className={'px-4 py-3 text-ui text-neutral-600'}>
          Hi Ana, your workspace is ready. Here are three things to try first.
        </p>
      </motion.div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

const LOCALES = ['en', 'fr', 'de', 'es', 'nl', 'it', 'pt', 'pl', 'cs', 'bg', 'sv', 'hi', 'ja', 'zh-CN', 'zh-TW', 'zh-HK'];

function Locales() {
  const beat = useBeat();
  return (
    <Surface label={'unsubscribe page'} meta={<Chip>locale: fr</Chip>}>
      <div className={'border-b border-neutral-200 px-5 py-5'}>
        <motion.p {...beat(0)} className={'font-display text-lg font-bold tracking-[-0.01em] text-neutral-900'}>
          Se désabonner
        </motion.p>
        <motion.p {...beat(0.4)} className={'mt-1 text-ui text-neutral-600'}>
          Ne plus recevoir les e-mails de Loop Studio à l&apos;adresse ana@example.com ?
        </motion.p>
        <motion.span
          {...beat(0.8)}
          className={'mt-3 inline-block rounded-full bg-neutral-900 px-3.5 py-1.5 text-ui font-semibold text-white'}
        >
          Se désabonner
        </motion.span>
      </div>
      <motion.div {...beat(1.6)} className={'flex flex-wrap gap-1.5 px-5 py-4'}>
        {LOCALES.map(locale => (
          <span
            key={locale}
            className={`rounded px-1.5 py-0.5 font-code text-[0.6875rem] ${
              locale === 'fr' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {locale}
          </span>
        ))}
      </motion.div>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

function Security() {
  const beat = useBeat();
  const metrics = [
    {label: 'Bounce rate, 7 days', value: '1.2%', limit: 'warns at 5%'},
    {label: 'Complaint rate, 7 days', value: '0.02%', limit: 'warns at 0.075%'},
  ];

  return (
    <Surface label={'security'} meta={<Chip>healthy</Chip>}>
      <ul className={'divide-y divide-neutral-100'}>
        {metrics.map((metric, i) => (
          <motion.li key={metric.label} {...beat(i * 0.6)} className={'flex items-center gap-4 px-5 py-4'}>
            <span className={'min-w-0 flex-1'}>
              <span className={'block text-ui text-neutral-700'}>{metric.label}</span>
              <span className={'font-code text-[0.6875rem] text-neutral-500'}>{metric.limit}</span>
            </span>
            <span className={'font-display text-h3 font-bold tabular-nums tracking-[-0.02em] text-neutral-900'}>
              {metric.value}
            </span>
            <span
              aria-label={'Within limits'}
              className={'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white'}
            >
              <Check className={'h-3 w-3'} strokeWidth={3} />
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.p {...beat(1.6)} className={'border-t border-neutral-200 bg-neutral-50 px-5 py-3 text-ui text-neutral-600'}>
        Warnings come well before the limits that disable a project.
      </motion.p>
    </Surface>
  );
}

/* ------------------------------------------------------------------------- */

const ARTIFACTS: Record<ChangelogArtifact, React.ComponentType> = {
  snooze: Snooze,
  mcp: Mcp,
  liquidEditor: LiquidEditor,
  liquid: Liquid,
  tableFilter: TableFilter,
  segmentFilter: SegmentFilter,
  commandPalette: CommandPalette,
  onboarding: Onboarding,
  branches: Branches,
  inbound: InboundMessage,
  inlineImage: InlineImage,
  preview: Preview,
  locales: Locales,
  security: Security,
};

export function ChangelogArtifactView({artifact}: {artifact: ChangelogArtifact}) {
  const Artifact = ARTIFACTS[artifact];
  return <Artifact />;
}
