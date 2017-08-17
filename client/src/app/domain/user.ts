interface User {
    id : number,
    name : string,
    cases : UserCase[],
    collections : Collection[],
}

interface UserCase {
    caseId : number,
    rating : number,
    isFavourite : boolean,
    isCpd : boolean,
    cpdPoints : number,
    cpdReflections : string,
}

interface Collection {
    id : number,
    name : string,
    cases : number[],
}

export {
    User,
    UserCase,
    Collection,
}