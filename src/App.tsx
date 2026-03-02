import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, User, Check, ArrowRight, Zap, Shield, EyeOff } from 'lucide-react';

interface Signature {
  name: string;
  location: string | null;
  created_at: string;
}

export default function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      const res = await fetch('/api/signatures');
      const data = await res.json();
      setSignatures(data);
    } catch (err) {
      console.error('Failed to fetch signatures', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/signatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location }),
      });
      if (res.ok) {
        setHasSigned(true);
        setName('');
        setLocation('');
        fetchSignatures();
      }
    } catch (err) {
      console.error('Failed to sign', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white text-black selection:bg-[#ff3e00] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-40">
        <header className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12vw] md:text-[8vw] font-display leading-[0.85] uppercase tracking-tighter mb-12">
              THE <br />
              <span className="text-[#ff3e00]">ATTENTION</span> <br />
              MANIFESTO
            </h1>
            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-black/20" />
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">Issue 001 / Reclaiming Reality</p>
            </div>
          </motion.div>
        </header>

        <main className="space-y-32">
          {/* The Manifesto Content */}
          <section className="manifesto-text text-4xl md:text-6xl font-black uppercase tracking-tighter">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[#ff3e00] mb-24"
            >
              Attention is political.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <p>What we attend to shapes what we believe.</p>
              <p>What we believe shapes what we tolerate.</p>
              <p>What we tolerate becomes the world we live in.</p>
            </motion.div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm uppercase tracking-wider opacity-60 leading-relaxed">
            <div className="space-y-8">
              <p>Today, a small number of corporations decide what billions of people see, feel, and fear.</p>
              <p>Not by force. By design.</p>
            </div>
            <div className="space-y-8">
              <p>Endless feeds, alerts, and metrics are not neutral tools.</p>
              <p>They are systems built to capture attention, because attention can be sold, predicted, and controlled.</p>
            </div>
          </section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-y border-black/10 py-24"
          >
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter">
              Reclaiming attention is not self-care. <br />
              <span className="text-[#ff3e00]">It is an act of resistance.</span>
            </h2>
          </motion.section>

          <section className="space-y-12 text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            <p>We are not calling for disconnection from the world.</p>
            <p>We are calling for reconnection with it—on human terms.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#ff3e00]">01 / SILENCE</h3>
              <p className="text-2xl font-bold uppercase leading-tight">Silence is not emptiness. It is where judgment forms.</p>
            </div>
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#ff3e00]">02 / STILLNESS</h3>
              <p className="text-2xl font-bold uppercase leading-tight">Stillness is not apathy. It is where agency returns.</p>
            </div>
          </section>

          <section className="font-mono text-sm uppercase tracking-widest space-y-8 opacity-40 max-w-2xl">
            <p>We refuse the idea that our inner lives are acceptable collateral for convenience.</p>
            <p>We refuse systems that profit from anxiety, outrage, and comparison.</p>
            <p>We refuse to confuse engagement with meaning.</p>
          </section>

          <section className="text-4xl md:text-6xl font-black uppercase tracking-tighter space-y-8">
            <p>Power does not always fall loudly.</p>
            <p className="text-[#ff3e00]">Sometimes it erodes—quietly—when people stop giving it their attention.</p>
          </section>

          <section className="pt-24">
            <h2 className="text-6xl md:text-9xl font-display uppercase leading-[0.8] tracking-tighter mb-12">
              Take your <br />
              time back.
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.5em] opacity-30">The rest will follow.</p>
          </section>
        </main>

        {/* Interaction Section */}
        <section className="mt-60 pt-40 border-t border-black/10 grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-7 space-y-16">
            <h2 className="text-4xl font-display uppercase tracking-tight">Join the Resistance</h2>
            
            <AnimatePresence mode="wait">
              {!hasSigned ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-12"
                >
                  <div className="space-y-8">
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="NAME OR PSEUDONYM"
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:outline-none focus:border-[#ff3e00] transition-colors font-mono text-xs uppercase tracking-widest"
                        required
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="LOCATION (OPTIONAL)"
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:outline-none focus:border-[#ff3e00] transition-colors font-mono text-xs uppercase tracking-widest"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-4 text-sm font-mono uppercase tracking-[0.3em] hover:text-[#ff3e00] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'SIGN MANIFESTO'}
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 text-[#ff3e00]"
                >
                  <Shield size={20} />
                  <p className="font-mono text-xs uppercase tracking-widest">COMMITMENT RECORDED.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="md:col-span-5 space-y-12">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-30">Recent Signatories</h3>
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-6 custom-scrollbar">
              {signatures.map((sig, i) => (
                <div key={i} className="flex flex-col border-b border-black/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider">{sig.name}</span>
                  <span className="text-[10px] opacity-30 uppercase tracking-widest">{sig.location || 'ANONYMOUS'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-60 py-40 border-t border-black/10 text-center space-y-16">
          <div className="max-w-xl mx-auto space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-30">
              This transmission is complete.
            </p>
            <p className="text-3xl font-bold uppercase tracking-tighter leading-tight">
              Close this tab. <br />
              Go outside. <br />
              Be present.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'THE ATTENTION MANIFESTO',
                    text: 'RECLAIM YOUR TIME.',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('LINK COPIED');
                }
              }}
              className="font-mono text-[10px] uppercase tracking-[0.5em] hover:text-[#ff3e00] transition-colors"
            >
              Distribute Intentionally
            </button>
            <div className="h-12 w-px bg-black/10" />
            <p className="font-mono text-[9px] uppercase tracking-[0.6em] opacity-20">
              No Tracking • No Cookies • No Surrender
            </p>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff3e00;
        }
      `}} />
    </div>
  );
}
