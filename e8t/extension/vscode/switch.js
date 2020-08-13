const findPet = petOut => {
  switch(petOut) {
    case 'dog':
      let pet = 'dog';
      break;
    case 'cat':
      let pet1 = 'cat'+pet;
      break;
    case 'fish':
      let pet2 = 'fish'+pet1;
      break;
    default:
      let pet3 = 'F#';
  }
  console.log(pet)
  console.log(pet1)
  console.log(pet2)
  console.log(pet3)
}

findPet('dog')
