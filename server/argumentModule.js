async function getArguments(graphType, body) {
    let args = []
    switch (graphType) {
        case 'fossil':
            const fossil_country = body.country1
            if (fossil_country) {
                args.push(fossil_country)
            }
            break;
        case 'sustainable':
            const year = body.year
            args.push(year)
            const countries = [body.country1, body.country2, body.country3, body.country4]
            for (const country of countries) {
                if (country) {
                    args.push(country);
                }
            }
            break;
        case 'top':
            args = []
            const metric = body.data
            if (metric){
                args.push(metric)
            }
            break;
        case 'nuclear':
            args = []
            const nuclear_country = body.country1
            if (nuclear_country){
                args.push(nuclear_country)
            }
            break;
        case 'test':
            args = []
            const testARG = body.test
            args.push(testARG)
            break;
    }
    return args
}

module.exports = {
    getArguments
}