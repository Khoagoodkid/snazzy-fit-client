import { Button } from "@/components/ui/button"


export function PriceRangeSlider({ maxPrice, min, max, onMinChange, onMaxChange, onSubmit }: { maxPrice: number, min: number, max: number, onMinChange: (value: number) => void, onMaxChange: (value: number) => void, onSubmit: () => void }) {
    const minValue = 0
    const maxValue = maxPrice

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), max - 10)
        onMinChange(value)
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), min + 10)
        onMaxChange(value)
    }

    return (
        <div className="w-full max-w-md mx-auto ">
            <div className="flex justify-between text-sm text-gray-600 mb-2 items-center">
                <span className="font-semibold text-gray-800 text-md">${min} - ${max}</span>
                <Button variant="outline" size="sm" onClick={onSubmit}>
                    Go
                </Button>
            </div>

            <div className="relative h-2 rounded bg-gray-200">
                {/* Highlighted range */}
                <div
                    className="absolute h-2 bg-green-900 rounded"
                    style={{
                        left: `${(min / maxValue) * 100}%`,
                        right: `${100 - (max / maxValue) * 100}%`,
                    }}
                />

                {/* Range inputs */}
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={min}
                    onChange={handleMinChange}
                    className="absolute w-full h-2 appearance-none pointer-events-none  "
                    style={{ zIndex: min > max - 100 ? "5" : "3" }}
                />
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={max}
                    onChange={handleMaxChange}
                    className="absolute w-full h-2 appearance-none pointer-events-none"
                />
            </div>

            {/* Input thumbs (styled separately) */}
            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--green-primary);
          border: 2px solid white;
          cursor: pointer;
          transition: box-shadow 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2);
        }
      `}</style>
        </div>
    )
}
