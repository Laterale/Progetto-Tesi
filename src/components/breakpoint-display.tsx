const BreakpointDisplay = () => {
  return (
    <div className="fixed-center bg-slate-700 text-white flex flex-col gap-2 p-6 z-[9999]">
      <p className="sm:hidden">xs</p>
      <p className="max-sm:hidden md:hidden">sm</p>
      <p className="max-md:hidden lg:hidden">md</p>
      <p className="max-lg:hidden xl:hidden">lg</p>
      <p className="max-xl:hidden 2xl:hidden">xl</p>
      <p className="max-2xl:hidden">2xl</p>
    </div>
  )
}

export default BreakpointDisplay
