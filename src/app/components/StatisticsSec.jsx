import React from 'react';

const StatisticsSec = () => {
    return (
        <div>
            <section className="py-20 bg-emerald-50">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <h2 className="text-5xl font-bold text-emerald-600">500+</h2>
        <p>Artworks</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-emerald-600">100+</h2>
        <p>Artists</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-emerald-600">1K+</h2>
        <p>Collectors</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-emerald-600">20+</h2>
        <p>Countries</p>
      </div>
    </div>
  </div>
</section>
        </div>
    );
}

export default StatisticsSec;
