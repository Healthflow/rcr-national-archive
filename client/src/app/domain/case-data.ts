import { CaseModality, CaseCategory, CaseBodyPart } from './case-enums';

interface CaseData {
    id : number,
    dateSubmitted : Date,
    dateApproved : Date,
    author : string,
    modality : CaseModality
    imageCount : number,
    description : string,
    category : CaseCategory,
    bodyPart : CaseBodyPart,
    abstract : string,
    history : string,
    findings : string,
    discussion : string,
    differentialDiagnosis : string[],
    diagnosis : string,
    keywords : string[]
}

interface CaseDataList {
    cases : CaseData[],
    totalRecords : number
}

export {
    CaseData,
    CaseDataList,
}
