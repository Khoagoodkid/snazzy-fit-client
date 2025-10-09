import { Checkbox } from "./checkbox";

export default function MultiSelectRadioGroup({
    options,
    selected,
    onSelect,
    onRemove,
    type
}: {
    options: string[];
    selected: string[];
    onSelect: (option: string) => void;
    onRemove: (option: string) => void;
    type: "checkbox" | "button";
}) {

    const toggleOption = (option: string) => {
        onSelect(option)
    }

    const removeOption = (option: string) => {
        onRemove(option)
    }


    return (
        <div className="w-full max-w-md mx-auto ">

            {
                type === "checkbox" ? (
                    <div className="space-y-2">
                        {options.map(option => {
                            const isActive = selected.includes(option)
                            return (
                                <label key={option} className="flex items-center gap-2 ">
                                    <Checkbox
                                        checked={isActive}
                                        onCheckedChange={() => {
                                            isActive ? removeOption(option) : toggleOption(option)
                                        }}
                                        className="data-[state=checked]:border-[var(--green-primary)] data-[state=checked]:bg-[var(--green-primary)]"
                                    />
                                    <span className="text-sm">{option}</span>
                                </label>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {options.map(option => {
                            const isActive = selected.includes(option)
                            return (

                                <button
                                    key={option}
                                    onClick={() => {
                                        isActive ? removeOption(option) : toggleOption(option)
                                    }}
                                    className={`px-4 py-2 rounded-full border text-sm transition-all
                                    ${isActive
                                            ? "bg-[var(--green-primary)] text-white border-[var(--green-primary)] shadow-md"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-[var(--green-primary)] hover:text-[var(--green-primary)]"}
                                    `}
                                >
                                    {option}
                                </button>
                            )

                        })}
                    </div>
                )
            }

        </div>
    )
}
