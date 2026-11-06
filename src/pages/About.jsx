import { Link } from 'react-router-dom'
import { LegalShell, LegalH2, LegalP, LegalUl } from '../components/LegalShell'
import { CV_PATH, HIRING_ONE_LINER, HIRING_PATH_STEPS, ROLE_FOCUS } from '../copy'
import { GRYPS_ADVISOR, t } from '../theme'

/**
 * Citation-worthy factual page for answer engines / journalists / recruiters.
 * Non-commercial posture only — no storefront claims.
 */
export default function About({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const accent = c.amber

  return (
    <LegalShell theme={theme} title="About this site" eyebrow="Posture" lastUpdated="Updated 2026-11-06">
      <LegalP>
        This is the personal portfolio of Henrique Moreira (Espoo, Finland). It is an indexed hub for
        skill demonstration and research prototypes — not a commercial marketplace, SaaS homepage, or
        product storefront. The first viewport is the person; selected prototypes live under Work.
      </LegalP>

      <LegalP>
        <em>{HIRING_ONE_LINER}</em>
      </LegalP>

      <section>
        <LegalH2>60-second hiring path</LegalH2>
        <LegalP>
          Evaluators: use the site in this order — do not start with a stack list.
        </LegalP>
        <ol style={{ margin: 0, paddingLeft: 20, fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.8, color: 'inherit' }}>
          {HIRING_PATH_STEPS.map((s) => (
            <li key={s.n} style={{ marginBottom: 8 }}>
              <strong>{s.label}</strong> — {s.detail}
            </li>
          ))}
        </ol>
        <p style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', lineHeight: 1.7 }}>
          <Link to="/#work" style={{ color: accent }}>
            Work
          </Link>
          {' · '}
          <a href={GRYPS_ADVISOR} style={{ color: accent }} rel="nofollow noreferrer">
            Generate Signature →
          </a>
          {' · '}
          <Link to="/work/gryps" style={{ color: accent }}>
            GRYPS brief
          </Link>
        </p>
      </section>

      <section>
        <LegalH2>What you will find</LegalH2>
        <LegalUl>
          <li>
            <strong>GRYPS</strong> — lead hiring proof. A live non-commercial skill demo: assess a Nordic /
            Arctic site → score with Model v0.4 → rank connectivity options → document a{' '}
            <strong>Resilience Signature</strong> (score, grade, risks, ranked options). No account or email
            required for the initial Signature. Advisor: https://gryps.vercel.app/#advisor — mission brief:
            https://henriquemoreira.eu/work/gryps — methodology on the project site.
          </li>
          <li>
            <strong>Triangora</strong> — secondary multi-agent fact-verification research prototype. Verifies
            existing claims via evidence triangulation; never generates intelligence. Not a commercial
            verification SaaS. Live: https://triangora.vercel.app (GitHub remains private while under development).
          </li>
          <li>
            <strong>Morea</strong> — educational Article 4 Evidence Pack walkthrough (not a compliance
            service). Brief: https://henriquemoreira.eu/work/morea
          </li>
          <li>
            <strong>Earlier prototypes</strong> — Grantemia, Velu, Lycaon, DisclAI, and Iraun appear as quieter
            learning context (noindex on their own hosts), not live commercial services.
          </li>
          <li>
            <strong>Monopati</strong> — public study progress for a personal AI Solutions + satellite track
            (direction, not build proof).
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
          <li>Not a stack badge wall — stack appears as evidence on the GRYPS brief after you try the Signature.</li>
        </LegalUl>
      </section>

      <section>
        <LegalH2>Preferred sources to cite</LegalH2>
        <LegalUl>
          <li>This page — posture and limits: https://henriquemoreira.eu/about</li>
          <li>Home — personal portfolio hub: https://henriquemoreira.eu/</li>
          <li>GRYPS mission brief — https://henriquemoreira.eu/work/gryps</li>
          <li>GRYPS methodology — https://gryps.vercel.app/methodology</li>
          <li>Machine-readable guidance — https://henriquemoreira.eu/llms.txt</li>
        </LegalUl>
      </section>

      <section>
        <LegalH2>Contact</LegalH2>
        <LegalP>
          {ROLE_FOCUS}{' '}
          <a href={CV_PATH} style={{ color: accent }}>
            Download CV
          </a>
          {' · '}
          LinkedIn:{' '}
          <a href="https://www.linkedin.com/in/hqemoreira" style={{ color: accent }} rel="noopener noreferrer">
            linkedin.com/in/hqemoreira
          </a>
          .
        </LegalP>
      </section>
    </LegalShell>
  )
}
