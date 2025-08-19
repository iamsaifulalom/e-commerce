function handleError(error, res) {
    const errorMessage = error.message || "Server error";

    console.log("Stack trace:" ,error?.stack)
    res.status(500).json({ error: errorMessage })
}

module.exports = handleError;