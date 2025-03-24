"use client";

export function HeroBanner() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1974')"
        }}
      />
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Explore the World with Low Flight Prices
          </h1>
          <p className="text-lg text-white/90 mb-4">
            Discover hundreds of destinations with FlyAway. Book your flights at the best prices!
          </p>
        </div>
      </div>
    </div>
  );
}
