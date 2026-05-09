export type LinkedInGrowthPlan = "basic" | "plus" | "pro";

const PLAN_NAME_TO_ID: Record<string, LinkedInGrowthPlan> = {
  "Basic Crash Course": "basic",
  "Pro Program": "plus",
  "Master Program": "pro",
};

const PLAN_PRIORITY: Record<LinkedInGrowthPlan, number> = {
  basic: 1,
  plus: 2,
  pro: 3,
};

const LINKEDIN_GROWTH_COURSE_NAMES = new Set([
  "Grow on LinkedIn",
  "LinkedIn Growth",
  "LinkedIn Decoded",
]);

type SupabaseAdminClient = {
  from: (table: string) => unknown;
};

type PaymentLookupColumn = "user_id" | "user_email";

type PaymentRow = {
  course_name: string | null;
  plan_name: string | null;
  status: string | null;
  upgrade_to: string | null;
};

type PaymentLookupResult = {
  data: PaymentRow[] | null;
  error: { message?: string } | null;
};

type PaymentTableQuery = {
  select: (columns: "course_name, plan_name, status, upgrade_to") => {
    eq: (column: PaymentLookupColumn, value: string) => PromiseLike<PaymentLookupResult>;
  };
};

export type PaymentLookup = (
  column: PaymentLookupColumn,
  value: string,
) => Promise<PaymentLookupResult>;

const toPlan = (planName: string | null, upgradeTo: string | null): LinkedInGrowthPlan | null => {
  if (planName && PLAN_NAME_TO_ID[planName]) {
    return PLAN_NAME_TO_ID[planName];
  }

  if (upgradeTo && upgradeTo in PLAN_PRIORITY) {
    return upgradeTo as LinkedInGrowthPlan;
  }

  return null;
};

export function canDownloadLinkedInGrowthNotes(plan: LinkedInGrowthPlan | null) {
  return plan === "plus" || plan === "pro";
}

export function createLinkedInGrowthPaymentLookup(supabase: SupabaseAdminClient): PaymentLookup {
  return async (column, value) => {
    const payments = supabase.from("payments") as PaymentTableQuery;
    return payments.select("course_name, plan_name, status, upgrade_to").eq(column, value);
  };
}

export async function getLinkedInGrowthPlanForUser(
  lookupPayments: PaymentLookup,
  userId: string,
  userEmail?: string | null,
): Promise<LinkedInGrowthPlan | null> {
  const { data: paymentsByUserId, error } = await lookupPayments("user_id", userId);
  let payments = paymentsByUserId;

  if (error) {
    console.error("Error querying payments by userId:", error);
  }

  if ((!payments || payments.length === 0) && userEmail) {
    const result = await lookupPayments("user_email", userEmail);

    payments = result.data;
    if (result.error) console.error("Error querying payments by email:", result.error);
  }

  if (!payments || payments.length === 0) return null;

  let highestPlan: LinkedInGrowthPlan | null = null;

  for (const row of payments) {
    if (row.status !== "completed") continue;
    if (row.course_name && !LINKEDIN_GROWTH_COURSE_NAMES.has(row.course_name)) continue;

    const plan = toPlan(row.plan_name, row.upgrade_to);

    if (plan && (!highestPlan || PLAN_PRIORITY[plan] > PLAN_PRIORITY[highestPlan])) {
      highestPlan = plan;
    }
  }

  return highestPlan;
}
