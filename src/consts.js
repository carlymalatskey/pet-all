const { faMarsDouble } = require("@fortawesome/free-solid-svg-icons");

const constants = {
    userInputTypes: {
        EMAIL: "email",
        DISPLAYNAME: "displayName",
        PHONE_NUMBER: "phoneNumber",
        PASSWORD: "password1",
        BIO: "bio"
    },
    animalTypes: {
        DOG: "dog",
        CAT: "cat"
    },
    adoptionStatusTypes: {
        AVAILABLE: "available",
        ADOPTED: "adopted",
        FOSTERED: "fostered"
    },
    animalInputTypes: {
        TYPE_OF_PET: "type",
        BREED: "breed",
        NAME: "name",
        ADOPTION_STATUS: "adoptionStatus",
        HEIGHT: "height",
        WEIGHT: "weight",
        COLOR: "color",
        BIO: "bio",
        IS_HYPOALLERGENIC: "isHypoallergenic",
        DIET_RESTRICTIONS: "dietRest",
        PICTURE: "picture",
    }
};

export default constants;