enum CaseModality {
    "CT" = <any>"CT",
    "MRI" = <any>"MRI",
}

enum CaseCategory {
    "Breast" = <any>"Breast", 
    "Cardiac" = <any>"Cardiac", 
    "Chest" = <any>"Chest",
    "Gastrointestinal" = <any>"Gastrointestinal", 
    "Genitourinary" = <any>"Genitourinary", 
    "Head & Neck" = <any>"Head & Neck",
    "Interventional" = <any>"Interventional", 
    "Musculoskeletal" = <any>"Musculoskeletal", 
    "Neurological" = <any>"Neurological",
    "Nuclear Medicine" = <any>"Nuclear Medicine", 
    "Obs & Gynae" = <any>"Obs & Gynae", 
    "Paediatric" = <any>"Paediatric", 
    "Vascular" = <any>"Vascular",
}

enum CaseBodyPart {
    "Arm" = <any>"Arm", 
    "Chest" = <any>"Chest",
    "Hand" = <any>"Hand",
    "Head" = <any>"Head",
    "Foot" = <any>"Foot",
    "Leg" = <any>"Leg",
}

export {
    CaseModality,
    CaseCategory,
    CaseBodyPart,
}