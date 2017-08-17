import { Injectable } from '@angular/core';
import { User, UserCase } from '../domain/user';

@Injectable()
export class UserService {

    user: User;

    constructor() { 
        this.user = {
            id: 1,
            name: "Dr Daniel Fascia",
            cases: [],
            collections: [
                { id: 1, name: "Knee ligaments", cases: [] },
                { id: 2, name: "Interstitial lung diseases", cases: [] },
                { id: 3, name: "Interventional", cases: [] },
                { id: 4, name: "Safety Cases", cases: [] },
            ],
        };
    }

    getUser() : User {
        return this.user;
    }

    isFavourite(caseId: number) {
        let userCase = this.getUserCase(caseId);
        return userCase && userCase.isFavourite;
    }

    setFavourite(caseId: number, isFavourite: boolean) {
        let userCase = this.getUserCase(caseId);
        userCase.isFavourite = isFavourite;
        return true;
    }

    isCpd(caseId: number) {
        let userCase = this.getUserCase(caseId);
        return userCase && userCase.isCpd;
    }

    setCpd(caseId: number, isCpd: boolean) {
        let userCase = this.getUserCase(caseId);
        userCase.isCpd = isCpd;
        return true;
    }

    setCpdDetails(caseId: number, points: number, reflections: string) {
        let userCase = this.getUserCase(caseId);
        userCase.cpdPoints = points;
        userCase.cpdReflections = reflections;
        return true;
    }

    setRating(caseId: number, rating: number) {
        let userCase = this.getUserCase(caseId);
        userCase.rating = rating;
        return true;
    }

    getUserCase(caseId: number) : UserCase {
        let userCase = this.user.cases.find(i => i.caseId == caseId);
        if (!userCase) {
            userCase = {
                caseId: caseId,
                rating: undefined,
                isFavourite: false,
                isCpd: false,
                cpdPoints: 0,
                cpdReflections: "",
            };
            this.user.cases.push(userCase);
        }
        return userCase;    
    }

    setCollections(caseId: number, selectedCollectionIds: number[]) {

        for (let collection of this.user.collections) {
            let index = collection.cases.indexOf(caseId);
            let isSelected = selectedCollectionIds.includes(collection.id);
            if (isSelected && index < 0) {
                collection.cases.push(caseId);
            }
            else if (!isSelected && index >= 0) {
                collection.cases.splice(index, 1);
            }
        }

        return true;
    }
}