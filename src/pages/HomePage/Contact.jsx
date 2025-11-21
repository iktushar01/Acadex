function Contact() {
  return (
    <section id="contact" className="space-y-8 pb-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
        <p className="text-muted-foreground">If you have suggestions, questions, or feature requests, we'd love to hear from you.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
          <p className="text-muted-foreground leading-relaxed">
            Share ideas for new study tools, tell us about the features that would help your class, or just say hello.
            We reply to every message because collaborative learning is at the heart of Acadex.
          </p>
        </div>
        <div className="bg-muted rounded-2xl border border-dashed border-border p-8 flex items-center justify-center text-muted-foreground">
          Contact form placeholder
        </div>
      </div>
    </section>
  )
}

export default Contact

