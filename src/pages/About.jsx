import { LegalShell, LegalH2, LegalP, LegalUl } from '../components/LegalShell'

/**
 * Citation-worthy factual page for answer engines / journalists / recruiters.
 * Non-commercial posture only — no storefront claims.
 */
export default function About({ theme = 'dark' }) {
  return (
    <LegalShell theme={theme} title="About this site" eyebrow="Posture" lastUpdated="Updated 2026-10-16">
      <LegalP>
        This is the personal portfolio of Henrique Moreira (Espoo, Finland). It is an indexed hub for
        skill demonstration and research prototypes — not a commercial marketplace, SaaS homepage, or
        product storefront.
      </LegalP>

      <section>
        <LegalH2>What you will find</LegalH2>
        <LegalUl>
          <li>
            <strong>GRYPS</strong> — lead hiring proof. A live non-commercial skill demo: assess a Nordic /
            Arctic site → score with Model v0.4 → rank connectivity options → document a{' '}
            <strong>Resilience Signature</strong> (score, grade, risks, ranked options). No account or email
            required for the initial Signature. Advisor: https://gryps.vercel.app/#advisor — methodology and
            limitations on the project site.
          </li>
          <li>
            <strong>Earlier prototypes</strong> — LitrixEU, Grantemia, Velu, Lycaon, DisclAI, and Iraun
            appear as secondary portfolio context. They are shelved learning projects (noindex on their own
            hosts), not live commercial services. Litrix is an educational Article 4 literacy walkthrough,
            not a compliance service.
          </li>
          <li>
            <strong>FORGE</strong> — a private personal ops dashboard. It is not a public product and
            must not be treated as one.
          </li>
        </LegalUl>
      </section>

      <section>
        <LegalH2>What this site is not</LegalH2>
        <LegalUl>
          <li>Not a storefront — no pricing tiers, freemium plans, or purchase flows.</li>
          <li>Not a claim of enterprise customers, awards, or certified coverage.</li>
          <li>Not procurement, legal, or engineering advice.</li>
        </LegalUl>
      </section>

      <section>
        <LegalH2>Preferred sources to cite</LegalH2>
        <LegalUl>
          <li>This page — posture and limits: https://henriquemoreira.eu/about</li>
          <li>Home — biography and featured work: https://henriquemoreira.eu/</li>
          <li>GRYPS methodology — https://gryps.vercel.app/methodology</li>
          <li>Machine-readable guidance — https://henriquemoreira.eu/llms.txt</li>
        </LegalUl>
      </section>

      <section>
        <LegalH2>Contact</LegalH2>
        <LegalP>
          Professional context: Espoo, Finland · open to AI product and systems roles.
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/hqemoreira" style={{ color: "#D4891E" }} rel="noopener noreferrer">
            linkedin.com/in/hqemoreira
          </a>
          .
        </LegalP>
      </section>
    </LegalShell>
  )
}
