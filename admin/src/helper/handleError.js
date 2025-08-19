export default function handleError (error , setError , key){
    console.log(error)
    const errorMessage = error?.response?.data?.error || error?.message || "কোন একটা ক্রুটি হয়েছে।"
    console.log(`Error while ${key} ${errorMessage}`)
    setError(errorMessage)
}