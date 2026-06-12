import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

interface ExperienceEntry {
  role: string
  company: string
  location: string
  dates: string
  summary: string
}

const experience: ExperienceEntry[] = [
  {
    role: 'Jr. Software Developer',
    company: 'PBS Systems',
    location: 'Calgary, AB',
    dates: 'Mar 2026 – Present',
    summary:
      "Working tickets, bug fixes, and small feature work on a large enterprise dealership platform. Blazor and MudBlazor on the frontend, .NET on the backend, with some WPF and legacy SQL Server data-layer work mixed in.",
  },
  {
    role: 'Full-Stack Developer',
    company: 'Stream Data Systems',
    location: 'Calgary, AB',
    dates: 'Apr 2025 – Mar 2026',
    summary:
      "A year as full-stack dev across a suite of internal and customer-facing apps. Built a React + Node CMS that replaced a legacy WordPress install. Maintained a shared component library + Storybook so the suite stayed visually consistent. Shipped features across a React Native mobile app and a dashboard product on a shared Node backbone. Architected the monitoring stack listed as a project above. Set up the automated front-end deploy pipeline along the way.",
  },
]

const education = {
  degree: 'B.Sc. Computer Science',
  school: 'University of Calgary',
  dates: '2019 – 2025',
  note: "Chemistry → Computer Science transfer, GPA 3.75. Coursework included Software Engineering, Database Systems, HCI, Networks, and Distributed Systems.",
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 scroll-mt-20 border-t border-[var(--surface-border)]">
      <Container>
        <SectionHeading eyebrow="Experience">Where I've worked.</SectionHeading>

        <ol className="space-y-8 max-w-3xl">
          {experience.map((e) => (
            <li
              key={e.role + e.company}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6"
            >
              <div>
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                  {e.role}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  {e.company} · {e.location}
                </p>
                <p className="text-sm md:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
                  {e.summary}
                </p>
              </div>
              <p className="text-sm text-[var(--text-faint)] md:text-right md:whitespace-nowrap md:pt-1">
                {e.dates}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 pt-8 border-t border-[var(--surface-border)] max-w-3xl">
          <p className="label mb-3 text-[var(--color-brand-accent)]">Education</p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6">
            <div>
              <h3 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                {education.degree}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">{education.school}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {education.note}
              </p>
            </div>
            <p className="text-sm text-[var(--text-faint)] md:text-right md:whitespace-nowrap md:pt-1">
              {education.dates}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
