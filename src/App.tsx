import PageLayout from './components/layout/PageLayout'
import Hero from './components/sections/Hero'
import ProjectGrid from './components/sections/ProjectGrid'
import ServicesCTA from './components/sections/ServicesCTA'
import Experience from './components/sections/Experience'
import AboutContact from './components/sections/AboutContact'
import { projectsByCategory } from './data/projects'

export default function App() {
  return (
    <PageLayout>
      <Hero />
      <ProjectGrid
        id="production"
        eyebrow="Production"
        heading="Live software. People are using it."
        description="Deployed and running right now. Sports leagues, small businesses, the whole lot."
        projects={projectsByCategory('production')}
      />
      <ProjectGrid
        id="professional"
        eyebrow="Professional · Client & research work"
        heading="Built for clients, employers, and research."
        description="Work I shipped for paying clients, in school, at my last full-time job, and for a friend's master's research. Different rhythm from the personal projects below — fixed scope, real deadlines, a stakeholder who cares which row sorts first."
        projects={projectsByCategory('professional')}
      />
      <ProjectGrid
        id="personal"
        eyebrow="Personal apps"
        heading="Side projects I use."
        description="All in active use. I keep building features the off-the-shelf apps leave out."
        projects={projectsByCategory('personal')}
      />
      <ServicesCTA />
      <Experience />
      <AboutContact />
    </PageLayout>
  )
}
