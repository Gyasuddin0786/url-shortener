import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const HowStep = ({ emoji, title, desc }) => (
  <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20">
    <div className="text-5xl mb-4">{emoji}</div>
    <h4 className="text-xl font-semibold mb-3">{title}</h4>
    <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
  </div>
);

const Testimonial = ({ name, text }) => (
  <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20">
    <p className="text-slate-800 dark:text-slate-200">“{text}”</p>
    <div className="mt-5 text-sm text-slate-500 dark:text-slate-400">— {name}</div>
  </div>
);

const FAQItem = ({ q, a, open, onToggle, id }) => {
  const contentId = `faq-content-${id}`;
  const buttonId = `faq-btn-${id}`;
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full px-4 py-5 text-left flex items-center justify-between text-slate-900 dark:text-slate-100"
        onClick={onToggle}
      >
        <span className="font-medium">{q}</span>
        <span className="text-slate-500 dark:text-slate-400" aria-hidden>{open ? '−' : '+'}</span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-72 py-4' : 'max-h-0'}`}
      >
        <div className="px-4 pb-4 text-slate-600 dark:text-slate-300">{a}</div>
      </div>
    </div>
  );
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.info("Please login to shorten URLs.");
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/url/shorten", { originalUrl: url });
      setShortenedUrl(res.data.shortenedUrl || res.data.shortUrl || "");
      toast.success("URL shortened successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortenedUrl) return;
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Unable to copy");
    }
  };

  const faq = [
    { q: 'Is this service free?', a: 'Yes — basic URL shortening and history are free. We may add premium features later.' },
    { q: 'How long are shortened links valid?', a: 'Short links remain active unless you delete them or the backend is removed. There is no automatic expiry by default.' },
    { q: 'Can I see click analytics?', a: 'Yes — after creating links, visit your dashboard to see clicks and basic metrics.' },
    { q: 'Are my links private?', a: 'Links created under your account are private to you unless you share them publicly.' },
    { q: 'Is there an API?', a: 'A basic REST API is available for creating and listing URLs; use your auth token to access it.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-20 dark:from-slate-950 dark:to-slate-900">
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.25),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_30%)]"></div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-white/20">Fast, secure, and simple URL shortening</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Share cleaner links in one click.</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-200">Shorten long URLs, manage links, and track performance with a modern dashboard built for speed.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={() => navigate('/signup')} className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300">Get started</button>
              <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Login</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-md">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Shorten your first link</p>
            <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <label className="sr-only" htmlFor="hero-link">Long URL</label>
                <input
                  id="hero-link"
                  type="url"
                  className="w-full border-0 bg-transparent pr-4 text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
                  placeholder="Paste a long URL here"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={!isLoggedIn || loading}
                />
              </div>
              <button
                type="submit"
                disabled={!isLoggedIn || loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-3xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <LoadingSpinner size={20} text="Shortening..." /> : 'Shorten URL'}
              </button>
              {!isLoggedIn && (
                <p className="text-sm text-slate-200">Login to save your links and view history.</p>
              )}
            </form>

            {shortenedUrl && (
              <div className="mt-6 rounded-3xl bg-slate-950/80 p-4 text-slate-100 ring-1 ring-white/10">
                <p className="text-sm text-slate-300">Your shortened link</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a href={shortenedUrl} target="_blank" rel="noreferrer" className="break-words text-cyan-200 hover:text-cyan-100">
                    {shortenedUrl}
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={handleCopy} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20">Copy</button>
                    <button onClick={() => setShortenedUrl("")} className="rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-white/20">Clear</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">A better workflow for sharing links.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Create clean, memorable links and keep all your history in one place.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <HowStep emoji="1️⃣" title="Paste URL" desc="Paste the long link you want to shorten." />
          <HowStep emoji="2️⃣" title="Shorten" desc="Generate a compact link in seconds." />
          <HowStep emoji="3️⃣" title="Share & Track" desc="Share the short link and view stats in your dashboard." />
        </div>
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Trusted by people who share links daily.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Testimonial name="Aisha" text="Saved my long blog links — super fast and reliable." />
            <Testimonial name="Rahul" text="Nice analytics and very easy to use." />
            <Testimonial name="Sana" text="Clean UI and great for sharing across socials." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Quick answers to the most common questions about how our shortener works.</p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {faq.map((item, index) => (
            <FAQItem key={index} id={index} q={item.q} a={item.a} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? null : index)} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Ready to get started?</p>
          <h2 className="mt-4 text-3xl font-semibold">Shorten links faster with one account.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-100/90">Join now and keep all your shortened links saved to your profile.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={() => navigate('/signup')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/20 transition hover:bg-slate-100">Signup</button>
            <button onClick={() => navigate('/login')} className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Login</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
