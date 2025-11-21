const features = [
  { title: 'Note Sharing', description: 'Instantly exchange class notes.', icon: '📚' },
  { title: 'Cloud Storage', description: 'Safe, organized, always accessible.', icon: '☁️' },
  { title: 'Class Groups', description: 'Private spaces for classmates only.', icon: '👥' },
  { title: 'Smart Search', description: 'Find notes by subject, topic, or uploader.', icon: '🔍' },
  { title: 'Tags', description: 'Clean, categorized materials.', icon: '🏷️' },
  { title: 'Secure Access', description: 'Your class, your privacy.', icon: '🛡️' },
]

function Features() {
  return (
    <section id="features" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Features That Keep Your Class Ahead</h2>
        <p className="text-muted-foreground">Everything you need to streamline collaborative study sessions.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features

