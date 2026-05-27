import { useQuery } from '@tanstack/react-query';
import { getHoldings, getCapitalGains } from '../data/mockData';

// ============================================================
// Custom Hook: useHoldings
// ============================================================

export function useHoldings() {
  const query = useQuery({
    queryKey: ['holdings'],
    queryFn: getHoldings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return query;
}

// ============================================================
// Custom Hook: useCapitalGains
// ============================================================

export function useCapitalGains() {
  const query = useQuery({
    queryKey: ['capitalGains'],
    queryFn: getCapitalGains,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return query;
}
