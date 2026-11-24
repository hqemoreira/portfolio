import { LegalShell, LegalP } from '../components/LegalShell'

/**
 * Professional introduction. Evidence lives on the case, the projects and the CV.
 */
export default function About({ theme = 'dark' }) {
  return (
    <LegalShell theme={theme} title="About" eyebrow="Profile">
      <LegalP>
        I work in international commercial operations, with customers and with the processes that carry a commitment from the first conversation through to delivery.
      </LegalP>
      <LegalP>
        That work has run across several markets and customer accounts at the same time. Commercial priorities compete, and the task is to see which ones matter, then bring the teams around an account to the same understanding of what the customer needs and what the business can deliver.
      </LegalP>
      <LegalP>
        The journey runs from identifying demand and preparing a bid, through coordination and delivery, and on into the customer relationship. Information and decisions have to travel with the work, across teams and countries, or the next handover starts from a gap.
      </LegalP>
      <LegalP>
        I am extending that experience into applied AI and automation. The interest is practical: use technology where it makes a complex commercial process easier to see, easier to coordinate, and better prepared for the people who still make the decision.
      </LegalP>
    </LegalShell>
  )
}
