// Particles.jsx

export default function Particles() {
  return (
    <div className="particles">
      {[...Array(60)].map((_, i) => (
        <span
          key={i}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}