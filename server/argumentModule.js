async function getArguments(graphType, body) {
    let args = []
    switch (graphType) {
        case 'fossil':
            args = []
            const fossil_country = body.country1
            if (fossil_country != null){
                args.push(fossil_country)
            }
            console.log(args)
            break;
        case 'sustainable':
            args = []
            const year = body.year
            args.push(year)
            const countries = [body.country1, body.country2, body.country3, body.country4]
            for (const country of countries) {
                if (country != null && country !== '' && country !== undefined) {
                    args.push(country);
                }
            }
            break;
        case 'top':
            args = []
            const metric = body.data
            if (metric != null){
                args.push(metric)
            }
            break;
        case 'nuclear':
            args = []
            const nuclear_country = body.country1
            if (nuclear_country != null){
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