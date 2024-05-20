async function getArguments(graphType, body) {
    let args = []
    switch (graphType) {
        case 'fossil':
            args = []
            const country = body.country1
            args.push(country)
            break;
        case 'sustainable':
            args = []
            const country1 = body.country1
            const country2 = body.country2
            const country3 = body.country3
            const country4 = body.country4
            args.push(country)
            break;
        case 'top':
            
            break;
        case 'nuclear':
            
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