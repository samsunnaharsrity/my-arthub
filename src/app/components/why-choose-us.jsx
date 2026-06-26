import React from 'react';

const WhyChooseUs = () => {
    return (
        <div>
            <section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Why Choose Us?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="text-center p-8 rounded-2xl shadow">
        <h3 className="font-bold text-xl">Unique Artworks</h3>
        <p className="mt-2 text-gray-500">
          Discover exclusive creations from talented artists.
        </p>
      </div>

      <div className="text-center p-8 rounded-2xl shadow">
        <h3 className="font-bold text-xl">Secure Payments</h3>
        <p className="mt-2 text-gray-500">
          Safe and trusted payment experience.
        </p>
      </div>

      <div className="text-center p-8 rounded-2xl shadow">
        <h3 className="font-bold text-xl">Global Community</h3>
        <p className="mt-2 text-gray-500">
          Connect with artists and collectors worldwide.
        </p>
      </div>
    </div>
  </div>
</section>
        </div>
    );
}

export default WhyChooseUs;
