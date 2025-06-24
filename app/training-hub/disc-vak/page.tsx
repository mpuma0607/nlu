const VAKPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">VAK Learning Styles</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introduction to VAK</h2>
        <p className="text-gray-700">
          The VAK learning styles model suggests that most people can be divided into one of three preferred learning
          styles: Visual, Auditory, and Kinesthetic. Understanding your preferred learning style can help you learn more
          effectively.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Visual Learners</h2>
        <p className="text-gray-700">
          Visual learners learn best through seeing. They prefer to learn through charts, graphs, diagrams, and written
          directions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Auditory Learners</h2>
        <p className="text-gray-700">
          Auditory learners learn best through listening. They prefer lectures, discussions, and audio recordings.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Kinesthetic Learners</h2>
        <p className="text-gray-700">
          Kinesthetic learners learn best through doing. They prefer hands-on activities, experiments, and physical
          movement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">VAK Chart</h2>
        <div className="space-y-6">
          <img
            src="/images/vak-learning-styles-chart.png"
            alt="VAK Learning Styles Chart - Getting to Know the VAK Senses"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  )
}

export default VAKPage
