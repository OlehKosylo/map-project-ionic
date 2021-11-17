module.exports = {
    countRating: (scores) => (!scores.length ? 0 : scores.reduce((a, b) => a + b, 0) / scores.length)
}
