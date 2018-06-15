'use strict';
let data1 = [
  {
    id: 'zYxWvUt',
    firstName: 'Alex',
    lastName: 'Smith',
    age: 24
  },
  {
    id: 'aBcDeFgH',
    firstName: 'Juan',
    lastName: 'Doe',
    age: 32
  }];

let data2 = [{
  id: 'aBcDeFgH',
  occupation: 'architect',
  address: {
    street: '123 Main St',
    city: 'CityTown',
    Country: 'USA'
  }
},
{
  id: 'zYxWvUt',
  occupation: 'receptionist',
  address: {
    street: '555 Ocean Ave',
    city: 'Beach City',
    Country: 'USA'
  }
}];

function merge(dt1, dt2) {
  let result = [];


  for (let i = 0; i < dt1.length; i++) {
    if (dt1[i].id === dt2[i].id) {
      result.push({
        id: dt1[i].id,
        firstName: dt1[i].firstName,
        lastName: dt1[i].lastName,
        age: dt1[i].age,
        occupation: dt2[i].occupation,
        address: dt2[i].address
      });
    }

  }
  console.log(result);
}

merge(data1, data2);


