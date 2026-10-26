export const STAGES = [
  'discovered',
  'reviewing',
  'ready',
  'applied',
  'interview',
  'offer',
  'rejected',
  'archived',
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  discovered: 'Discovered',
  reviewing: 'Reviewing',
  ready: 'Ready to Apply',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
  archived: 'Archived',
};

export const PRIORITIES = ['high', 'maybe', 'none'] as const;
export type Priority = (typeof PRIORITIES)[number];
export const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'High',
  maybe: 'Maybe',
  none: 'Unsorted',
};

export const WORK_ARRANGEMENTS = ['Remote', 'Hybrid', 'On-site'] as const;
export const CONTRACT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance'] as const;

export const DEFAULT_CHECKLIST = [
  'Verify that the job posting is still open',
  'Review the full job description',
  'Identify employer-specific application instructions',
  'Prepare the requested subject line',
  'Draft a tailored cover letter or application message',
  'Verify that résumé and portfolio links are correct',
  'Open the employer’s original application page',
  'Mark as submitted after I confirm it',
];

export interface Analysis {
  summary: string;
  matched_skills: string[];
  missing_skills: string[];
  concerns: string[];
  fit_score: number;
  fit_explanation: string;
  next_steps: string[];
}
