export const COURSE_OPTIONS = ["React", "Next.js", "Angular", "Node.js"] as const;

export const EXPERIENCE_OPTIONS = ["Fresher", "1 Year", "2 Years", "3+ Years"] as const;

export const STATUS_OPTIONS = ["Active", "Completed", "Inactive"] as const;

export const SCORE_RANGES = [
  { label: "0 - 50", min: 0, max: 50 },
  { label: "51 - 75", min: 51, max: 75 },
  { label: "76 - 100", min: 76, max: 100 },
] as const;