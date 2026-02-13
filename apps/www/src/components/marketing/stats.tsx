const stats = [
  { value: '184+', label: 'Components' },
  { value: '7', label: 'Categories' },
  { value: '100%', label: 'Type Safe' },
  { value: '0', label: 'Dependencies' },
];

export function Stats() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
