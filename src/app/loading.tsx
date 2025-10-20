export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="inline-block mb-8 border-4 border-black p-8 animate-pulse">
          <div className="w-24 h-24 border-4 border-black border-t-transparent animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-sm uppercase tracking-widest font-bold">
          Загрузка...
        </p>
      </div>
    </div>
  );
}

