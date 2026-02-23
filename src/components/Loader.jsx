import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when component mounts
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getLineOpacity = (lineIndex, totalLines = 100) => {
    const lineProgress = (progress / 100) * totalLines;
    return lineProgress >= lineIndex ? 1 : 0;
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">
      <div className="text-center w-full px-4 relative">
       
        
        {/* Main Architectural Drawing - Responsive Fixed */}
        <div className="mb-8 relative z-10 w-full overflow-hidden">
          <svg 
            // FIXED: width="800" ko hata kar responsive banaya
            viewBox="0 0 800 280" 
            className="w-full h-auto max-w-[900px] mx-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ground Line */}
            <line 
              x1="0" y1="250" x2="800" y2="250" 
              stroke="#ffffff" strokeWidth="2" 
              opacity={getLineOpacity(1)}
              className="transition-opacity duration-200"
            />
            
            {/* Building 1 - Short Industrial */}
            <rect
              x="20" y="220" width="40" height="30"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(5)}
              className="transition-opacity duration-200"
            />
            <rect
              x="25" y="200" width="30" height="20"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(8)}
              className="transition-opacity duration-200"
            />

            {/* Building 2 - Tall Residential */}
            <rect
              x="70" y="120" width="35" height="130"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(10)}
              className="transition-opacity duration-200"
            />
            {/* Windows grid */}
            {[140, 160, 180, 200, 220].map((y, i) => (
              <g key={i}>
                <line x1="75" y1={y} x2="100" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(12 + i)} className="transition-opacity duration-200"/>
                <line x1="80" y1={y-10} x2="80" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(13 + i)} className="transition-opacity duration-200"/>
                <line x1="90" y1={y-10} x2="90" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(14 + i)} className="transition-opacity duration-200"/>
              </g>
            ))}

            {/* Building 3 - Empire State Style with Spire */}
            <rect
              x="115" y="80" width="45" height="170"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(18)}
              className="transition-opacity duration-200"
            />
            <rect
              x="125" y="60" width="25" height="20"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(22)}
              className="transition-opacity duration-200"
            />
            <line
              x1="137.5" y1="60" x2="137.5" y2="30"
              stroke="#ffffff" strokeWidth="3"
              opacity={getLineOpacity(25)}
              className="transition-opacity duration-200"
            />
            {/* Building details */}
            {[100, 120, 140, 160, 180, 200, 220].map((y, i) => (
              <line key={i} x1="120" y1={y} x2="155" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(26 + i)} className="transition-opacity duration-200"/>
            ))}

            {/* Building 4 - Medium Commercial */}
            <rect
              x="170" y="160" width="40" height="90"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(30)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="170,160 190,140 210,160"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(33)}
              className="transition-opacity duration-200"
            />

            {/* Building 5 - Unique Shape */}
            <polygon
              points="220,250 220,180 240,160 260,180 280,160 300,180 300,250"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(35)}
              className="transition-opacity duration-200"
            />
            {/* Interior lines */}
            <line x1="240" y1="180" x2="240" y2="250" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(38)} className="transition-opacity duration-200"/>
            <line x1="260" y1="180" x2="260" y2="250" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(39)} className="transition-opacity duration-200"/>
            <line x1="280" y1="180" x2="280" y2="250" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(40)} className="transition-opacity duration-200"/>

            {/* Building 6 - Twin Towers */}
            <rect
              x="310" y="100" width="30" height="150"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(42)}
              className="transition-opacity duration-200"
            />
            <rect
              x="345" y="90" width="35" height="160"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(45)}
              className="transition-opacity duration-200"
            />
            {/* Tower details */}
            {[120, 140, 160, 180, 200, 220].map((y, i) => (
              <g key={i}>
                <line x1="315" y1={y} x2="335" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(47 + i)} className="transition-opacity duration-200"/>
                <line x1="350" y1={y} x2="375" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(48 + i)} className="transition-opacity duration-200"/>
              </g>
            ))}

            {/* Building 7 - Stepped Skyscraper */}
            <rect
              x="390" y="70" width="40" height="180"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(50)}
              className="transition-opacity duration-200"
            />
            <rect
              x="395" y="50" width="30" height="20"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(53)}
              className="transition-opacity duration-200"
            />
            <rect
              x="400" y="30" width="20" height="20"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(56)}
              className="transition-opacity duration-200"
            />
            <line
              x1="410" y1="30" x2="410" y2="10"
              stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(59)}
              className="transition-opacity duration-200"
            />

            {/* Building 8 - Modern Tower */}
            <rect
              x="440" y="110" width="38" height="140"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(60)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="440,110 459,90 478,110"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(63)}
              className="transition-opacity duration-200"
            />
            {/* Grid pattern */}
            {[130, 150, 170, 190, 210, 230].map((y, i) => (
              <g key={i}>
                <line x1="445" y1={y} x2="473" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(65 + i)} className="transition-opacity duration-200"/>
                <line x1="452" y1={y-10} x2="452" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(66 + i)} className="transition-opacity duration-200"/>
                <line x1="466" y1={y-10} x2="466" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(67 + i)} className="transition-opacity duration-200"/>
              </g>
            ))}

            {/* Building 9 - Art Deco Style */}
            <rect
              x="490" y="130" width="35" height="120"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(70)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="490,130 507.5,110 525,130"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(73)}
              className="transition-opacity duration-200"
            />
            <line x1="507.5" y1="110" x2="507.5" y2="95" stroke="#ffffff" strokeWidth="2" opacity={getLineOpacity(76)} className="transition-opacity duration-200"/>

            {/* Building 10 - Similar to Building 2 (Tall Residential) */}
            <rect
              x="535" y="120" width="35" height="130"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(78)}
              className="transition-opacity duration-200"
            />
            {/* Windows grid */}
            {[140, 160, 180, 200, 220].map((y, i) => (
              <g key={i}>
                <line x1="540" y1={y} x2="565" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(80 + i)} className="transition-opacity duration-200"/>
                <line x1="545" y1={y-10} x2="545" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(81 + i)} className="transition-opacity duration-200"/>
                <line x1="555" y1={y-10} x2="555" y2={y+10} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(82 + i)} className="transition-opacity duration-200"/>
              </g>
            ))}

            {/* Building 11 - Similar to Building 3 (Empire State Style) */}
            <rect
              x="580" y="80" width="45" height="170"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(85)}
              className="transition-opacity duration-200"
            />
            <rect
              x="590" y="60" width="25" height="20"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(88)}
              className="transition-opacity duration-200"
            />
            <line
              x1="602.5" y1="60" x2="602.5" y2="30"
              stroke="#ffffff" strokeWidth="3"
              opacity={getLineOpacity(90)}
              className="transition-opacity duration-200"
            />
            {/* Building details */}
            {[100, 120, 140, 160, 180, 200, 220].map((y, i) => (
              <line key={i} x1="585" y1={y} x2="620" y2={y} stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(91 + i)} className="transition-opacity duration-200"/>
            ))}

            {/* Building 12 - Similar to Building 9 (Art Deco Style) */}
            <rect
              x="635" y="130" width="35" height="120"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(95)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="635,130 652.5,110 670,130"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(97)}
              className="transition-opacity duration-200"
            />
            <line x1="652.5" y1="110" x2="652.5" y2="95" stroke="#ffffff" strokeWidth="2" opacity={getLineOpacity(99)} className="transition-opacity duration-200"/>

            {/* Building 13 - Helix Tower */}
            <path
              d="M680,250 L680,130 Q700,110 720,130 L720,250"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(96)}
              className="transition-opacity duration-200"
            />
            {/* Helix pattern */}
            <path
              d="M685,240 Q700,235 715,240"
              fill="none" stroke="#ffffff" strokeWidth="1"
              opacity={getLineOpacity(97)}
              className="transition-opacity duration-200"
            />
            <path
              d="M685,220 Q700,215 715,220"
              fill="none" stroke="#ffffff" strokeWidth="1"
              opacity={getLineOpacity(98)}
              className="transition-opacity duration-200"
            />
            <path
              d="M685,200 Q700,195 715,200"
              fill="none" stroke="#ffffff" strokeWidth="1"
              opacity={getLineOpacity(99)}
              className="transition-opacity duration-200"
            />
            <path
              d="M685,180 Q700,175 715,180"
              fill="none" stroke="#ffffff" strokeWidth="1"
              opacity={getLineOpacity(100)}
              className="transition-opacity duration-200"
            />

            {/* Building 14 - Diamond Top Tower */}
            <rect
              x="730" y="150" width="40" height="100"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(97)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="730,150 750,120 770,150"
              fill="none" stroke="#ffffff" strokeWidth="2"
              opacity={getLineOpacity(98)}
              className="transition-opacity duration-200"
            />
            <polygon
              points="750,120 735,135 750,150 765,135"
              fill="none" stroke="#ffffff" strokeWidth="1"
              opacity={getLineOpacity(99)}
              className="transition-opacity duration-200"
            />
            {/* Vertical dividers */}
            <line x1="740" y1="150" x2="740" y2="250" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(99)} className="transition-opacity duration-200"/>
            <line x1="760" y1="150" x2="760" y2="250" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(100)} className="transition-opacity duration-200"/>

            {/* Final Details - Antennas and small features */}
            <line x1="45" y1="200" x2="45" y2="180" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(96)} className="transition-opacity duration-200"/>
            <line x1="655" y1="180" x2="655" y2="160" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(97)} className="transition-opacity duration-200"/>
            <line x1="710" y1="200" x2="710" y2="185" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(98)} className="transition-opacity duration-200"/>
            
            {/* Connection lines between some buildings */}
            <line x1="160" y1="240" x2="170" y2="240" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(99)} className="transition-opacity duration-200"/>
            <line x1="380" y1="230" x2="390" y2="230" stroke="#ffffff" strokeWidth="1" opacity={getLineOpacity(100)} className="transition-opacity duration-200"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;