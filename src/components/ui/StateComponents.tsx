import { AlertCircle, RefreshCw } from 'lucide-react';

// ============================================================
// Error State Component
// ============================================================

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <div>
        <p className="text-slate-800 font-bold text-lg">Failed to load data</p>
        <p className="text-slate-500 text-sm mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0052fe] hover:bg-[#0047df] text-white text-sm font-semibold transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}

// ============================================================
// Empty State Component
// ============================================================

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No holdings found',
  description = 'Try adjusting your search or filters.',
}: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={7} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">📊</div>
          <p className="text-slate-800 font-bold">{title}</p>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </td>
    </tr>
  );
}
