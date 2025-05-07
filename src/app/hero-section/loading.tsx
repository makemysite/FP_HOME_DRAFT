
export default function Loading() {
  return (
    <section className="w-full max-w-[1243px] mx-auto mt-12 md:mt-[106px] px-4 md:px-0 animate-pulse">
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:w-[57%]">
          <div className="flex flex-col">
            <div className="h-8 md:h-16 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            <div className="mt-6 md:mt-[34px] h-14 bg-gray-200 rounded-full w-full md:w-3/4"></div>
          </div>
        </div>
        <div className="w-full md:w-[43%]">
          <div className="aspect-[1.35] w-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}
