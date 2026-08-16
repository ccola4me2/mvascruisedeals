import { communityGroups } from "../data/communityGroups";

export default function CommunityGroups() {
  if (!communityGroups || communityGroups.length === 0) return null;

  return (
    <section className="section section--muted">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">It&apos;s better with a crew</p>
          <h2>Join our community</h2>
        </div>
        <div className="community-grid">
          {communityGroups.map((g, i) => (
            <article className="community-card" key={i}>
              <span className="community-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                </svg>
              </span>
              <h3 className="community-name">{g.name}</h3>
              <p className="community-desc">{g.description}</p>
              <a
                href={g.href}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Join the Group
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
