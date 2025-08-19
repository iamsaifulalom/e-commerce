export default function handleError(error, setError) {
    const errorMessage = error?.response?.data?.error || error?.message || "কোন একটা ক্রুটি হয়েছে।"
    setError(errorMessage)
}