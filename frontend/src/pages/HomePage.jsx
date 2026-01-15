import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCandidates } from "../store/candidatesSlice.js"
import { fetchOpinion } from "../store/opinionSlice.js"
import DonutOpinion from "../components/DonutOpinion.jsx"
import { Link } from "react-router-dom"

export default function HomePage() {
  const dispatch = useDispatch()
  const candidates = useSelector((s) => s.candidates)
  const opinion = useSelector((s) => s.opinion)

  useEffect(() => {
    dispatch(fetchCandidates())
    dispatch(fetchOpinion())
  }, [dispatch])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div id="top" className="-mt-20 pt-20" />


      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-950 to-blue-800 p-6 text-white md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Election Awareness Nepal</div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">To Make The Future Bright, Use Your Voice And Vote Right!</h1>
            <p className="mt-3 text-white/90">
              Learn, reflect, and share your support. Voting actions require login. Counts start at zero until people vote.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700" to="/rank-leaders">
                Go to Ranking
              </Link>
              <button
                type="button"
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
                onClick={() => {
                  const el = document.getElementById("awareness-video")
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                Watch Video
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/10">
            <img src="/assets/oldie.jpg" alt="Hero" className="h-64 w-full object-cover md:h-80" />
          </div>
        </div>
      </section>

      
      <section id="awareness-video" className="-mt-20 pt-20" />
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <div className="text-sm font-semibold text-slate-900">Election Awareness Video</div>
          <div className="mt-4 overflow-hidden rounded-xl bg-slate-900/10">
            <video className="h-64 w-full object-cover" controls src="/assets/videos/electionawareness.mp4" />
            <p className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6">
              In every election, we stand at a critical crossroads where a single decision can ripple across generations, determining whether we head toward a landscape of progress or a future of missed opportunities. When we vote without research or care, we risk a "bad" future defined by stagnant growth, ignored infrastructure, and a government that feels disconnected from the needs of its people. This path often leads to accountability being lost in favor of empty promises, where the quality of life for the average citizen begins to erode because the wrong hands were placed at the helm. It is a cautionary tale of what happens when we let apathy or misinformation guide our hands in the voting booth, resulting in a community that feels unheard and underserved.
              However, the alternative is a "good" future—a world built "nicely" through the power of an informed and intentional vote. By choosing the right leaders who align with honest values and practical solutions, we plant the seeds for a thriving society where healthcare, education, and the economy are prioritized. This path creates a fair and accountable government that acts as a partner to its citizens rather than an obstacle. Your vote is the ultimate tool to prevent decline and instead foster a future where everyone has the opportunity to succeed. Ultimately, the power to choose between these two starkly different worlds rests entirely in your hands, and by voting with clarity and purpose, you ensure that the direction of the country remains bright and full of hope.
            </p>
          </div>
        </div>

        <div id="about-election" className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <div className="text-sm font-semibold text-slate-900">About the Election</div>
          <p className="mt-3 text-slate-700">
            Choosing the right leaders is the foundation of a healthy society, and elections serve as the vital heartbeat of that process. They are the primary mechanism through which citizens exercise their power to shape the national trajectory, ensuring that those in office are reflective of the people’s collective will and values. This website was established with the core belief that every voter deserves a clear, unbiased space to navigate the complexities of the political landscape. We recognize that while the act of voting takes only a few minutes, the responsibility of being an informed citizen is a year-round commitment. By providing a platform for education and awareness, we aim to bridge the gap between curiosity and civic action, helping you understand not just who is running, but what their vision means for your daily life and the future of our communities.
            This platform operates as a digital town square, intentionally designed to foster transparency and public engagement through user-driven data. Unlike official government portals, we focus on the pulse of the people, capturing real-time shifts in public opinion and support. It is important to remember that the metrics found here are not official election results, nor are they meant to replace the certified tallies of electoral commissions. Instead, they serve as a barometer for community sentiment, where every candidate starts on equal footing at zero. This ensures that the momentum you see is authentic, untainted by historical bias or outside influence. By participating, you are helping to build a transparent map of contemporary thought, encouraging others to think critically and act responsibly. We believe that when citizens are equipped with knowledge and a space to express their views, the result is a more accountable and representative government for everyone.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/35 backdrop-blur border border-white/40 p-4">
              <div className="text-sm font-semibold text-slate-900">Stay informed</div>
              <div className="mt-1 text-sm text-slate-700">Learn how voting works and why it matters.</div>
            </div>
            <div className="rounded-xl bg-white/35 backdrop-blur border border-white/40 p-4">
              <div className="text-sm font-semibold text-slate-900">Be responsible</div>
              <div className="mt-1 text-sm text-slate-700">Support leaders thoughtfully and respectfully.</div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <img src="/assets/info/election.jpg" className="h-48 w-full object-cover rounded-xl" alt="Election" />
          <div className="p-5">
            <div className="text-sm font-semibold text-slate-900">What is an Election?</div>
            <p className="mt-2 text-sm text-slate-700">
              An election is a process where citizens choose their leaders by voting. It allows people to decide who represents them in government.
            </p>
            <a className="rounded-xl bg-slate-50 p-0.5 text-xs hover:bg-slate-100" href="https://www.election.gov.np/" target="_blank" rel="noreferrer">
              Learn More
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <img src="/assets/info/op.jpg" className="h-48 w-full object-cover rounded-xl" alt="Importance" />
          <div className="p-5">
            <div className="text-sm font-semibold text-slate-900">Why is it Important?</div>
            <p className="mt-2 text-sm text-slate-700">
              Elections give people power to shape the future of their country and ensure leaders are accountable to the public.
            </p>
            <a className="rounded-xl bg-slate-50 p-0.5 text-xs hover:bg-slate-100" href="https://www.election.gov.np/" target="_blank" rel="noreferrer">
              Learn More
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <img src="/assets/info/box.jpg" className="h-48 w-full object-cover rounded-xl" alt="How to vote" />
          <div className="p-5">
            <div className="text-sm font-semibold text-slate-900">How to Vote?</div>
            <p className="mt-2 text-sm text-slate-700">
              Register as a voter, visit your polling station on election day, and cast your vote responsibly for your preferred candidate.
            </p>
            <a className="rounded-xl bg-slate-50 p-0.5 text-xs hover:bg-slate-100" href="https://www.election.gov.np/" target="_blank" rel="noreferrer">
              Learn More
            </a>
          </div>
        </div>
      </section>

    
      <section id="peoples-opinion" className="-mt-20 pt-20" />
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <DonutOpinion items={opinion.items} total={opinion.total} />
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Rank Leaders Preview</div>
            <Link className="text-sm font-semibold text-blue-700 underline" to="/rank-leaders">
              Open full page
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(candidates.items || []).slice(0, 4).map((c) => (
              <div key={c.id} className="rounded-xl bg-white/35 backdrop-blur border border-white/40 p-4">
                <div className="text-sm font-semibold text-slate-900">{c.display_name}</div>
                <div className="mt-1 text-sm text-slate-700">Supports: {c.support_count ?? 0}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-900/10 border border-white/40 p-4 text-sm text-slate-800">
            To support a candidate, open the Rank Leaders page and log in.
          </div>
        </div>
      </section>

   
      <section id="resources" className="mt-10 rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
        <div className="text-sm font-semibold text-slate-900">Resources</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <a
            className="rounded-xl bg-white/35 backdrop-blur border border-white/40 p-4 hover:bg-white/45"
            href="https://www.election.gov.np/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-sm font-semibold text-slate-900">Election Commission Nepal</div>
            <div className="mt-1 text-sm text-slate-700">Official information and updates.</div>
          </a>
          <a
            className="rounded-xl bg-white/35 backdrop-blur border border-white/40 p-4 hover:bg-white/45"
            href="https://www.nepal.gov.np/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-sm font-semibold text-slate-900">Nepal Government Portal</div>
            <div className="mt-1 text-sm text-slate-700">General public services and info.</div>
          </a>
        </div>
      </section>

    
      <section id="about-us" className="mt-10 rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
        <div className="text-sm font-semibold text-slate-900">About This Project</div>
        <p className="mt-3 text-slate-700">
          This platform was builtbecause we believe that a healthy democracy relies on two things: informed citizens and transparent data. In a world of complex algorithms
          and pre-determined narratives, this website serves as a neutral ground where you can learn about upcoming elections and the candidates involved without the usual
          noise. Our goal is to empower you to form your own conclusions and share your perspective in a way that is both meaningful and responsible. Transparency is our core
          principle, which is why every support metric you see on this site is entirely user-driven. We don't use outside data or legacy polling to influence the numbers;
          instead, every candidate starts at zero. This "clean slate" approach ensures that the trends you see are an authentic reflection of our community's current
          sentiment. By participating, you aren't just clicking a button—you’re contributing to a live, grassroots map of public opinion. We invite you to explore the
          issues, engage in thoughtful discussion, and help us build a clearer picture of what matters most to voters today.
        </p>
      </section>

      <footer id="about-creator" className="-mt-20 pt-6 mt-10 rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md shadow-sm p-6">
        <div className="text-sm font-semibold text-slate-900">About the Creator</div>
        <div className="mt-2 text-slate-800">
          <div className="font-semibold">Anish Upreti</div>
          <div className="mt-1">
            I'm a Software Engineering student with practical experience as a full stack developer. I enjoy taking ideas from a simple brief to a working product, pairing
            solid backend design with interfaces that feel modern, simple and trustworthy. AI/ML enthusiast.
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            className="rounded-lg bg-slate-900/10 px-3 py-2 font-semibold text-slate-900 hover:bg-slate-900/15"
            href="https://www.linkedin.com/in/anishupreti47"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="rounded-lg bg-slate-900/10 px-3 py-2 font-semibold text-slate-900 hover:bg-slate-900/15"
            href="https://github.com/anishupr47-git"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="rounded-lg bg-slate-900/10 px-3 py-2 font-semibold text-slate-900 hover:bg-slate-900/15" href="mailto:anish.upr.47@gmail.com">
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}
