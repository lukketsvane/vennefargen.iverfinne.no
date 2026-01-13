import React, { useState, useMemo } from 'react';

const colors = [
  { name: 'IDA', ncs: '2618-Y52R', hex: '#C9A08A', rgb: [201, 160, 138], blackness: 26, chroma: 18, hue: 'Y52R' },
  { name: 'LEAH', ncs: '3420-Y55R', hex: '#C4967A', rgb: [196, 150, 122], blackness: 34, chroma: 20, hue: 'Y55R' },
  { name: 'IVER', ncs: '2919-Y54R', hex: '#C9A28C', rgb: [201, 162, 140], blackness: 29, chroma: 19, hue: 'Y54R' },
  { name: 'ANNA', ncs: '2526-Y70R', hex: '#D49580', rgb: [212, 149, 128], blackness: 25, chroma: 26, hue: 'Y70R' },
  { name: 'JAN PETTER', ncs: 'S 3020-Y70R', hex: '#C9A090', rgb: [201, 160, 144], blackness: 30, chroma: 20, hue: 'Y70R' },
  { name: 'ØYSTEIN', ncs: '2920-Y47R', hex: '#CCA488', rgb: [204, 164, 136], blackness: 29, chroma: 20, hue: 'Y47R' },
  { name: 'WAAD', ncs: '3324-Y61R', hex: '#C9906E', rgb: [201, 144, 110], blackness: 33, chroma: 24, hue: 'Y61R' },
  { name: 'JULIAN', ncs: '2822-Y60R', hex: '#CCA088', rgb: [204, 160, 136], blackness: 28, chroma: 22, hue: 'Y60R' },
  { name: 'GEIR', ncs: '2726-Y68R', hex: '#D09580', rgb: [208, 149, 128], blackness: 27, chroma: 26, hue: 'Y68R' },
  { name: 'FRANCOIS', ncs: '3121-Y66R', hex: '#C49580', rgb: [196, 149, 128], blackness: 31, chroma: 21, hue: 'Y66R' },
];

const tabs = ['Samling', 'Analyse', 'Samanlikn', 'Stem', 'Swipe'];

// Color detail view
function ColorDetail({ color, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-48" style={{ backgroundColor: color.hex }} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{color.name}</h2>
              <p className="text-gray-500 font-mono">{color.ncs}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Blackness</p>
              <p className="font-semibold text-gray-900">{color.blackness}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Chroma</p>
              <p className="font-semibold text-gray-900">{color.chroma}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Hue</p>
              <p className="font-semibold text-gray-900">{color.hue}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">HEX</p>
              <p className="font-semibold text-gray-900">{color.hex}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg col-span-2">
              <p className="text-gray-500">RGB</p>
              <p className="font-semibold text-gray-900">{color.rgb.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Collection tab
function CollectionTab({ onSelectColor }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Vernefargar</h2>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => onSelectColor(color)}
            className="rounded-xl overflow-hidden text-left hover:scale-[1.02] transition-transform shadow-sm"
          >
            <div className="h-24" style={{ backgroundColor: color.hex }} />
            <div className="bg-white p-3 border-t">
              <p className="font-semibold text-gray-900 text-sm">{color.name}</p>
              <p className="text-gray-500 text-xs font-mono">{color.ncs}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Analysis tab
function AnalysisTab() {
  const stats = useMemo(() => {
    const avgBlackness = colors.reduce((a, c) => a + c.blackness, 0) / colors.length;
    const avgChroma = colors.reduce((a, c) => a + c.chroma, 0) / colors.length;
    const avgRgb = colors.reduce((a, c) => [a[0] + c.rgb[0], a[1] + c.rgb[1], a[2] + c.rgb[2]], [0, 0, 0]).map(v => Math.round(v / colors.length));
    const lightest = [...colors].sort((a, b) => a.blackness - b.blackness)[0];
    const darkest = [...colors].sort((a, b) => b.blackness - a.blackness)[0];
    const mostSaturated = [...colors].sort((a, b) => b.chroma - a.chroma)[0];
    const leastSaturated = [...colors].sort((a, b) => a.chroma - b.chroma)[0];
    const hueGroups = {};
    colors.forEach(c => {
      const hueNum = parseInt(c.hue.replace('Y', '').replace('R', ''));
      const group = hueNum < 55 ? 'Gul-dominert' : hueNum < 65 ? 'Balansert' : 'Raud-dominert';
      hueGroups[group] = (hueGroups[group] || 0) + 1;
    });
    return { avgBlackness, avgChroma, avgRgb, lightest, darkest, mostSaturated, leastSaturated, hueGroups };
  }, []);

  const avgHex = `#${stats.avgRgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Analyse</h2>

      {/* Average color */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="h-20" style={{ backgroundColor: avgHex }} />
        <div className="p-4">
          <p className="text-sm text-gray-500">Gjennomsnittsfarge</p>
          <p className="font-mono text-gray-900">{avgHex.toUpperCase()}</p>
          <p className="text-sm text-gray-500 mt-1">RGB: {stats.avgRgb.join(', ')}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Snitt blackness</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgBlackness.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Snitt chroma</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgChroma.toFixed(1)}%</p>
        </div>
      </div>

      {/* Extremes */}
      <div className="space-y-3">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: stats.lightest.hex }} />
          <div>
            <p className="text-sm text-gray-500">Lysast</p>
            <p className="font-semibold text-gray-900">{stats.lightest.name}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: stats.darkest.hex }} />
          <div>
            <p className="text-sm text-gray-500">Mørkast</p>
            <p className="font-semibold text-gray-900">{stats.darkest.name}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: stats.mostSaturated.hex }} />
          <div>
            <p className="text-sm text-gray-500">Mest metta</p>
            <p className="font-semibold text-gray-900">{stats.mostSaturated.name}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: stats.leastSaturated.hex }} />
          <div>
            <p className="text-sm text-gray-500">Minst metta</p>
            <p className="font-semibold text-gray-900">{stats.leastSaturated.name}</p>
          </div>
        </div>
      </div>

      {/* Hue distribution */}
      <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
        <p className="text-sm text-gray-500 mb-3">Fargetone-fordeling</p>
        {Object.entries(stats.hueGroups).map(([group, count]) => (
          <div key={group} className="flex items-center justify-between mb-2">
            <span className="text-gray-700">{group}</span>
            <span className="font-semibold text-gray-900">{count}</span>
          </div>
        ))}
      </div>

      {/* Spectrum view */}
      <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
        <p className="text-sm text-gray-500 mb-3">Sortert etter lysheit</p>
        <div className="flex rounded-lg overflow-hidden">
          {[...colors].sort((a, b) => a.blackness - b.blackness).map((c, i) => (
            <div key={i} className="flex-1 h-12" style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Compare tab
function CompareTab({ onSelectColor }) {
  const [selected, setSelected] = useState([0, 1]);

  const toggleSelect = (idx) => {
    if (selected.includes(idx)) {
      if (selected.length > 2) setSelected(selected.filter(i => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const colorDiff = (c1, c2) => {
    const dr = c1.rgb[0] - c2.rgb[0];
    const dg = c1.rgb[1] - c2.rgb[1];
    const db = c1.rgb[2] - c2.rgb[2];
    return Math.sqrt(dr * dr + dg * dg + db * db).toFixed(1);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Samanlikn</h2>

      {/* Selected colors side by side */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="flex">
          {selected.map((idx, i) => (
            <div key={i} className="flex-1 h-32" style={{ backgroundColor: colors[idx].hex }} />
          ))}
        </div>
        <div className="flex border-t">
          {selected.map((idx, i) => (
            <div key={i} className="flex-1 p-3 text-center border-r last:border-r-0">
              <p className="font-semibold text-gray-900 text-sm">{colors[idx].name}</p>
              <p className="text-xs text-gray-500 font-mono">{colors[idx].ncs}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison stats */}
      {selected.length === 2 && (
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <p className="text-sm text-gray-500 mb-2">Skilnad</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-500">RGB-avstand</p>
              <p className="font-bold text-gray-900">{colorDiff(colors[selected[0]], colors[selected[1]])}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Δ Blackness</p>
              <p className="font-bold text-gray-900">{Math.abs(colors[selected[0]].blackness - colors[selected[1]].blackness)}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Δ Chroma</p>
              <p className="font-bold text-gray-900">{Math.abs(colors[selected[0]].chroma - colors[selected[1]].chroma)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Color picker */}
      <p className="text-sm text-gray-500 mb-2">Vel fargar å samanlikne</p>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => toggleSelect(idx)}
            className={`aspect-square rounded-lg transition-all ${selected.includes(idx) ? 'ring-2 ring-gray-900 scale-95' : 'hover:scale-105'}`}
            style={{ backgroundColor: color.hex }}
          >
            {selected.includes(idx) && (
              <span className="text-white text-xs font-bold drop-shadow">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Vote tab
function VoteTab() {
  const [votes, setVotes] = useState({});
  const [currentVoter, setCurrentVoter] = useState(1);
  const [phase, setPhase] = useState('voting');
  const [topThree, setTopThree] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Check if user has already voted on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const voted = localStorage.getItem('vernefargar_hasVoted');
      if (voted === 'true') {
        setHasVoted(true);
        setShowResults(true);
        // Load saved results if available
        const savedResults = localStorage.getItem('vernefargar_results');
        if (savedResults) {
          setTopThree(JSON.parse(savedResults));
          setPhase('done');
        }
      }
    }
  }, []);

  const handleVote = (colorIdx) => {
    // Mark that this user has voted
    if (typeof window !== 'undefined') {
      localStorage.setItem('vernefargar_hasVoted', 'true');
      localStorage.setItem('vernefargar_userVote', colorIdx.toString());
    }
    setHasVoted(true);

    const newVotes = { ...votes, [currentVoter]: colorIdx };
    setVotes(newVotes);

    if (currentVoter >= 9) {
      const tally = {};
      colors.forEach((_, i) => tally[i] = 0);
      Object.values(newVotes).forEach(idx => tally[idx]++);
      const top3 = Object.entries(tally)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([idx, count]) => ({ ...colors[idx], count: parseInt(count) }));
      setTopThree(top3);
      // Save results to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('vernefargar_results', JSON.stringify(top3));
      }
      setPhase('reveal3');
    } else {
      setCurrentVoter(currentVoter + 1);
    }
  };

  const nextReveal = () => {
    if (phase === 'reveal3') setPhase('reveal2');
    else if (phase === 'reveal2') setPhase('reveal1');
    else if (phase === 'reveal1') setPhase('done');
  };

  const reset = () => {
    // Don't allow reset if user has already voted
    if (hasVoted) {
      return;
    }
    setVotes({});
    setCurrentVoter(1);
    setPhase('voting');
    setTopThree([]);
  };

  // If user has already voted, show them a message
  if (hasVoted && phase === 'voting') {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Takk for di røyst!</h2>
        <p className="text-gray-500 text-center mb-4">Du har allereie røysta. Kvar person kan berre røyste éin gong.</p>
        {showResults && topThree.length > 0 && (
          <button 
            onClick={() => setPhase('done')} 
            className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold"
          >
            Sjå resultat
          </button>
        )}
      </div>
    );
  }

  if (phase.startsWith('reveal') || phase === 'done') {
    const revealIndex = phase === 'reveal3' ? 2 : phase === 'reveal2' ? 1 : 0;
    const medals = ['🥇', '🥈', '🥉'];
    const places = ['FØRSTEPLASS', 'ANDREPLASS', 'TREDJEPLASS'];

    if (phase !== 'done') {
      return (
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-2 text-sm tracking-widest">{places[revealIndex]}</p>
          <div className="text-6xl mb-4">{medals[revealIndex]}</div>
          <div className="w-32 h-32 rounded-2xl mb-4 shadow-lg" style={{ backgroundColor: topThree[revealIndex].hex }} />
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{topThree[revealIndex].name}</h1>
          <p className="text-gray-500 font-mono mb-1">{topThree[revealIndex].ncs}</p>
          <p className="text-orange-500 font-semibold">{topThree[revealIndex].count} stemmer</p>
          <button onClick={nextReveal} className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold">
            {phase === 'reveal1' ? 'Sjå resultat' : 'Neste →'}
          </button>
        </div>
      );
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">🏆 Resultat</h2>
        <div className="space-y-3">
          {topThree.map((color, idx) => (
            <div key={color.name} className={`flex items-center gap-3 p-3 rounded-xl ${idx === 0 ? 'bg-yellow-50 ring-1 ring-yellow-200' : 'bg-white'} shadow-sm`}>
              <span className="text-2xl">{medals[idx]}</span>
              <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: color.hex }} />
              <div className="flex-grow">
                <p className="font-semibold text-gray-900">{color.name}</p>
                <p className="text-gray-500 text-xs font-mono">{color.ncs}</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{color.count}</p>
            </div>
          ))}
        </div>
        <button onClick={reset} className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold opacity-50 cursor-not-allowed" disabled>
          Stem på nytt (ikkje tillatt)
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Person {currentVoter} av 9</h2>
      <p className="text-gray-500 text-center mb-4">Vel din favoritt</p>

      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-orange-400 transition-all" style={{ width: `${((currentVoter - 1) / 9) * 100}%` }} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleVote(idx)}
            className="aspect-square rounded-xl hover:scale-105 transition-transform shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      <p className="text-center text-gray-400 mt-4 text-sm">Namn avslørt etter avstemming</p>
    </div>
  );
}

// Swipe tab (Tinder-style)
function SwipeTab() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [swipeDir, setSwipeDir] = useState(null);

  const swipe = (liked) => {
    setSwipeDir(liked ? 'right' : 'left');
    setTimeout(() => {
      if (liked) setLikes([...likes, colors[currentIdx]]);
      else setDislikes([...dislikes, colors[currentIdx]]);
      setCurrentIdx(currentIdx + 1);
      setSwipeDir(null);
    }, 200);
  };

  const reset = () => {
    setCurrentIdx(0);
    setLikes([]);
    setDislikes([]);
  };

  if (currentIdx >= colors.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Dine val</h2>

        {likes.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">❤️ Likte ({likes.length})</p>
            <div className="flex flex-wrap gap-2">
              {likes.map((c, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-lg shadow-sm" style={{ backgroundColor: c.hex }} />
                  <p className="text-xs text-gray-700 mt-1">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {dislikes.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">👎 Likte ikkje ({dislikes.length})</p>
            <div className="flex flex-wrap gap-2">
              {dislikes.map((c, i) => (
                <div key={i} className="text-center opacity-50">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: c.hex }} />
                  <p className="text-xs text-gray-500 mt-1">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={reset} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          Start på nytt
        </button>
      </div>
    );
  }

  const color = colors[currentIdx];

  return (
    <div className="p-4 flex flex-col items-center">
      <p className="text-gray-500 text-sm mb-4">{currentIdx + 1} av {colors.length}</p>

      <div 
        className={`w-64 h-80 rounded-2xl shadow-lg transition-transform duration-200 ${
          swipeDir === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' :
          swipeDir === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''
        }`}
        style={{ backgroundColor: color.hex }}
      />
      
      <div className="flex gap-6 mt-8">
        <button
          onClick={() => swipe(false)}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-transform border border-gray-200"
        >
          👎
        </button>
        <button
          onClick={() => swipe(true)}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-transform border border-gray-200"
        >
          ❤️
        </button>
      </div>
      
      <p className="text-gray-400 text-sm mt-6">Swipe for å velje</p>
    </div>
  );
}

// Main app
export default function VernefargaApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <h1 className="text-center py-3 font-bold text-gray-900">Vernefargar</h1>
        <div className="flex">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === idx
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === 0 && <CollectionTab onSelectColor={setSelectedColor} />}
        {activeTab === 1 && <AnalysisTab />}
        {activeTab === 2 && <CompareTab onSelectColor={setSelectedColor} />}
        {activeTab === 3 && <VoteTab />}
        {activeTab === 4 && <SwipeTab />}
      </div>

      {/* Color detail modal */}
      {selectedColor && (
        <ColorDetail color={selectedColor} onClose={() => setSelectedColor(null)} />
      )}
    </div>
  );
}
