import { Skeleton } from '~/app/_components/ui/skeleton';

export default function InvestmentLoading() {
  return (
    <div className="m-auto flex flex-col gap-5">
      <Skeleton className="h-[7em] w-[18em] rounded-lg bg-slate-200 px-5 shadow-lg" />

      <div className="flex flex-wrap gap-16">
        <Skeleton className="h-[37em] w-[30em] rounded-lg shadow-lg" />
        <Skeleton className="h-[37em] w-[60em] rounded-lg shadow-lg" />
      </div>
    </div>
  );
}
