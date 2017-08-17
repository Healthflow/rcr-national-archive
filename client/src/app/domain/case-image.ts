interface CaseImageType {
    caseId : number,
    title : string,
    images : CaseImage[],
}

interface CaseImage {
    title : string,
    source : string,
}

export {
    CaseImageType,
    CaseImage,
}