function calculateAge(birthDate) {
    var birthDateObj = new Date(birthDate);
    var currentDate = new Date();
    var difference = currentDate - birthDateObj;
    var age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    return age;
}

export {calculateAge}