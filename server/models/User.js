class User {
    constructor(email, displayName, phoneNumber, adoptedPets, fosteredPets, savedPets, bio, isAdmin) {
        this.email = email ? email : "";
        this.displayName = displayName ? displayName : "";
        this.phoneNumber = phoneNumber ? phoneNumber : "";
        this.adoptedPets = adoptedPets ? adoptedPets : [];
        this.fosteredPets = fosteredPets ? fosteredPets : [];
        this.savedPets = savedPets ? savedPets : [];
        this.bio = bio ? bio : "";
        this.isAdmin = isAdmin ? isAdmin : false;
    }

    toString() {
        return `My emails is ${this.email} and my password is a freaking secret!`;
    }

    toJson() {
        return {
            ...this
        };
    }

    adoptPet(petId) {
        this.adoptedPets.push(petId);
        if(this.savedPets.includes(petId)) {
            this.savedPets = this.savedPets.filter(id => id != petId);
        }
    }

    fosterPet(petId) {
        this.fosteredPets.push(petId);
        if(this.savedPets.includes(petId)) {
            this.savedPets = this.savedPets.filter(id => id != petId);
        }
    }

    isAllowedToSave(petId) {
        return !this.savedPets.includes(petId);
    }

    savePet(petId) {
        this.savedPets.push(petId);
    }

    removeSavedPet(petId) {
        this.savedPets = this.savedPets.filter(id => id != petId);
    }

    returnPet(petId) {
        this.fosteredPets = this.fosteredPets.filter(id => id != petId);
        this.adoptedPets = this.adoptedPets.filter(id => id != petId);
    }

    isAllowedToReturn(petId) {
        return (this.fosteredPets.includes(petId) || this.adoptedPets.includes(petId));
    }

    isAllowedToAdopt(petId) {
        return !this.fosteredPets.includes(petId) && !this.adoptedPets.includes(petId);
    }

    isAllowedToFoster(petId) {
        return !this.fosteredPets.includes(petId);
    }

    isAllowedToSavePet(petId) {
        return !this.savedPets.includes(petId); 
    }

    isAllowedToUnsavePet(petId) {
        return this.savedPets.includes(petId);
    }

    static doPasswordsMatch(password1, password2) {
        return password1 === password2;
    }

    static createUserFromFirebaseResponse(user) {
        return new User(user.email, user.displayName, user.phoneNumber, user.adoptedPets, user.fosteredPets, user.savedPets, user.bio, user.isAdmin);
    }

    static createUserFromAPI(body) {
        return new User(body.email, body.displayName, body.phoneNumber, body.adoptedPets, body.fosteredPets, body.savedPets, body.bio, body.isAdmin);
    }
}

module.exports = User;