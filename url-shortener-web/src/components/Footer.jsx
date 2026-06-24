const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-200 pt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h5 className="text-xl font-semibold text-slate-900 dark:text-white">URL Shortener</h5>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Simplify your long URLs with one click and manage your links with ease.</p>
          </div>

          <div>
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold">Connect With Us</h5>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Twitter</a>
              <a href="#" className="hover:text-slate-500 dark:hover:text-slate-300">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="mb-1">© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
          <p className="mb-0">Developed By: <a href="https://github.com/Gyasuddin0786?tab=repositories" className="text-blue-600 dark:text-blue-400">Gyasuddin Ansari</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
