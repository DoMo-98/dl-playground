import type { LessonStatus } from '../../types/learning'

const statusTone: Record<LessonStatus, string> = {
  ready: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  planned: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
}

export type LessonCardBodyProps = {
  title: string
  summary: string
  estimatedMinutes: number
  status: LessonStatus
  statusLabel: string
  objectiveCount: number
  objectiveLabel: string
  minutesLabel: string
}

export function LessonCardBody({
  title,
  summary,
  estimatedMinutes,
  status,
  statusLabel,
  objectiveCount,
  objectiveLabel,
  minutesLabel,
}: LessonCardBodyProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-white">{title}</span>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${statusTone[status]}`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="max-w-md text-sm leading-6 text-slate-400">{summary}</p>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-slate-500">
        <span>{estimatedMinutes} {minutesLabel}</span>
        <span>{objectiveCount} {objectiveLabel}</span>
      </div>
    </div>
  )
}
