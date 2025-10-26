import { CheckCircle } from 'lucide-react';

const features = [
  { title: 'Easy to Use', desc: 'Intuitive interface designed for efficiency' },
  { title: 'Real-time Updates', desc: 'Stay informed with instant notifications' },
  { title: 'Secure & Reliable', desc: 'Your data is protected with enterprise-grade security' }
];

export const FeaturesSection: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h3 className="text-3xl font-bold text-center text-[#EDEDED] mb-12">
        Why Choose Emprex?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-[#0B0B12] p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-[#EDEDED]" />
            </div>
            <h4 className="text-xl font-semibold text-[#EDEDED] mb-2">{feature.title}</h4>
            <p className="text-[#9CA3AF]">{feature.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};