import React, { useEffect, useRef, useState } from "react";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const cards = ref.current.querySelectorAll("[data-card]");
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const isCenterInView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          if (isCenterInView) {
            setActiveCard(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="lg:flex lg:gap-8 xl:gap-16">
        {/* Content Side */}
        <div className="lg:w-1/2">
          {content.map((item, index) => (
            <div 
              key={item.title + index} 
              className="min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 lg:py-32" 
              data-card={index}
            >
              <div className={`transition-all duration-500 ${
                activeCard === index ? 'opacity-100' : 'lg:opacity-30'
              }`}>
                <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-copperplate font-bold text-white mb-8">
                  {item.title}
                </h2>
                <div className="space-y-6 text-sm xs:text-base sm:text-base md:text-lg lg:text-lg text-white/70 leading-relaxed">
                  {item.description}
                </div>
                {item.button && (
                  <div className="mt-12">
                    {item.button}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sticky Content Side */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="sticky top-20 h-[70vh] max-h-[600px] flex items-center justify-center p-4">
            <div className={`w-full h-full max-w-lg mx-auto ${contentClassName || ""}`}>
              {content[activeCard]?.content ?? null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};