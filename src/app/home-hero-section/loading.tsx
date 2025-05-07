
export default function Loading() {
  return (
    <section className="w-full max-w-[1334px] max-md:max-w-full mt-[52px] animate-pulse">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full">
          <div className="flex flex-col items-center">
            <div className="h-4 w-40 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-12 w-2/3 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-6 w-5/6 bg-gray-200 rounded-md"></div>
            <div className="h-14 w-full bg-gray-200 rounded-full mt-12"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded-md mt-6"></div>
          </div>
        </div>
        <div className="w-6/12 max-md:w-full">
          <div className="aspect-[1.92] w-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded-md mt-24"></div>
      <div className="h-24 w-full bg-gray-200 rounded-lg mt-6"></div>
    </section>
  );
}
