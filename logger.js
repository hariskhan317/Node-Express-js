const logger = (req, res, next) => {
    console.log('logging.....') // data req.body
    next(); // pass to the next middleware function
}

module.exports = logger;