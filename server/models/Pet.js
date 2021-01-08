class Pet {
    constructor(id, type, name, adoptionStatus, picture, height, weight, color, bio, isHypoallergenic, dietRest, breed) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.adoptionStatus = adoptionStatus;
        this.picture = picture;
        this.height = height;
        this.weight = weight;
        this.color = color;
        this.bio = bio;
        this.isHypoallergenic = isHypoallergenic;
        this.dietRest = dietRest;
        this.breed = breed;
    }

    getJson() {
        return {
            ...this
        };
    }

    static createPetFromAPI(body) {
        let validBody = Pet.isAPIBodyValid(body);
        if (validBody) {
            return new Pet(body["id"], body["type"].toLowerCase(), body["name"], body["adoptionStatus"], body["picture"], body["height"], body["weight"], body["color"], body["bio"], body["isHypoallergenic"], body["dietRest"], body["breed"]);
        } else {
            throw Error("Input invalid");
        }
    }

    static createPetFromFireBaseResponse(pet) {
        return new Pet(pet.id, pet.type, pet.name, pet.adoptionStatus, pet.picture, pet.height, pet.weight, pet.color, pet.bio, pet.isHypoallergenic, pet.dietRest, pet.breed);
    }
    static isAPIBodyValid(body) {
        return (body["id"].length > 0 && body["type"].toLowerCase().length > 0 && body["name"].toLowerCase().length > 0 && (body["adoptionStatus"].toLowerCase() == "available" || body["adoptionStatus"].toLowerCase() == "fostered" || body["adoptionStatus"].toLowerCase() == "adopted") && parseInt(body["height"]) >= 0 && parseInt(body["weight"]) >= 0 && (typeof body["isHypoallergenic"] === "boolean") && body["breed"].toLowerCase().length > 0 && body["color"].toLowerCase().length > 0);
    }
}

module.exports = Pet; 