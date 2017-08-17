import { Injectable } from '@angular/core';
import { CaseData } from '../domain/case-data';
import { CaseModality, CaseCategory, CaseBodyPart } from '../domain/case-enums';
import { CaseImageType, CaseImage } from '../domain/case-image';
import { UserService } from './user.service';
import * as faker from 'faker';

@Injectable()
export class CaseFactory {

    userName : string;
    modalities : string[] = [];
    categories : string[] = [];
    bodyParts : string[] = [];
    keywords : string[] = [];

    constructor(userService: UserService) {

        this.userName = userService.getUser().name;

        for (var modality in CaseModality) {
            this.modalities.push(modality);
        }

        for (var category in CaseCategory) {
            this.categories.push(category);
        }

        for (var bodyPart in CaseBodyPart) {
            this.bodyParts.push(bodyPart);
        }

        this.keywords.push("Cancer");
        this.keywords.push("Trauma");
        this.keywords.push("Infection");
        this.keywords.push("Hereditary");
        this.keywords.push("Auto-Immune");
        this.keywords.push("Tropical");
        this.keywords.push("Sport");
    }

    createCases(count: number) : CaseData[] {
        let cases : CaseData[] = [];
        for (var i = 1; i <= count; i++) {
            cases.push(this.createCase(i));
        }
        return cases;
    }

    createCase(id: number) : CaseData {

        let dateSubmitted = faker.date.past();
        let dateApproved = faker.date.between(dateSubmitted, new Date());

        return { 
            id: id, 
            dateSubmitted: dateSubmitted,
            dateApproved: dateApproved,
            author: this.getRandomName(),
            modality: this.getRandomCaseModality(),
            imageCount: faker.random.number({ min: 10, max: 3000 }),
            description: faker.lorem.paragraph(),
            category: this.getRandomCaseCategory(),
            bodyPart: this.getRandomCaseBodyPart(),
            abstract: faker.lorem.sentences(2),
            history: faker.lorem.paragraph(),
            findings: faker.lorem.paragraph(),
            discussion: faker.lorem.paragraphs(2),
            differentialDiagnosis: this.getDifferentialDiagnosis(),
            diagnosis: faker.lorem.sentence(),
            keywords: this.getKeywords(),
        }
    }

    createCaseImageTypes(id: number) : CaseImageType[] {
        return [
            this.createCaseImageType(id, "Chest Radiograph"),
            this.createCaseImageType(id, "MRI Head"),
            this.createCaseImageType(id, "MR Whole Spine"),
        ];
    }

    createCaseImageType(id: number, header: string) : CaseImageType {

        let images : CaseImage[] = [];
        for (var i = 1; i <= faker.random.number({ min: 1, max: 10 }); i++) {
            images.push(this.createCaseImage(header, i));
        }
        return { 
            caseId: id,
            title: header,
            images: images,
        };
    }

    createCaseImage(header: string, index: number) {
        return { title: `${header} ${index}`, source: "" }
    }

    getRandomName() : string {
        return faker.helpers.randomize([this.userName, this.getFakeName(), this.getFakeName()]);
    }

    getFakeName() : string {
        return `Dr ${faker.name.firstName()} ${faker.name.lastName()}`
    }

    getRandomCaseModality() : CaseModality {
        return <CaseModality><any>CaseModality[faker.helpers.randomize(this.modalities)];
    }

    getRandomCaseCategory() : CaseCategory {
        return <CaseCategory><any>CaseCategory[faker.helpers.randomize(this.categories)];
    }

    getRandomCaseBodyPart() : CaseBodyPart {
        return <CaseBodyPart><any>CaseBodyPart[faker.helpers.randomize(this.bodyParts)];
    }

    getDifferentialDiagnosis() : string[] {
        let items : string[] = [];
        for (var i = 1; i <= faker.random.number({ min: 3, max: 6 }); i++) {
            items.push(faker.lorem.words(5));
        }
        return items;
    }

    getKeywords() : string[] {

        return this.keywords.filter(function (element, index) {
            return index == faker.random.number({min: index - 1, max: index + 1});
         });
    }
}