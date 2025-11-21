const steps = [
  {
    title: 'Join Your Class Group',
    description: 'Create or join a secure space dedicated to your classmates.',
    icon: '1',
  },
  {
    title: 'Upload or Access Notes',
    description: 'Add files in seconds or browse organized materials shared by peers.',
    icon: '2',
  },
  {
    title: 'Study Smarter Together',
    description: 'Use shared insights and stay aligned before exams and projects.',
    icon: '3',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
        <p className="text-muted-foreground">Three calm steps to keep every class in sync.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
              {step.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks

