import { Skeleton } from '~/app/_components/ui/skeleton';

export default function AccountLoading() {
  return (
    <div className="m-auto flex flex-col gap-5">
      <Skeleton className="h-[7em] w-[18em] rounded-lg bg-slate-200 px-5 shadow-lg" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="h-[37em] w-[30em] rounded-lg shadow-lg" />
          <Skeleton className="h-[37em] min-w-[50em] rounded-lg shadow-lg" />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="h-[37em] w-[30em] rounded-lg shadow-lg" />
          <Skeleton className="h-[37em] min-w-[50em] rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}
