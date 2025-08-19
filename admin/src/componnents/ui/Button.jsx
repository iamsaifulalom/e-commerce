export default function Button({
    text,
    style = "w-full mt-5",
    onClick,
    variant,
    disabled = false,
    isLoading = false
}) {

    const type = {
        primary: `${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-orange-400 cursor-pointer"}`,
        danger: `${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`px-3 py-1  text-lg font-medium text-primary rounded-full ${type[variant]} ${style}`}
        > {isLoading ? "Loading..." : text}
        </button>
    )
}