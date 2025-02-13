const Crosshair = () => {
  return (
    <div
        className="
          pointer-events-none
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
        "
      >
        <div
          className="
            w-3 h-3
            rounded-full
            border-1 border-white
            bg-transparent
          "
        />
      </div>
  )
}

export default Crosshair