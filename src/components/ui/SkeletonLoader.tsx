import { cn } from '../../lib/utils';

// ============================================================
// Skeleton Loader Component
// ============================================================

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200',
        className
      )}
    />
  );
}

// ============================================================
// Card Skeleton
// ============================================================

export function CardSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <Skeleton className="h-5 w-40 bg-slate-200" />
      <div className="space-y-3 mt-4">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-3/4 bg-slate-200" />
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100">
        <Skeleton className="h-6 w-48 bg-slate-200" />
      </div>
    </div>
  );
}

// ============================================================
// Table Row Skeleton
// ============================================================

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-4 py-4"><Skeleton className="h-4 w-4 bg-slate-200" /></td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-16 bg-slate-200" />
            <Skeleton className="h-3 w-24 bg-slate-200" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 bg-slate-200" />
          <Skeleton className="h-3 w-20 bg-slate-200" />
        </div>
      </td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-20 bg-slate-200" /></td>
      <td className="px-4 py-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20 bg-slate-200" />
          <Skeleton className="h-3 w-16 bg-slate-200" />
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20 bg-slate-200" />
          <Skeleton className="h-3 w-16 bg-slate-200" />
        </div>
      </td>
      <td className="px-4 py-4"><Skeleton className="h-4 w-16 bg-slate-200" /></td>
    </tr>
  );
}
