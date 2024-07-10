import { Skeleton } from '~/app/_components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex flex-wrap gap-3 p-10">
      <Skeleton className="flex h-[20em] w-[40em] rounded-lg shadow-lg" />
      <Skeleton className="flex h-[20em] w-[40em] rounded-lg shadow-lg" />
    </div>
  );
}
